/* Herieth-Lab simulator kit: a chalkboard stage, things you can pick up, and drawing helpers */
(function () {
  const HL = (window.HL = window.HL || {});
  HL.sims = {};
  const C = (HL.C = {
    bg: '#0F3239', chalk: '#EAF4F2', dim: 'rgba(234,244,242,.55)', faint: 'rgba(234,244,242,.13)',
    glass: 'rgba(205,238,242,.9)', amber: '#F5A524', blue: '#56AEFF', pink: '#FF6FA3', green: '#5FD39A',
    purple: '#C08AF0', red: '#FF5D5D', water: 'rgba(86,174,255,.5)', steel: '#A9BCC3', wood: '#B9854F', bench: '#1B4A52'
  });
  const el = (HL.el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  });
  HL.clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  HL.mount = function (id, root) {
    const def = HL.sims[id];
    root.innerHTML = '';
    const W = 760, H = 440, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const wrap = el('div', 'sim'), stage = el('div', 'sim-stage'), canvas = el('canvas');
    const say = el('div', 'sim-say'), side = el('div', 'sim-side'), controls = el('div', 'sim-controls'), reads = el('div', 'sim-reads');
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', def.title + ' simulator');
    const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
    stage.append(canvas, say); side.append(controls, reads); wrap.append(stage, side); root.append(wrap);
    let alive = true, raf = 0; const things = [];
    const ui = {
      ctx, W, H, canvas, panel: controls, things,
      say(h) { say.innerHTML = h; },
      slider(label, min, max, step, val, unit, cb) {
        const row = el('label', 'ctl'), top = el('span', 'ctl-top'), name = el('span', '', label), out = el('b', '', '');
        const inp = el('input'); inp.type = 'range'; inp.min = min; inp.max = max; inp.step = step; inp.value = val;
        const show = () => (out.textContent = (+inp.value).toFixed(step < 1 ? (step < 0.1 ? 2 : 1) : 0) + (unit ? ' ' + unit : ''));
        inp.oninput = () => { show(); cb && cb(+inp.value); }; show();
        top.append(name, out); row.append(top, inp); controls.append(row);
        return { get v() { return +inp.value; }, set(v) { inp.value = v; show(); } };
      },
      select(label, opts, cb) {
        const row = el('label', 'ctl'), s = el('select');
        opts.forEach(o => { const op = el('option', '', o[1]); op.value = o[0]; s.append(op); });
        s.onchange = () => cb && cb(s.value);
        row.append(el('span', 'ctl-top', '<span>' + label + '</span>'), s); controls.append(row); return s;
      },
      button(label, cb, cls) { const b = el('button', 'btn ' + (cls || 'btn-ghost'), label); b.type = 'button'; b.onclick = cb; controls.append(b); return b; },
      read(label) {
        const r = el('div', 'read'), v = el('b', '', '–'); r.append(el('span', '', label), v); reads.append(r);
        return t => { v.innerHTML = t; };
      },
      thing(o) { o.hx = o.x; o.hy = o.y; o.home = () => { o.x = o.hx; o.y = o.hy; }; if (o.drag == null) o.drag = !o.onClick || !!o.onDrop || !!o.onMove; things.push(o); return o; },
      loop(fn) {
        let last = performance.now();
        const tick = t => { if (!alive) return; const dt = Math.min(0.05, (t - last) / 1000); last = t; try { fn(dt, t / 1000); } catch (e) { console.error(e); alive = false; } raf = requestAnimationFrame(tick); };
        raf = requestAnimationFrame(tick);
      }
    };
    // pointer handling: pick up, move, put down
    let act = null, ox = 0, oy = 0, moved = false, sx = 0, sy = 0;
    const pos = e => { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
    const hit = (x, y) => { for (let i = things.length - 1; i >= 0; i--) { const o = things[i]; if (!o.off && Math.abs(x - o.x) <= o.w / 2 && Math.abs(y - o.y) <= o.h / 2) return o; } return null; };
    canvas.addEventListener('pointerdown', e => {
      const [x, y] = pos(e); act = hit(x, y); if (!act) return;
      canvas.setPointerCapture(e.pointerId); ox = x - act.x; oy = y - act.y; sx = x; sy = y; moved = false;
      act.held = true; act.onDown && act.onDown(act); e.preventDefault();
    });
    canvas.addEventListener('pointermove', e => {
      const [x, y] = pos(e);
      if (!act) { const h = hit(x, y); canvas.style.cursor = h ? (h.drag ? 'grab' : 'pointer') : 'default'; return; }
      if (Math.hypot(x - sx, y - sy) > 4) moved = true;
      if (act.drag) {
        if (!act.lockX) act.x = x - ox; if (!act.lockY) act.y = y - oy;
        const b = act.clamp || [10, 10, W - 10, H - 10];
        act.x = HL.clamp(act.x, b[0], b[2]); act.y = HL.clamp(act.y, b[1], b[3]);
        act.onMove && act.onMove(act, x, y); canvas.style.cursor = 'grabbing';
      }
    });
    const up = () => { if (!act) return; const a = act; act = null; a.held = false; a.onUp && a.onUp(a); if (!moved || !a.drag) a.onClick && a.onClick(a); else a.onDrop && a.onDrop(a); canvas.style.cursor = 'default'; };
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    def.init(ui);
    return () => { alive = false; cancelAnimationFrame(raf); };
  };

  /* ---------- drawing helpers ---------- */
  const D = (HL.d = {});
  D.bg = (c, W, H, benchY) => {
    c.fillStyle = C.bg; c.fillRect(0, 0, W, H);
    c.strokeStyle = 'rgba(234,244,242,.045)'; c.lineWidth = 1; c.beginPath();
    for (let x = 20; x < W; x += 20) { c.moveTo(x + .5, 0); c.lineTo(x + .5, H); }
    for (let y = 20; y < H; y += 20) { c.moveTo(0, y + .5); c.lineTo(W, y + .5); }
    c.stroke();
    if (benchY) { c.fillStyle = C.bench; c.fillRect(0, benchY, W, H - benchY); c.fillStyle = 'rgba(234,244,242,.25)'; c.fillRect(0, benchY, W, 2); }
  };
  D.txt = (c, s, x, y, o) => {
    o = o || {}; c.font = (o.bold ? '700 ' : '500 ') + (o.size || 13) + 'px "Atkinson Hyperlegible Next","Atkinson Hyperlegible",system-ui,sans-serif';
    c.fillStyle = o.color || C.chalk; c.textAlign = o.align || 'center'; c.textBaseline = o.base || 'middle'; c.fillText(s, x, y);
  };
  // chemical text: _ makes the following digits subscript, ^ makes the following charge superscript
  D.chem = (c, s, x, y, size, color, align) => {
    size = size || 16; const parts = []; let m, re = /([_^])([0-9+\-]+)|([^_^]+)/g;
    while ((m = re.exec(s))) parts.push(m[1] ? [m[2], m[1]] : [m[3], '']);
    const f = z => '600 ' + z + 'px "Atkinson Hyperlegible Next","Atkinson Hyperlegible",system-ui,sans-serif';
    let w = 0; parts.forEach(p => { c.font = f(p[1] ? size * .65 : size); p[2] = c.measureText(p[0]).width; w += p[2]; });
    let cx = align === 'left' ? x : align === 'right' ? x - w : x - w / 2;
    c.fillStyle = color || C.chalk; c.textAlign = 'left'; c.textBaseline = 'middle';
    parts.forEach(p => { c.font = f(p[1] ? size * .65 : size); c.fillText(p[0], cx, y + (p[1] === '_' ? size * .3 : p[1] === '^' ? -size * .35 : 0)); cx += p[2]; });
    return w;
  };
  D.rr = (c, x, y, w, h, r) => { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); };
  D.line = (c, x1, y1, x2, y2, col, w, dash) => { c.save(); c.strokeStyle = col || C.chalk; c.lineWidth = w || 2; if (dash) c.setLineDash(dash); c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.restore(); };
  D.arrow = (c, x1, y1, x2, y2, col, w) => {
    D.line(c, x1, y1, x2, y2, col, w); const a = Math.atan2(y2 - y1, x2 - x1), s = 9;
    c.fillStyle = col || C.chalk; c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 - s * Math.cos(a - .4), y2 - s * Math.sin(a - .4)); c.lineTo(x2 - s * Math.cos(a + .4), y2 - s * Math.sin(a + .4)); c.fill();
  };
  D.dot = (c, x, y, r, col) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); };
  // a glass vessel: path() traces the outline, liquid fills up to `lv` (0..1) of its height
  D.vessel = (c, path, top, bottom, lv, col) => {
    if (lv > 0 && col) { c.save(); path(); c.clip(); c.fillStyle = col; c.fillRect(-9999, bottom - (bottom - top) * lv, 99999, 9999); c.restore(); }
    c.strokeStyle = C.glass; c.lineWidth = 2.2; c.lineJoin = 'round'; path(); c.stroke();
  };
  D.beaker = (c, x, y, w, h, lv, col) => D.vessel(c, () => { c.beginPath(); c.moveTo(x - w / 2 - 4, y - h); c.lineTo(x - w / 2, y - h + 4); c.lineTo(x - w / 2, y - 8); c.quadraticCurveTo(x - w / 2, y, x - w / 2 + 8, y); c.lineTo(x + w / 2 - 8, y); c.quadraticCurveTo(x + w / 2, y, x + w / 2, y - 8); c.lineTo(x + w / 2, y - h); }, y - h, y, lv * .92, col);
  D.tube = (c, x, y, w, h, lv, col) => D.vessel(c, () => { c.beginPath(); c.moveTo(x - w / 2, y - h); c.lineTo(x - w / 2, y - w / 2); c.arc(x, y - w / 2, w / 2, Math.PI, 0, true); c.lineTo(x + w / 2, y - h); }, y - h, y, lv, col);
  D.flask = (c, x, y, w, h, lv, col) => D.vessel(c, () => { const n = w * .16; c.beginPath(); c.moveTo(x - n, y - h); c.lineTo(x - n, y - h * .62); c.lineTo(x - w / 2, y - 6); c.quadraticCurveTo(x - w / 2 - 2, y, x - w / 2 + 8, y); c.lineTo(x + w / 2 - 8, y); c.quadraticCurveTo(x + w / 2 + 2, y, x + w / 2, y - 6); c.lineTo(x + n, y - h * .62); c.lineTo(x + n, y - h); }, y - h, y, lv, col);
  D.bottle = (c, x, y, w, h, col, label) => {
    const path = () => { c.beginPath(); c.moveTo(x - w * .2, y - h); c.lineTo(x - w * .2, y - h * .78); c.quadraticCurveTo(x - w / 2, y - h * .74, x - w / 2, y - h * .6); c.lineTo(x - w / 2, y - 4); c.quadraticCurveTo(x - w / 2, y, x - w / 2 + 4, y); c.lineTo(x + w / 2 - 4, y); c.quadraticCurveTo(x + w / 2, y, x + w / 2, y - 4); c.lineTo(x + w / 2, y - h * .6); c.quadraticCurveTo(x + w / 2, y - h * .74, x + w * .2, y - h * .78); c.lineTo(x + w * .2, y - h); };
    D.vessel(c, path, y - h, y, .66, col);
    c.fillStyle = C.steel; D.rr(c, x - w * .26, y - h - 9, w * .52, 10, 3); c.fill();
    if (label) { c.fillStyle = 'rgba(244,250,249,.95)'; D.rr(c, x - w / 2 + 3, y - h * .5, w - 6, h * .3, 3); c.fill(); const L = label.split('|'); L.forEach((s, i) => D.txt(c, s, x, y - h * .35 + (i - (L.length - 1) / 2) * 11, { size: 10, color: '#10383F', bold: true })); }
  };
  D.burner = (c, x, y, air) => {
    c.fillStyle = '#6F8891'; c.beginPath(); c.moveTo(x - 34, y); c.lineTo(x - 22, y - 14); c.lineTo(x + 22, y - 14); c.lineTo(x + 34, y); c.fill();
    c.fillStyle = C.steel; c.fillRect(x - 8, y - 104, 16, 92);
    c.fillStyle = '#C9A24B'; D.rr(c, x - 12, y - 42, 24, 20, 3); c.fill();
    c.fillStyle = C.bg; c.beginPath(); c.ellipse(x, y - 32, 5 * air + .5, 6, 0, 0, 7); c.fill();
    c.fillStyle = '#6F8891'; c.fillRect(x + 8, y - 22, 26, 6);
  };
  D.flame = (c, x, y, air, t, size) => {
    size = size || 1; const wob = Math.sin(t * 9) * 3 * (1 - air) + Math.sin(t * 23) * 1.5;
    const h = (150 - 62 * air) * size, w = (26 - 6 * air) * size;
    const shape = (hh, ww, dx) => { c.beginPath(); c.moveTo(x - ww, y); c.bezierCurveTo(x - ww * 1.25, y - hh * .5, x - ww * .25 + dx, y - hh * .75, x + dx, y - hh); c.bezierCurveTo(x + ww * .25 + dx, y - hh * .75, x + ww * 1.25, y - hh * .5, x + ww, y); c.closePath(); };
    c.save();
    if (air < 1) { const g = c.createLinearGradient(0, y, 0, y - h); g.addColorStop(0, 'rgba(255,170,40,.55)'); g.addColorStop(.5, 'rgba(255,214,70,.95)'); g.addColorStop(1, 'rgba(255,140,30,.2)'); c.globalAlpha = 1 - air * .95; c.fillStyle = g; shape(h, w, wob * 2); c.fill(); }
    if (air > .05) { const g = c.createLinearGradient(0, y, 0, y - h); g.addColorStop(0, 'rgba(70,150,255,.9)'); g.addColorStop(1, 'rgba(130,120,255,.25)'); c.globalAlpha = Math.min(1, air * 1.3); c.fillStyle = g; shape(h * .92, w * .9, wob * .4); c.fill(); c.fillStyle = 'rgba(190,240,255,.9)'; shape(h * .42, w * .5, 0); c.fill(); }
    c.restore();
  };
  D.tripod = (c, x, y, w, h) => { D.line(c, x - w / 2, y - h, x + w / 2, y - h, C.steel, 4); D.line(c, x - w / 2 + 4, y - h, x - w / 2 - 8, y, C.steel, 3); D.line(c, x + w / 2 - 4, y - h, x + w / 2 + 8, y, C.steel, 3); D.line(c, x - w / 2 - 6, y - h - 3, x + w / 2 + 6, y - h - 3, 'rgba(234,244,242,.5)', 1.5, [3, 2]); };
  D.stand = (c, x, y, h, arm) => { c.fillStyle = '#6F8891'; D.rr(c, x - 40, y - 8, 90, 8, 2); c.fill(); D.line(c, x - 28, y - 8, x - 28, y - h, C.steel, 4); if (arm) D.line(c, x - 28, y - h + 14, x - 28 + arm, y - h + 14, C.steel, 4); };
  D.dropper = (c, x, y, col) => { // (x, y) is the tip
    c.fillStyle = '#C2415B'; D.rr(c, x - 7, y - 78, 14, 24, 6); c.fill();
    if (col) { c.fillStyle = col; c.fillRect(x - 3, y - 44, 6, 36); }
    c.strokeStyle = C.glass; c.lineWidth = 1.8; c.beginPath(); c.moveTo(x - 4, y - 55); c.lineTo(x - 4, y - 12); c.lineTo(x - 1.5, y); c.lineTo(x + 1.5, y); c.lineTo(x + 4, y - 12); c.lineTo(x + 4, y - 55); c.stroke();
  };
  D.graph = (c, x, y, w, h, o) => {
    c.fillStyle = 'rgba(8,30,35,.55)'; D.rr(c, x - 34, y - 14, w + 48, h + 46, 8); c.fill();
    c.strokeStyle = C.faint; c.lineWidth = 1; c.beginPath();
    for (let i = 0; i <= 5; i++) { c.moveTo(x + w * i / 5, y); c.lineTo(x + w * i / 5, y + h); c.moveTo(x, y + h * i / 5); c.lineTo(x + w, y + h * i / 5); } c.stroke();
    D.line(c, x, y, x, y + h, C.dim, 1.5); D.line(c, x, y + h, x + w, y + h, C.dim, 1.5);
    D.txt(c, o.xl, x + w / 2, y + h + 22, { size: 11, color: C.dim }); c.save(); c.translate(x - 24, y + h / 2); c.rotate(-Math.PI / 2); D.txt(c, o.yl, 0, 0, { size: 11, color: C.dim }); c.restore();
    D.txt(c, String(o.xmax), x + w, y + h + 9, { size: 10, color: C.dim }); D.txt(c, String(o.ymax), x - 6, y, { size: 10, color: C.dim, align: 'right' }); D.txt(c, '0', x - 6, y + h + 8, { size: 10, color: C.dim });
    const P = o.pts.map(p => [x + HL.clamp(p[0] / o.xmax, 0, 1) * w, y + h - HL.clamp(p[1] / o.ymax, 0, 1) * h]);
    c.strokeStyle = o.color || C.amber; c.lineWidth = 2; if (o.line !== false && P.length > 1) { c.beginPath(); P.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); }
    if (o.dots) P.forEach(p => D.dot(c, p[0], p[1], 3.5, o.color || C.amber));
  };
  D.meter = (c, x, y, r, frac, label, val) => {
    c.fillStyle = 'rgba(244,250,249,.96)'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.strokeStyle = C.steel; c.lineWidth = 3; c.stroke();
    c.strokeStyle = '#10383F'; c.lineWidth = 1.5; for (let i = 0; i <= 10; i++) { const a = Math.PI * (1.15 + .7 * i / 10); c.beginPath(); c.moveTo(x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78); c.lineTo(x + Math.cos(a) * r * .9, y + Math.sin(a) * r * .9); c.stroke(); }
    const a = Math.PI * (1.15 + .7 * HL.clamp(frac, 0, 1)); D.line(c, x, y, x + Math.cos(a) * r * .74, y + Math.sin(a) * r * .74, '#D6336C', 2.5); D.dot(c, x, y, 4, '#10383F');
    D.txt(c, label, x, y + r * .36, { size: r * .3, color: '#10383F', bold: true }); D.txt(c, val, x, y + r * .68, { size: r * .2, color: '#10383F' });
  };
  D.hand = (c, x, y) => { c.fillStyle = '#C98E62'; D.rr(c, x - 7, y - 46, 14, 46, 7); c.fill(); D.rr(c, x - 22, y - 84, 44, 44, 10); c.fill(); }; // (x, y) is the fingertip
})();

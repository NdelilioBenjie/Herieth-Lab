/* Herieth-Lab physics practicals */
(function () {
  const S = HL.sims, d = HL.d, C = HL.C, clamp = HL.clamp, BY = 380, deg = Math.PI / 180;

  /* ---------- vernier caliper ---------- */
  S.caliper = {
    title: 'Reading a vernier caliper', subject: 'phy',
    aim: 'To measure the width of small objects to the nearest 0.01 cm using a vernier caliper.',
    steps: ['Choose an object. It sits against the fixed jaw.', 'Drag the sliding jaw until it grips the object.', 'Read the main scale just before the vernier zero, then find the vernier line that lines up exactly with a main-scale line.', 'Reading = main scale + (vernier line × 0.01 cm). Press “Show the reading” to check.'],
    init(ui) {
      const c = ui.ctx, X0 = 80, PX = 100, OB = { marble: ['Marble', 1.64], coin: ['Coin', 2.37], pencil: ['Pencil', 0.72], cap: ['Bottle top', 3.05], none: ['Nothing (practise freely)', 0] };
      let v = 4.2, k = 'marble', show = false; const rG = ui.read('Jaws'), rR = ui.read('Reading');
      ui.select('Object to measure', Object.keys(OB).map(x => [x, OB[x][0]]), x => { k = x; show = false; v = Math.max(v, OB[k][1]); jaw.x = X0 + v * PX + 24; });
      ui.button('Show or hide the reading', () => { show = !show; });
      const jaw = ui.thing({ x: X0 + v * PX + 24, y: 170, w: 80, h: 150, lockY: true, onMove(o) { v = Math.round(clamp((o.x - 24 - X0) / PX, OB[k][1], 6.2) * 100) / 100; o.x = X0 + v * PX + 24; } });
      ui.say('Drag the sliding jaw to grip the object.');
      ui.loop(() => {
        d.bg(c, ui.W, ui.H); const xs = X0 + v * PX, w = OB[k][1];
        if (w) { c.fillStyle = k === 'pencil' ? C.amber : k === 'coin' ? '#C9A24B' : C.blue; d.rr(c, X0, 178, w * PX, 50, Math.min(25, w * PX / 2)); c.fill(); }
        c.fillStyle = C.steel; c.fillRect(X0 - 30, 90, 690, 44); c.beginPath(); c.moveTo(X0 - 30, 134); c.lineTo(X0, 134); c.lineTo(X0, 240); c.lineTo(X0 - 22, 200); c.fill();
        c.strokeStyle = '#10383F'; c.lineWidth = 1; for (let i = 0; i <= 65; i++) { const x = X0 + i * 10; c.beginPath(); c.moveTo(x, 134); c.lineTo(x, i % 10 ? (i % 5 ? 124 : 120) : 114); c.stroke(); if (i % 10 === 0) d.txt(c, String(i / 10), x, 104, { size: 11, color: '#10383F', bold: true }); }
        c.fillStyle = '#C9D6DA'; c.fillRect(xs, 134, 110, 30); c.beginPath(); c.moveTo(xs, 134); c.lineTo(xs, 240); c.lineTo(xs + 22, 200); c.lineTo(xs + 22, 134); c.fill();
        for (let j = 0; j <= 10; j++) { c.beginPath(); c.moveTo(xs + j * 9, 134); c.lineTo(xs + j * 9, j % 5 ? 144 : 150); c.stroke(); }
        d.txt(c, 'drag', xs + 70, 178, { size: 11, color: C.dim });
        // magnified scales
        const vz = Math.round(v * 100), main = Math.floor(vz / 10), co = vz % 10, mx = 250, mm = 26;
        c.fillStyle = 'rgba(8,30,35,.6)'; d.rr(c, 120, 268, 520, 150, 12); c.fill(); d.txt(c, 'Magnified view of the scales', 380, 284, { size: 11, color: C.dim });
        c.save(); c.beginPath(); c.rect(130, 292, 500, 120); c.clip();
        c.fillStyle = C.steel; c.fillRect(130, 296, 500, 50); c.fillStyle = '#C9D6DA'; c.fillRect(mx - 14, 346, 9 * mm / 10 * 10 + 40, 54);
        for (let i = main - 6; i <= main + 18; i++) { if (i < 0) continue; const x = mx + (i - vz / 10) * mm; d.line(c, x, 346, x, i % 10 ? (i % 5 ? 330 : 324) : 316, '#10383F', 1.5); if (i % 10 === 0) d.txt(c, i / 10 + ' cm', x, 306, { size: 11, color: '#10383F', bold: true }); }
        for (let j = 0; j <= 10; j++) { const x = mx + j * mm * .9, hit = show && j === co; d.line(c, x, 346, x, j % 5 ? 362 : 370, hit ? '#D6336C' : '#10383F', hit ? 3 : 1.5); d.txt(c, String(j), x, 384, { size: 11, color: hit ? '#D6336C' : '#10383F', bold: true }); }
        c.restore();
        rG(w && v <= w + .001 ? 'Gripping the ' + OB[k][0].toLowerCase() : 'Open'); rR(show ? (main / 10).toFixed(1) + ' + (' + co + ' × 0.01) = <b>' + v.toFixed(2) + ' cm</b>' : 'Hidden. Read the scales first.');
      });
    }
  };

  /* ---------- pendulum ---------- */
  S.pendulum = {
    title: 'The simple pendulum', subject: 'phy',
    aim: 'To investigate how the length of a pendulum affects its period, and to find the acceleration due to gravity.',
    steps: ['Set the length of the string.', 'Pull the bob a little to one side and let go.', 'Press “Time 10 swings”. The stopwatch times ten complete swings for you.', 'Change the length and repeat. Each result is added to the graph of T² against length.'],
    init(ui) {
      const c = ui.ctx, PX = 215, px = 250, py = 44; let L = .8, g = 9.8, A = 0, ts = 0, timing = -1, sw = 0, res = [];
      const rT = ui.read('Stopwatch (10 swings)'), rP = ui.read('Period T'), rG = ui.read('g = 4π²L ÷ T²');
      const sl = ui.slider('Length of string', .3, 1.4, .05, L, 'm', x => { L = x; });
      ui.select('Where is the pendulum?', [['9.8', 'On Earth'], ['1.6', 'On the Moon'], ['24.8', 'On Jupiter']], x => { g = +x; res = []; });
      ui.button('Time 10 swings', () => { if (Math.abs(A) < .02) { ui.say('Pull the bob to one side and let go first.'); return; } timing = 0; sw = 0; ui.say('Timing ten complete swings…'); }, 'btn-main');
      ui.button('Clear the graph', () => { res = []; });
      const bob = ui.thing({ x: px, y: py + L * PX, w: 50, h: 50, onMove(o, x, y) { A = clamp(Math.atan2(x - px, y - py), -.45, .45); ts = 0; timing = -1; }, onDrop() { ts = 0; ui.say('Swinging. Press “Time 10 swings”.'); } });
      ui.say('Pull the bob to one side and let go.');
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H); const T = 2 * Math.PI * Math.sqrt(L / g); if (!bob.held) ts += dt; const th = bob.held ? A : A * Math.cos(2 * Math.PI * ts / T);
        if (timing >= 0) { timing += dt; sw = Math.min(timing, 10 * T); if (timing >= 10 * T) { timing = -1; res.push([L, T * T]); rP((sw / 10).toFixed(2) + ' s'); rG((4 * Math.PI * Math.PI * L / (T * T)).toFixed(1) + ' m/s²'); ui.say('Ten swings took ' + sw.toFixed(1) + ' s. Change the length and time it again.'); } }
        bob.x = px + Math.sin(th) * L * PX; bob.y = py + Math.cos(th) * L * PX;
        c.fillStyle = C.steel; c.fillRect(px - 70, py - 12, 140, 12); d.line(c, px, py, px, py + 330, C.faint, 1, [4, 5]); d.line(c, px, py, bob.x, bob.y, C.chalk, 1.5); d.dot(c, bob.x, bob.y, 18, C.amber);
        d.txt(c, 'L = ' + L.toFixed(2) + ' m', px + 60, py + L * PX / 2, { size: 12, color: C.dim, align: 'left' });
        c.fillStyle = 'rgba(244,250,249,.95)'; d.rr(c, 40, 330, 120, 46, 10); c.fill(); d.txt(c, sw.toFixed(2) + ' s', 100, 353, { size: 20, bold: true, color: '#10383F' });
        d.graph(c, 500, 80, 210, 200, { xmax: 1.5, ymax: g > 5 ? (g > 20 ? 2.5 : 6) : 36, xl: 'Length L (m)', yl: 'T² (s²)', pts: res.slice().sort((a, b) => a[0] - b[0]), dots: true });
        rT(sw.toFixed(2) + ' s');
      });
    }
  };

  /* ---------- Hooke's law ---------- */
  S.hooke = {
    title: 'Stretching a spring (Hooke’s law)', subject: 'phy',
    aim: 'To investigate how the extension of a spring depends on the force stretching it.',
    steps: ['Drag a 100 g mass onto the hanger. Each mass adds a force of 1 N.', 'Read the extension on the ruler. It is plotted on the graph for you.', 'Keep adding masses. Is the graph a straight line through the origin?', 'With the soft spring, go past 5 N and see what happens when the elastic limit is passed.'],
    init(ui) {
      const c = ui.ctx, X = 230, TOP = 40, L0 = 90, PX = 3; let n = 0, k = 25, perm = 0, pts = {}, fmax = 0;
      const rF = ui.read('Force'), rE = ui.read('Extension'), rK = ui.read('Force ÷ extension'), rN = ui.read('Note');
      const masses = []; const ext = () => n / k * 100 + perm;
      const reset = () => { n = 0; perm = 0; fmax = 0; pts = {}; masses.forEach(m => { m.on = false; m.off = false; m.home(); }); ui.say('Drag a mass onto the hanger.'); };
      ui.select('Spring', [['25', 'Soft spring'], ['50', 'Stiff spring']], x => { k = +x; reset(); });
      ui.button('Remove one mass', () => { const m = masses.filter(m => m.on).pop(); if (m) { m.on = false; m.off = false; m.home(); n--; pts[n] = ext(); } });
      ui.button('New spring', reset);
      for (let i = 0; i < 7; i++) masses.push(ui.thing({ x: 400 + i * 46, y: 366, w: 40, h: 26, onDrop(o) { const hy = TOP + L0 + ext() * PX; if (Math.abs(o.x - X) < 60 && o.y > hy - 30) { o.on = true; o.off = true; n++; if (k === 25 && n > 5 && n > fmax) perm += 3 * (n - 5); fmax = Math.max(fmax, n); pts[n] = ext(); } else o.home(); } }));
      reset();
      ui.loop(() => {
        d.bg(c, ui.W, ui.H, BY); const e = ext(), hy = TOP + L0 + e * PX;
        c.fillStyle = C.steel; c.fillRect(X - 70, TOP - 12, 150, 12);
        c.strokeStyle = C.chalk; c.lineWidth = 2; c.beginPath(); c.moveTo(X, TOP); const turns = 14; for (let i = 0; i <= turns * 2; i++) c.lineTo(X + (i % 2 ? 12 : -12) * (i === 0 || i === turns * 2 ? 0 : 1), TOP + 6 + (hy - TOP - 18) * i / (turns * 2)); c.lineTo(X, hy); c.stroke();
        d.line(c, X - 16, hy, X + 16, hy, C.chalk, 3); let j = 0; masses.forEach(m => { if (m.on) { c.fillStyle = '#C9A24B'; d.rr(c, X - 20, hy + 3 + j * 12, 40, 11, 3); c.fill(); j++; } else { c.fillStyle = '#C9A24B'; d.rr(c, m.x - 20, m.y - 11, 40, 22, 4); c.fill(); d.txt(c, '100 g', m.x, m.y, { size: 10, color: '#0B2A30', bold: true }); } });
        // ruler
        c.fillStyle = 'rgba(244,236,200,.95)'; c.fillRect(X + 60, TOP + L0 - 12, 34, 250); for (let i = 0; i <= 75; i += 5) { d.line(c, X + 60, TOP + L0 + i * PX, X + (i % 10 ? 68 : 74), TOP + L0 + i * PX, '#10383F', 1); if (i % 10 === 0) d.txt(c, String(i), X + 84, TOP + L0 + i * PX, { size: 9, color: '#10383F' }); }
        d.line(c, X + 18, hy, X + 60, hy, C.pink, 1.5); d.txt(c, 'cm', X + 77, TOP + L0 - 22, { size: 10, color: C.dim });
        d.graph(c, 500, 70, 210, 200, { xmax: 7, ymax: k === 25 ? 60 : 16, xl: 'Force (N)', yl: 'Extension (cm)', pts: Object.keys(pts).map(x => [+x, pts[x]]).sort((a, b) => a[0] - b[0]), dots: true });
        rF(n + ' N'); rE(e.toFixed(1) + ' cm'); rK(n && !perm ? (n / e * 100).toFixed(0) + ' N/m (the spring constant)' : '–');
        rN(perm ? 'Elastic limit passed. The spring is permanently stretched and no longer obeys Hooke’s law.' : 'Extension is directly proportional to force.');
      });
    }
  };

  /* ---------- density ---------- */
  S.density = {
    title: 'Finding the density of a solid', subject: 'phy',
    aim: 'To determine the density of an irregular solid from its mass and the volume of water it displaces.',
    steps: ['Drag an object onto the balance and record its mass.', 'Note the water level in the measuring cylinder.', 'Now drag the object into the measuring cylinder and read the new level.', 'Volume of object = new level − first level. Density = mass ÷ volume.'],
    init(ui) {
      const c = ui.ctx, O = [['Stone', 2.6, 20, '#8E8A80'], ['Iron bolt', 7.9, 10, '#7B878C'], ['Aluminium', 2.7, 15, '#C9D2D6'], ['Copper', 8.9, 8, '#C7773E'], ['Glass stopper', 2.5, 12, 'rgba(200,236,240,.75)']];
      const BX = 400, CX = 600, PV = 2.3, got = {}; let bal = -1, cyl = -1, show = false, cur = -1;
      const rM = ui.read('Mass'), rV1 = ui.read('Water level'), rV = ui.read('Volume of object'), rD = ui.read('Density');
      ui.button('Show the working', () => { show = true; }, 'btn-main'); ui.button('Start again', () => { bal = cyl = cur = -1; show = false; Object.keys(got).forEach(k => delete got[k]); ui.things.forEach(o => o.home()); });
      O.forEach((o, i) => ui.thing({ x: 44 + i * 58, y: 356, w: 48, h: 48, onDrop(t) { if (bal === i) bal = -1; if (cyl === i) cyl = -1; if (Math.abs(t.x - BX) < 70 && t.y < 340) { if (bal >= 0) ui.things[bal].home(); bal = cur = i; got[i] = 1; t.x = BX; t.y = 282 - (8 + o[2] * .5); ui.say('Mass recorded. Now put the object into the measuring cylinder.'); } else if (Math.abs(t.x - CX) < 50) { if (cyl >= 0) ui.things[cyl].home(); cyl = cur = i; t.x = CX; t.y = 200; show = false; ui.say(got[i] ? 'The water level rises by the volume of the object.' : 'The water level rises by the volume of the object. Remember to find its mass on the balance too.'); } else t.home(); } }));
      ui.say('Drag an object onto the balance.');
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H, BY);
        // balance
        c.fillStyle = '#5B6B72'; d.rr(c, BX - 80, 300, 160, 80, 10); c.fill(); c.fillStyle = C.steel; d.rr(c, BX - 70, 282, 140, 14, 5); c.fill(); c.fillStyle = '#0B2A30'; d.rr(c, BX - 56, 320, 112, 40, 6); c.fill();
        d.txt(c, (bal >= 0 ? (O[bal][1] * O[bal][2]).toFixed(1) : '0.0') + ' g', BX, 341, { size: 20, bold: true, color: C.green }); d.txt(c, 'Electronic balance', BX, 396, { size: 11, color: C.dim });
        // cylinder
        const lvl = 50 + (cyl >= 0 ? O[cyl][2] : 0), top = BY - 100 * PV; if (cyl >= 0) { const t = ui.things[cyl]; if (!t.held) t.y = Math.min(BY - 10 - (8 + O[cyl][2] * .5), t.y + 200 * dt); }
        c.fillStyle = C.water; c.fillRect(CX - 34, BY - lvl * PV, 68, lvl * PV - 4); c.strokeStyle = C.glass; c.lineWidth = 2.2; c.strokeRect(CX - 35, top - 14, 70, 100 * PV + 10); d.line(c, CX - 52, BY - 2, CX + 52, BY - 2, C.glass, 5);
        for (let i = 0; i <= 100; i += 2) { d.line(c, CX - 35, BY - 4 - i * PV, CX - (i % 10 ? 28 : 20), BY - 4 - i * PV, C.glass, 1); if (i % 10 === 0) d.txt(c, String(i), CX - 50, BY - 4 - i * PV, { size: 10, color: C.dim }); }
        d.txt(c, 'cm³', CX - 50, top - 26, { size: 10, color: C.dim }); d.line(c, CX + 35, BY - 4 - lvl * PV, CX + 70, BY - 4 - lvl * PV, C.pink, 1.5); d.txt(c, lvl + ' cm³', CX + 96, BY - 4 - lvl * PV, { size: 12, bold: true });
        O.forEach((o, i) => { const t = ui.things[i], r = 8 + o[2] * .5; c.fillStyle = o[3]; if (i === 0) { c.beginPath(); c.ellipse(t.x, t.y, r * 1.15, r * .85, .3, 0, 7); c.fill(); } else { d.rr(c, t.x - r, t.y - r, r * 2, r * 2, i === 4 ? r : 3); c.fill(); } if (t.x === t.hx) d.txt(c, o[0].split(' ')[0], t.x, 396, { size: 10, color: C.dim }); });
        const o = cur >= 0 ? O[cur] : null, m = o && got[cur] ? o[1] * o[2] : null; rM(m ? o[0] + ': ' + m.toFixed(1) + ' g' : 'Not measured yet'); rV1('50 cm³ → ' + lvl + ' cm³'); rV(cyl >= 0 ? lvl + ' − 50 = ' + O[cyl][2] + ' cm³' : 'Not measured yet');
        rD(!show ? 'Work it out, then check.' : m && cyl === cur ? m.toFixed(1) + ' ÷ ' + o[2] + ' = <b>' + o[1] + ' g/cm³</b> (' + o[1] * 1000 + ' kg/m³)' : 'You need both the mass and the volume of the same object first.');
      });
    }
  };

  /* ---------- Archimedes ---------- */
  S.float = {
    title: 'Upthrust and Archimedes’ principle', subject: 'phy',
    aim: 'To compare the apparent loss in weight of an object in a liquid with the weight of the liquid it displaces.',
    steps: ['Read the weight of the block in air on the spring balance.', 'Drag the spring balance down to lower the block into the full overflow can.', 'Watch the balance reading fall and the displaced liquid run into the beaker.', 'Compare the upthrust with the weight of displaced liquid. Then try a block that floats.'],
    init(ui) {
      const c = ui.ctx, OB = { steel: ['Steel', 7.8, '#7B878C'], alu: ['Aluminium', 2.7, '#C9D2D6'], stone: ['Stone', 2.6, '#8E8A80'], wax: ['Candle wax', .9, '#EFE6C8'], wood: ['Wood', .6, C.wood] }, LQ = { water: ['Water', 1, C.water], ker: ['Kerosene', .8, 'rgba(240,215,120,.45)'], salt: ['Salt water', 1.2, 'rgba(130,200,230,.55)'] };
      let ok = 'steel', lk = 'water', disp = 0; const X = 290, SUR = 256;
      const rW = ui.read('Weight in air'), rA = ui.read('Balance reads (apparent weight)'), rU = ui.read('Upthrust'), rD = ui.read('Weight of displaced liquid'), rN = ui.read('Note');
      const sb = ui.thing({ x: X, y: 70, w: 60, h: 120, lockX: true, clamp: [X, 60, X, 190] });
      const rs = () => { disp = 0; sb.home(); };
      ui.select('Block (volume 100 cm³)', Object.keys(OB).map(k => [k, OB[k][0]]), v => { ok = v; rs(); }); ui.select('Liquid in the can', Object.keys(LQ).map(k => [k, LQ[k][0]]), v => { lk = v; rs(); });
      ui.say('Drag the spring balance down to lower the block into the liquid.');
      ui.loop(() => {
        d.bg(c, ui.W, ui.H, BY); const ro = OB[ok][1], rl = LQ[lk][1], W = ro, want = clamp((sb.y + 150 - SUR) / 60, 0, 1), fmax = Math.min(1, ro / rl), f = Math.min(want, fmax), floating = want > fmax + .001;
        const U = f * rl, app = floating ? 0 : W - U, bb = floating ? SUR + fmax * 60 : sb.y + 150; disp = Math.max(disp, f);
        // overflow can and beaker
        c.fillStyle = LQ[lk][2]; c.fillRect(X - 58, SUR, 116, BY - SUR - 3); c.strokeStyle = C.glass; c.lineWidth = 2.2; c.beginPath(); c.moveTo(X - 60, SUR - 16); c.lineTo(X - 60, BY - 2); c.lineTo(X + 60, BY - 2); c.lineTo(X + 60, SUR + 6); c.lineTo(X + 100, SUR + 22); c.moveTo(X + 60, SUR - 4); c.lineTo(X + 60, SUR - 16); c.moveTo(X + 60, SUR - 4); c.lineTo(X + 104, SUR + 12); c.stroke();
        d.beaker(c, X + 130, BY, 70, 80, disp * rl / 1.3, LQ[lk][2]); d.txt(c, 'Overflow can', X, 398, { size: 11, color: C.dim }); d.txt(c, 'Displaced liquid', X + 140, 398, { size: 11, color: C.dim });
        if (f > disp - .001 && want > 0 && f < fmax && f < 1) d.dot(c, X + 104, SUR + 30 + (performance.now() / 6) % 40, 3, C.blue);
        // balance, string, block
        c.fillStyle = 'rgba(244,250,249,.95)'; d.rr(c, X - 16, sb.y - 50, 32, 96, 6); c.fill(); d.line(c, X, sb.y - 50, X, sb.y - 66, C.steel, 3); c.beginPath(); c.arc(X, sb.y - 72, 6, 0, 7); c.strokeStyle = C.steel; c.stroke();
        for (let i = 0; i <= 8; i++) d.line(c, X - 16, sb.y - 40 + i * 10, X - 8, sb.y - 40 + i * 10, '#10383F', 1); d.line(c, X - 10, sb.y - 40 + app * 10, X + 12, sb.y - 40 + app * 10, '#D6336C', 3); d.txt(c, app.toFixed(1) + ' N', X + 48, sb.y - 4, { size: 14, bold: true });
        c.strokeStyle = C.chalk; c.lineWidth = 1.5; c.beginPath(); c.moveTo(X, sb.y + 46); if (floating) c.quadraticCurveTo(X + 18, (sb.y + bb) / 2 - 20, X, bb - 60); else c.lineTo(X, bb - 60); c.stroke();
        c.fillStyle = OB[ok][2]; d.rr(c, X - 22, bb - 60, 44, 60, 4); c.fill();
        if (U > 0) { d.arrow(c, X - 44, bb - 10, X - 44, bb - 10 - U * 40, C.green, 3); d.txt(c, 'upthrust', X - 78, bb - 30, { size: 10, color: C.green }); }
        rW(W.toFixed(1) + ' N'); rA(app.toFixed(1) + ' N'); rU(U.toFixed(2) + ' N'); rD((disp * rl).toFixed(2) + ' N (' + (disp * 100).toFixed(0) + ' cm³)');
        rN(floating ? 'The block floats. Upthrust equals its whole weight, so the string goes slack: the law of flotation.' : f >= 1 ? 'Fully immersed. Upthrust = weight of liquid displaced: Archimedes’ principle.' : f > 0 ? 'The deeper it goes, the more liquid it displaces and the bigger the upthrust.' : 'In air the balance shows the true weight.');
      });
    }
  };

  /* ---------- pressure in liquids ---------- */
  S.pressure = {
    title: 'Pressure in a liquid increases with depth', subject: 'phy',
    aim: 'To show that the pressure in a liquid depends on depth and density.',
    steps: ['Click the three plugs to pull them out. Which jet travels furthest?', 'Watch the jets shrink as the liquid level falls.', 'Drag the pressure probe up and down inside the liquid and read the gauge.', 'Change the liquid and compare the pressure at the same depth.'],
    init(ui) {
      const c = ui.ctx, PX = 220, BOT = 250, XL = 90, XR = 190, HO = [.2, .5, .8], LQ = { w: ['Water', 1000, C.water], k: ['Kerosene', 800, 'rgba(240,215,120,.45)'], s: ['Salt water', 1200, 'rgba(130,200,230,.55)'] };
      let L = 1, lk = 'w'; const open = [false, false, false], rD = ui.read('Depth of probe'), rP = ui.read('Pressure from the liquid, P = hρg'), rJ = ui.read('Jets');
      ui.select('Liquid', Object.keys(LQ).map(k => [k, LQ[k][0]]), v => { lk = v; }); ui.button('Refill and replace plugs', () => { L = 1; open.fill(false); });
      HO.forEach((h, i) => ui.thing({ x: XR + 8, y: BOT - h * PX, w: 34, h: 30, drag: false, onClick() { open[i] = !open[i]; } }));
      const pr = ui.thing({ x: 140, y: 150, w: 40, h: 40, clamp: [XL + 12, 40, XR - 12, BOT - 8] });
      ui.say('Click a plug to pull it out.');
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H, BY); const sy = BOT - L * PX; let out = 0;
        c.fillStyle = '#5B6B72'; c.fillRect(XL + 10, BOT, 80, BY - BOT); c.fillStyle = LQ[lk][2]; c.fillRect(XL, sy, XR - XL, BOT - sy);
        c.strokeStyle = C.glass; c.lineWidth = 2.5; c.beginPath(); c.moveTo(XL, 24); c.lineTo(XL, BOT); c.lineTo(XR, BOT); c.lineTo(XR, 24); c.stroke();
        for (let i = 0; i <= 10; i++) { d.line(c, XL - 8, BOT - i * 22, XL, BOT - i * 22, C.dim, 1); if (i % 5 === 0) d.txt(c, (i / 10).toFixed(1) + ' m', XL - 30, BOT - i * 22, { size: 10, color: C.dim }); }
        HO.forEach((h, i) => {
          const y = BOT - h * PX, dep = L - h;
          if (open[i] && dep > 0) { const v = Math.sqrt(20 * dep); out += v; c.strokeStyle = 'rgba(86,174,255,.85)'; c.lineWidth = 3; c.beginPath(); for (let t = 0; t < 1; t += .02) { const yy = y + 5 * t * t * PX; if (yy > BY) break; c.lineTo(XR + v * t * PX, yy); } c.stroke(); }
          if (!open[i]) { c.fillStyle = '#C2415B'; d.rr(c, XR - 3, y - 6, 18, 12, 4); c.fill(); } else d.dot(c, XR, y, 3, C.bg);
        });
        L = Math.max(0, L - out * dt * .012);
        // probe and gauge
        const dep = Math.max(0, (pr.y - sy) / PX), P = dep * LQ[lk][1] * 10; d.line(c, pr.x, pr.y, pr.x, 14, C.steel, 2); d.line(c, pr.x, 14, 560, 14, C.steel, 2); d.line(c, 560, 14, 560, 90, C.steel, 2); d.dot(c, pr.x, pr.y, 8, C.amber);
        d.meter(c, 560, 150, 62, P / 12000, 'Pa', Math.round(P / 10) * 10 + ' Pa');
        rD(dep.toFixed(2) + ' m'); rP(dep.toFixed(2) + ' × ' + LQ[lk][1] + ' × 10 = <b>' + Math.round(P / 10) * 10 + ' Pa</b>'); rJ(open.some(Boolean) ? (L > .21 ? 'The lowest jet is fastest, because pressure is greatest at the greatest depth.' : 'The level has fallen, so the pressure and the jets have died away.') : 'All plugs in.');
      });
    }
  };

  /* ---------- linear motion ---------- */
  S.motion = {
    title: 'A trolley moving in a straight line', subject: 'phy',
    aim: 'To relate the motion of a trolley to its velocity–time and distance–time graphs.',
    steps: ['Set the starting velocity and the acceleration.', 'Press “Run the trolley” and watch the dots it leaves every second.', 'Compare the spacing of the dots with the shapes of the two graphs.', 'Try zero acceleration, then a negative acceleration (slowing down).'],
    init(ui) {
      const c = ui.ctx; let u = 2, a = 1, t = 0, run = false; const rT = ui.read('Time'), rV = ui.read('Velocity, v = u + at'), rS = ui.read('Distance, s = ut + ½at²'), rK = ui.read('Kind of motion');
      ui.slider('Starting velocity u', 0, 10, 1, u, 'm/s', x => { u = x; t = 0; run = false; }); ui.slider('Acceleration a', -2, 4, .5, a, 'm/s²', x => { a = x; t = 0; run = false; });
      ui.button('Run the trolley', () => { t = 0; run = true; }, 'btn-main');
      ui.say('Set u and a, then run the trolley.');
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H); const TE = a < 0 && u > 0 ? Math.min(10, -u / a) : a < 0 ? 0 : 10, s = x => u * x + .5 * a * x * x, SM = Math.max(s(TE), 1), VM = Math.max(u, u + a * TE, 1);
        if (run) { t += dt * 2; if (t >= TE) { t = TE; run = false; } }
        const X = x => 60 + 620 * s(x) / SM; d.line(c, 40, 120, 720, 120, C.steel, 4);
        for (let i = 0; i <= Math.floor(t + 1e-6); i++) d.dot(c, X(i), 136, 4, C.amber);
        const tx = X(t); c.fillStyle = C.blue; d.rr(c, tx - 30, 86, 60, 22, 5); c.fill(); d.dot(c, tx - 18, 112, 7, C.chalk); d.dot(c, tx + 18, 112, 7, C.chalk); d.txt(c, 'One dot every second', 60, 156, { size: 11, color: C.dim, align: 'left' }); d.txt(c, '0 m', 60, 66, { size: 11, color: C.dim }); d.txt(c, SM.toFixed(0) + ' m', 680, 66, { size: 11, color: C.dim });
        const pv = [], ps = []; for (let x = 0; x <= t + 1e-6; x += .1) { pv.push([x, u + a * x]); ps.push([x, s(x)]); }
        d.graph(c, 80, 210, 250, 150, { xmax: 10, ymax: Math.ceil(VM), xl: 'Time (s)', yl: 'Velocity (m/s)', pts: pv, color: C.amber }); d.graph(c, 440, 210, 250, 150, { xmax: 10, ymax: Math.ceil(SM), xl: 'Time (s)', yl: 'Distance (m)', pts: ps, color: C.pink });
        rT(t.toFixed(1) + ' s'); rV((u + a * t).toFixed(1) + ' m/s'); rS(s(t).toFixed(1) + ' m'); rK(a === 0 ? 'Uniform velocity: equal spacing, a flat velocity–time graph' : a > 0 ? 'Uniform acceleration: spacing grows, the velocity–time graph slopes up' : 'Uniform retardation: spacing shrinks until the trolley stops');
      });
    }
  };

  /* ---------- energy ---------- */
  S.energy = {
    title: 'Potential and kinetic energy of a falling ball', subject: 'phy',
    aim: 'To show how potential energy changes to kinetic energy as a ball falls, while the total stays constant.',
    steps: ['Drag the ball up to any height and let go.', 'Watch the energy bars while it falls.', 'Change the mass and repeat from the same height. What changes and what stays the same?'],
    init(ui) {
      const c = ui.ctx, X = 170, G = 360, PX = 15; let m = 2, h0 = 0, v = 0, fall = false, landed = false;
      const rH = ui.read('Height'), rV = ui.read('Speed'), rP = ui.read('Potential energy, mgh'), rK = ui.read('Kinetic energy, ½mv²');
      ui.slider('Mass of ball', .5, 5, .5, m, 'kg', x => { m = x; });
      const b = ui.thing({ x: X, y: G, w: 54, h: 54, lockX: true, clamp: [X, G - 20 * PX, X, G], onMove() { fall = false; landed = false; v = 0; }, onDrop(o) { h0 = (G - o.y) / PX; fall = true; ui.say('Falling from ' + h0.toFixed(1) + ' m…'); } });
      ui.say('Drag the ball up and let go.');
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H, G + 18); if (b.held) h0 = (G - b.y) / PX;
        if (fall) { v += 10 * dt; b.y += v * dt * PX; if (b.y >= G) { b.y = G; fall = false; landed = true; ui.say('It hits the ground at ' + Math.sqrt(20 * h0).toFixed(1) + ' m/s. The kinetic energy then changes to heat and sound.'); } }
        const h = (G - b.y) / PX, pe = m * 10 * h, tot = m * 10 * h0, ke = landed ? 0 : Math.max(0, tot - pe), sp = landed ? 0 : Math.sqrt(2 * ke / m);
        for (let i = 0; i <= 20; i += 5) { d.line(c, 60, G - i * PX, 110, G - i * PX, C.faint, 1); d.txt(c, i + ' m', 40, G - i * PX, { size: 11, color: C.dim }); }
        d.dot(c, b.x, b.y - 18 + 18, 18, C.amber);
        const bars = [['Potential', pe, C.blue], ['Kinetic', ke, C.pink], [landed ? 'Heat + sound' : 'Total', landed ? tot : pe + ke, C.green]], MX = 1000;
        bars.forEach((q, i) => { const x = 420 + i * 110, hh = 280 * q[1] / MX; c.fillStyle = 'rgba(234,244,242,.07)'; d.rr(c, x - 30, 60, 60, 280, 6); c.fill(); c.fillStyle = q[2]; d.rr(c, x - 30, 340 - hh, 60, Math.max(hh, .1), 6); c.fill(); d.txt(c, q[0], x, 358, { size: 12 }); d.txt(c, q[1].toFixed(0) + ' J', x, 46, { size: 13, bold: true }); });
        rH(h.toFixed(1) + ' m'); rV(sp.toFixed(1) + ' m/s'); rP(pe.toFixed(0) + ' J'); rK(ke.toFixed(0) + ' J');
      });
    }
  };

  /* ---------- electroscope ---------- */
  S.electroscope = {
    title: 'Charging a gold-leaf electroscope', subject: 'phy',
    aim: 'To charge objects by rubbing, and to charge an electroscope by contact and by induction.',
    steps: ['Rub a rod on the cloth by dragging it back and forth over the cloth.', 'Bring the charged rod near the cap (without touching) and watch the leaves.', 'Touch the cap with the rod to charge the electroscope by contact.', 'For induction: hold a charged rod near the cap, touch the cap with the finger, remove the finger, then remove the rod.'],
    init(ui) {
      const c = ui.ctx, X = 400, CY = 130; let Q = 0, lx = 0;
      const rR = ui.read('Rods'), rQ = ui.read('Charge on the electroscope'), rL = ui.read('Leaves');
      const rods = [['Polythene rod', -1, '#E9E2C8', 300], ['Glass rod', 1, 'rgba(200,236,240,.85)', 340]].map(r => ui.thing({ x: 110, y: r[3], w: 170, h: 26, name: r[0], s: r[1], col: r[2], q: 0, onDown(o) { lx = o.x; }, onMove(o) { if (Math.abs(o.x - 640) < 90 && Math.abs(o.y - 340) < 44) { o.q = Math.min(1, o.q + Math.abs(o.x - lx) * .004); if (o.q >= 1) ui.say('The ' + o.name.toLowerCase() + ' is charged ' + (o.s < 0 ? 'negatively: it gained electrons from the cloth.' : 'positively: it lost electrons to the cloth.') + ' Bring it near the cap.'); } lx = o.x; if (o.q > .3 && Math.hypot(o.x - 85 - X, o.y - CY) < 22) { Q = o.s; ui.say('The rod touched the cap, so charge was shared. The electroscope now has the same charge as the rod.'); } } }));
      const fin = ui.thing({ x: 660, y: 130, w: 50, h: 90 });
      ui.button('Discharge everything', () => { Q = 0; rods.forEach(r => { r.q = 0; r.home(); }); fin.home(); });
      ui.say('Rub a rod on the cloth: drag it back and forth across the cloth.');
      const signs = (x, y, w, n, s, col) => { for (let i = 0; i < n; i++) d.txt(c, s > 0 ? '+' : '−', x + (i - (n - 1) / 2) * w, y, { size: 14, bold: true, color: col || (s > 0 ? C.pink : C.blue) }); };
      ui.loop(() => {
        d.bg(c, ui.W, ui.H, BY); let inf = 0; rods.forEach(r => { const dd = Math.hypot(r.x - 85 - X, r.y - CY); inf += r.s * r.q * clamp(1 - (dd - 30) / 170, 0, 1); }); inf = clamp(inf, -1, 1);
        const earth = Math.hypot(fin.x - X, fin.y + 44 - CY) < 30; if (earth) Q = clamp(-2 * inf, -1, 1);
        const leaf = earth ? 0 : Q / 2 + inf, cap = Q / 2 - inf, ang = Math.min(52, Math.abs(leaf) * 52) * deg;
        c.fillStyle = C.wood; c.fillRect(X - 90, 372, 180, 10); c.fillStyle = 'rgba(200,236,240,.1)'; c.strokeStyle = C.glass; c.lineWidth = 2; d.rr(c, X - 80, 190, 160, 182, 10); c.fill(); c.stroke();
        d.line(c, X, CY, X, 250, C.amber, 5); c.fillStyle = C.amber; c.beginPath(); c.ellipse(X, CY, 44, 9, 0, 0, 7); c.fill(); c.fillStyle = '#5B6B72'; c.fillRect(X - 12, 182, 24, 14);
        [-1, 1].forEach(k => d.line(c, X, 250, X + k * Math.sin(ang) * 90, 250 + Math.cos(ang) * 90, '#F4D35E', 4));
        signs(X, CY - 22, 16, Math.round(Math.abs(cap) * 4), cap); signs(X - 30, 300, 12, Math.round(Math.abs(leaf) * 3), leaf); signs(X + 30, 300, 12, Math.round(Math.abs(leaf) * 3), leaf);
        // cloth, rods, finger
        c.fillStyle = '#8A5A8E'; d.rr(c, 560, 310, 160, 60, 12); c.fill(); d.txt(c, 'Cloth: rub the rods here', 640, 392, { size: 11, color: C.dim });
        rods.forEach(r => { c.fillStyle = r.col; d.rr(c, r.x - 85, r.y - 9, 170, 18, 9); c.fill(); if (r.q > .15) signs(r.x, r.y, 26, Math.round(r.q * 5), r.s, '#0B2A30'); if (r.x === r.hx) d.txt(c, r.name, r.x + 96, r.y, { size: 11, color: C.dim, align: 'left' }); });
        d.hand(c, fin.x, fin.y + 40); if (fin.x === fin.hx) d.txt(c, 'Finger (earth)', fin.x, fin.y + 60, { size: 11, color: C.dim }); if (earth) d.txt(c, 'earthed', X + 90, CY - 30, { size: 12, color: C.green, bold: true });
        rR(rods.map(r => r.name.split(' ')[0] + ': ' + (r.q < .15 ? 'not charged' : r.s < 0 ? 'negative' : 'positive')).join('<br>')); rQ(Q === 0 ? 'None' : Q > 0 ? 'Positive' : 'Negative');
        rL(ang < .05 ? 'Hanging together' : 'Spread apart: both carry ' + (leaf > 0 ? 'positive' : 'negative') + ' charge, and like charges repel');
      });
    }
  };

  /* ---------- circuit ---------- */
  S.circuit = {
    title: 'Current, voltage and resistance (Ohm’s law)', subject: 'phy',
    aim: 'To investigate how the current through a resistor depends on the voltage across it, and how resistors combine.',
    steps: ['Click the switch to close the circuit.', 'Change the number of cells and read the ammeter and voltmeter each time. Is V ÷ I constant?', 'Change the resistance and see how the current responds.', 'Add a second resistor in series, then in parallel, and compare the total resistance.'],
    init(ui) {
      const c = ui.ctx; let n = 2, R1 = 4, R2 = 4, mode = 'none', on = false, ph = 0;
      const rR = ui.read('Total resistance'), rI = ui.read('Current (ammeter)'), rV = ui.read('Voltage across R₁ (voltmeter)'), rO = ui.read('V ÷ I for R₁');
      ui.slider('Number of cells (1.5 V each)', 1, 4, 1, n, '', x => { n = x; }); ui.slider('Resistor R₁', 2, 20, 1, R1, 'Ω', x => { R1 = x; });
      ui.select('Second resistor R₂', [['none', 'Not connected'], ['ser', 'In series with R₁'], ['par', 'In parallel with R₁']], x => { mode = x; }); ui.slider('Resistor R₂', 2, 20, 1, R2, 'Ω', x => { R2 = x; });
      ui.thing({ x: 380, y: 80, w: 90, h: 50, drag: false, onClick() { on = !on; ui.say(on ? 'Circuit closed. Current flows.' : 'Circuit open. No current.'); } });
      ui.say('Click the switch to close the circuit.');
      const L = 80, R = 470, T = 80, B = 330, per = 2 * (R - L) + 2 * (B - T);
      const res = (x, y, lab) => { c.fillStyle = C.bg; c.fillRect(x - 36, y - 12, 72, 24); c.strokeStyle = C.chalk; c.lineWidth = 2; c.strokeRect(x - 36, y - 12, 72, 24); d.txt(c, lab, x, y, { size: 12, bold: true }); };
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H); const V = n * 1.5, Rt = mode === 'ser' ? R1 + R2 : mode === 'par' ? R1 * R2 / (R1 + R2) : R1, I = on ? V / Rt : 0, V1 = on ? (mode === 'ser' ? I * R1 : V) : 0;
        c.strokeStyle = C.chalk; c.lineWidth = 2; c.strokeRect(L, T, R - L, B - T);
        // cells
        c.fillStyle = C.bg; c.fillRect(160 - 8, T - 20, n * 22 + 6, 40); for (let i = 0; i < n; i++) { d.line(c, 160 + i * 22, T - 18, 160 + i * 22, T + 18, C.chalk, 2); d.line(c, 170 + i * 22, T - 9, 170 + i * 22, T + 9, C.chalk, 5); } d.txt(c, V.toFixed(1) + ' V', 160 + n * 11, T - 34, { size: 12, color: C.amber, bold: true }); d.txt(c, '+', 148, T - 14, { size: 13 });
        // switch
        c.fillStyle = C.bg; c.fillRect(350, T - 6, 60, 12); d.dot(c, 350, T, 4, C.chalk); d.dot(c, 410, T, 4, C.chalk); d.line(c, 350, T, on ? 410 : 402, on ? T : T - 28, C.amber, 3); d.txt(c, 'Switch (click)', 380, T + 22, { size: 11, color: C.dim });
        // resistors
        if (mode === 'ser') { res(190, B, 'R₂ ' + R2 + ' Ω'); res(350, B, 'R₁ ' + R1 + ' Ω'); } else res(275, B, 'R₁ ' + R1 + ' Ω');
        const rx = mode === 'ser' ? 350 : 275; if (mode === 'par') { c.strokeStyle = C.chalk; c.beginPath(); c.moveTo(rx - 70, B); c.lineTo(rx - 70, B + 56); c.lineTo(rx + 70, B + 56); c.lineTo(rx + 70, B); c.stroke(); res(rx, B + 56, 'R₂ ' + R2 + ' Ω'); }
        c.strokeStyle = C.dim; c.lineWidth = 1.5; c.beginPath(); c.moveTo(rx - 50, B); c.lineTo(rx - 50, B - 56); c.lineTo(rx + 50, B - 56); c.lineTo(rx + 50, B); c.stroke(); d.dot(c, rx, B - 56, 15, C.bg); c.beginPath(); c.arc(rx, B - 56, 15, 0, 7); c.stroke(); d.txt(c, 'V', rx, B - 56, { size: 13, bold: true });
        d.dot(c, R, 205, 16, C.bg); c.strokeStyle = C.chalk; c.lineWidth = 2; c.beginPath(); c.arc(R, 205, 16, 0, 7); c.stroke(); d.txt(c, 'A', R, 205, { size: 13, bold: true });
        // moving charge
        ph = (ph + I * dt * 60) % 40; if (I > 0) for (let s = ph; s < per; s += 40) { let x, y, q = s; if (q < R - L) { x = L + q; y = T; } else if ((q -= R - L) < B - T) { x = R; y = T + q; } else if ((q -= B - T) < R - L) { x = R - q; y = B; } else { q -= R - L; x = L; y = B - q; } d.dot(c, x, y, 3, C.amber); }
        d.meter(c, 620, 120, 70, I / 6, 'A', I.toFixed(2) + ' A'); d.meter(c, 620, 300, 70, V1 / 6, 'V', V1.toFixed(2) + ' V');
        rR(Rt.toFixed(1) + ' Ω' + (mode === 'ser' ? ' (R₁ + R₂)' : mode === 'par' ? ' (less than either resistor)' : '')); rI(I.toFixed(2) + ' A'); rV(V1.toFixed(2) + ' V');
        rO(on ? (() => { const i1 = mode === 'par' ? V / R1 : I; return V1.toFixed(2) + ' ÷ ' + i1.toFixed(2) + ' = <b>' + R1 + ' Ω</b>'; })() : 'Close the switch');
      });
    }
  };

  /* ---------- magnetic field ---------- */
  S.magnet = {
    title: 'Mapping the magnetic field of a bar magnet', subject: 'phy',
    aim: 'To plot magnetic field patterns around one magnet and between two magnets.',
    steps: ['Drag the plotting compass around the magnet. The red end of the needle shows the field direction.', 'Press “Sprinkle iron filings” to see the whole pattern.', 'Choose two magnets with unlike poles facing, then like poles facing.', 'With like poles facing, find the neutral point where the compass has no fixed direction.'],
    init(ui) {
      const c = ui.ctx, Y = 220; let cfg = 'one', filings = false, lines = [], poles = [], mags = [];
      const rC = ui.read('Compass'), rN = ui.read('Pattern');
      const B = (x, y) => { let bx = 0, by = 0; poles.forEach(p => { const dx = x - p[0], dy = y - p[1], r = Math.max(8, Math.hypot(dx, dy)); bx += p[2] * dx / (r * r * r); by += p[2] * dy / (r * r * r); }); return [bx, by]; };
      const build = () => {
        mags = cfg === 'one' ? [[290, 470, 1]] : cfg === 'att' ? [[110, 290, 1], [470, 650, 1]] : [[110, 290, 1], [470, 650, -1]];
        poles = []; mags.forEach(m => { poles.push([m[1] - 16, Y, m[2]]); poles.push([m[0] + 16, Y, -m[2]]); }); // m[2]=1: N on the right
        lines = []; poles.filter(p => p[2] > 0).forEach(p => { for (let k = 0; k < 14; k++) { const a = (k + .5) / 14 * 6.283; let x = p[0] + Math.cos(a) * 12, y = p[1] + Math.sin(a) * 12; const ln = [[x, y]]; for (let s = 0; s < 420; s++) { const b = B(x, y), m = Math.hypot(b[0], b[1]) || 1; x += b[0] / m * 5; y += b[1] / m * 5; ln.push([x, y]); if (x < -40 || x > 800 || y < -40 || y > 480 || poles.some(q => q[2] < 0 && Math.hypot(x - q[0], y - q[1]) < 12)) break; } lines.push(ln); } });
      };
      ui.select('Magnets', [['one', 'One bar magnet'], ['att', 'Two magnets, unlike poles facing'], ['rep', 'Two magnets, like poles facing']], v => { cfg = v; build(); });
      ui.button('Sprinkle iron filings', () => { filings = !filings; });
      const cp = ui.thing({ x: 380, y: 110, w: 56, h: 56 }); build();
      ui.say('Drag the plotting compass around the magnet.');
      ui.loop(() => {
        d.bg(c, ui.W, ui.H);
        if (filings) { c.strokeStyle = 'rgba(234,244,242,.4)'; c.lineWidth = 1.4; c.beginPath(); for (let x = 14; x < 760; x += 16) for (let y = 14; y < 440; y += 16) { const b = B(x, y), a = Math.atan2(b[1], b[0]), jx = (x * 7 + y * 13) % 7 - 3; c.moveTo(x + jx - Math.cos(a) * 5, y - Math.sin(a) * 5); c.lineTo(x + jx + Math.cos(a) * 5, y + Math.sin(a) * 5); } c.stroke(); }
        else lines.forEach(ln => { c.strokeStyle = 'rgba(234,244,242,.38)'; c.lineWidth = 1.4; c.beginPath(); ln.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); const m = ln[Math.min(ln.length - 2, 16)], n = ln[Math.min(ln.length - 1, 17)]; if (m && n) d.arrow(c, m[0], m[1], n[0], n[1], 'rgba(234,244,242,.6)', 1.4); });
        mags.forEach(m => { const mid = (m[0] + m[1]) / 2, nl = m[2] > 0 ? mid : m[0]; c.fillStyle = '#3F6FD8'; c.fillRect(m[0], Y - 22, m[1] - m[0], 44); c.fillStyle = '#D6455A'; c.fillRect(nl, Y - 22, mid - m[0], 44); d.txt(c, 'N', nl + (mid - m[0]) / 2, Y, { size: 18, bold: true }); d.txt(c, 'S', (m[2] > 0 ? m[0] : mid) + (mid - m[0]) / 2, Y, { size: 18, bold: true }); });
        if (cfg === 'rep') d.txt(c, '✕ neutral point', 380, Y - 40, { size: 12, color: C.amber, bold: true });
        const b = B(cp.x, cp.y), a = Math.atan2(b[1], b[0]), weak = cfg === 'rep' && Math.hypot(cp.x - 380, cp.y - Y) < 26;
        d.dot(c, cp.x, cp.y, 26, 'rgba(244,250,249,.95)'); c.strokeStyle = C.steel; c.lineWidth = 3; c.beginPath(); c.arc(cp.x, cp.y, 26, 0, 7); c.stroke();
        if (!weak) { d.line(c, cp.x, cp.y, cp.x + Math.cos(a) * 20, cp.y + Math.sin(a) * 20, '#D6455A', 5); d.line(c, cp.x, cp.y, cp.x - Math.cos(a) * 20, cp.y - Math.sin(a) * 20, '#3F6FD8', 5); } d.dot(c, cp.x, cp.y, 3, '#10383F');
        rC(weak ? 'At the neutral point the two fields cancel, so the needle has no fixed direction.' : 'The red (north) end points along the field line, away from N and towards S.');
        rN(cfg === 'one' ? 'Field lines leave the N pole and enter the S pole. They are closest together at the poles, where the field is strongest.' : cfg === 'att' ? 'Unlike poles attract. Field lines run straight across the gap from N to S.' : 'Like poles repel. The field lines curve away from each other, leaving a neutral point between the poles.');
      });
    }
  };

  /* ---------- reflection ---------- */
  S.reflect = {
    title: 'Laws of reflection at a plane mirror', subject: 'phy',
    aim: 'To verify that the angle of incidence equals the angle of reflection.',
    steps: ['Drag the ray box around the mirror to change the angle of incidence.', 'Read the angle of incidence and the angle of reflection from the protractor.', 'Repeat for several angles. What do you notice every time?', 'Note that both angles are measured from the normal, not from the mirror.'],
    init(ui) {
      const c = ui.ctx, X = 380, Y = 340, R = 250; let a = -40 * deg; const rI = ui.read('Angle of incidence, i'), rR = ui.read('Angle of reflection, r'), rN = ui.read('Conclusion');
      const put = o => { o.x = X + Math.sin(a) * R; o.y = Y - Math.cos(a) * R; };
      const box = ui.thing({ x: 0, y: 0, w: 70, h: 70, onMove(o, x, y) { a = clamp(Math.atan2(x - X, Y - y), -85 * deg, 85 * deg); if (Math.abs(a) < .5 * deg) a = 0; put(o); } }); put(box);
      ui.say('Drag the ray box around the mirror.');
      ui.loop(() => {
        d.bg(c, ui.W, ui.H); c.fillStyle = C.steel; c.fillRect(110, Y, 540, 6); for (let x = 116; x < 650; x += 14) d.line(c, x, Y + 6, x - 8, Y + 16, C.dim, 1);
        c.strokeStyle = C.faint; c.lineWidth = 1.2; c.beginPath(); c.arc(X, Y, 200, Math.PI, 0); c.stroke(); for (let g = -80; g <= 80; g += 10) { const s = Math.sin(g * deg), k = Math.cos(g * deg); d.line(c, X + s * 192, Y - k * 192, X + s * 200, Y - k * 200, C.dim, 1); d.txt(c, String(Math.abs(g)), X + s * 216, Y - k * 216, { size: 10, color: C.dim }); }
        d.line(c, X, Y, X, Y - 240, C.chalk, 1.5, [6, 5]); d.txt(c, 'normal', X, Y - 252, { size: 11, color: C.dim });
        d.arrow(c, box.x, box.y, X + Math.sin(a) * 110, Y - Math.cos(a) * 110, C.amber, 3); d.line(c, X + Math.sin(a) * 110, Y - Math.cos(a) * 110, X, Y, C.amber, 3); d.arrow(c, X, Y, X - Math.sin(a) * 250, Y - Math.cos(a) * 250, C.amber, 3);
        c.save(); c.translate(box.x, box.y); c.rotate(a); c.fillStyle = '#5B6B72'; d.rr(c, -18, -40, 36, 50, 5); c.fill(); c.restore();
        const i = Math.abs(a / deg); [[a, C.blue, 'i'], [-a, C.pink, 'r']].forEach(q => { c.strokeStyle = q[1]; c.lineWidth = 2.5; c.beginPath(); c.arc(X, Y, 60, -Math.PI / 2, -Math.PI / 2 + q[0], q[0] < 0); c.stroke(); d.txt(c, q[2], X + Math.sin(q[0] / 2) * 78, Y - Math.cos(q[0] / 2) * 78, { size: 15, bold: true, color: q[1] }); });
        d.txt(c, 'Plane mirror', 600, Y + 30, { size: 11, color: C.dim });
        rI(i.toFixed(0) + '°'); rR(i.toFixed(0) + '°'); rN(i < 1 ? 'A ray along the normal is reflected straight back along its own path.' : 'i = r. The incident ray, the reflected ray and the normal all lie in the same plane.');
      });
    }
  };

  /* ---------- refraction ---------- */
  S.refract = {
    title: 'Refraction of light and dispersion', subject: 'phy',
    aim: 'To investigate how light bends when it passes between air and a denser medium, and how a prism splits white light.',
    steps: ['Drag the ray box above the surface to send light from air into the medium.', 'Compare the angle of incidence with the angle of refraction, and check that sin i ÷ sin r stays constant.', 'Drag the ray box below the surface to send light from the medium into air. Increase the angle until total internal reflection happens.', 'Switch to the prism to see white light spread into a spectrum.'],
    init(ui) {
      const c = ui.ctx, X = 380, Y = 220, R = 185, MED = { 1.33: 'Water', 1.5: 'Glass', 2.42: 'Diamond' }; let n = 1.5, a = -40 * deg, below = false, mode = 'block';
      const rI = ui.read('Angle of incidence'), rR = ui.read('Angle of refraction'), rN = ui.read('Refractive index'), rT = ui.read('Note');
      ui.select('Experiment', [['block', 'Air and a denser medium'], ['prism', 'White light through a prism']], v => { mode = v; box.off = v === 'prism'; });
      ui.select('Medium', Object.keys(MED).map(k => [k, MED[k] + ' (n = ' + k + ')']), v => { n = +v; }).value = '1.5';
      const put = o => { o.x = X + Math.sin(a) * R; o.y = Y + (below ? 1 : -1) * Math.cos(a) * R; };
      const box = ui.thing({ x: 0, y: 0, w: 64, h: 64, onMove(o, x, y) { below = y > Y; a = clamp(Math.atan2(x - X, Math.abs(Y - y)), -88 * deg, 88 * deg); put(o); } }); put(box);
      ui.say('Drag the ray box. Take it below the surface to shine light out of the medium.');
      ui.loop(() => {
        d.bg(c, ui.W, ui.H);
        if (mode === 'prism') {
          c.fillStyle = 'rgba(200,236,240,.16)'; c.strokeStyle = C.glass; c.lineWidth = 2.2; c.beginPath(); c.moveTo(380, 90); c.lineTo(500, 320); c.lineTo(260, 320); c.closePath(); c.fill(); c.stroke();
          d.arrow(c, 60, 270, 200, 242, '#fff', 4); d.line(c, 200, 242, 326, 216, '#fff', 4); d.txt(c, 'white light', 110, 286, { size: 12 });
          const cols = [['Red', '#E5232B'], ['Orange', '#F47B2A'], ['Yellow', '#F8D32D'], ['Green', '#3FA34D'], ['Blue', '#2F7FC1'], ['Indigo', '#4A46A8'], ['Violet', '#8B3FC8']];
          cols.forEach((q, i) => { const ex = 432 + i * 1.4, ey = 198 + i * 4.5, sy = 230 + i * 26; d.line(c, 326, 216, ex, ey, q[1], 2); d.line(c, ex, ey, 690, sy, q[1], 3); d.txt(c, q[0], 724, sy, { size: 11, color: q[1], bold: true }); });
          c.fillStyle = 'rgba(244,250,249,.9)'; c.fillRect(690, 210, 6, 200); d.txt(c, 'screen', 693, 196, { size: 11, color: C.dim });
          rI('–'); rR('–'); rN('Different for each colour'); rT('Violet light is slowed and bent the most, red the least. The band of colours is a spectrum, and the splitting is called dispersion.'); return;
        }
        c.fillStyle = 'rgba(86,174,255,' + (.1 + n * .06) + ')'; c.fillRect(0, Y, ui.W, ui.H - Y); d.line(c, 0, Y, ui.W, Y, C.glass, 2); d.line(c, X, 20, X, 420, C.chalk, 1.2, [6, 5]);
        d.txt(c, 'Air', 60, Y - 20, { size: 13, bold: true }); d.txt(c, MED[n], 60, Y + 22, { size: 13, bold: true });
        const dir = below ? 1 : -1, i = Math.abs(a), s = below ? n * Math.sin(i) : Math.sin(i) / n, tir = s > 1, r = tir ? 0 : Math.asin(s), sg = Math.sign(a) || 1;
        d.arrow(c, box.x, box.y, X + Math.sin(a) * 80, Y + dir * Math.cos(a) * 80, C.amber, 3); d.line(c, X + Math.sin(a) * 80, Y + dir * Math.cos(a) * 80, X, Y, C.amber, 3);
        if (!tir) d.arrow(c, X, Y, X - sg * Math.sin(r) * 200, Y - dir * Math.cos(r) * 200, C.amber, 3);
        c.globalAlpha = tir ? 1 : .25; d.arrow(c, X, Y, X - Math.sin(a) * 200, Y + dir * Math.cos(a) * 200, C.amber, tir ? 3 : 2); c.globalAlpha = 1;
        c.save(); c.translate(box.x, box.y); c.rotate(below ? Math.PI - a : a); c.fillStyle = '#5B6B72'; d.rr(c, -16, -36, 32, 46, 5); c.fill(); c.restore();
        d.txt(c, 'i', X + Math.sin(a / 2) * 60, Y + dir * Math.cos(a / 2) * 60, { size: 15, bold: true, color: C.blue }); if (!tir) d.txt(c, 'r', X - sg * Math.sin(r / 2) * 60, Y - dir * Math.cos(r / 2) * 60, { size: 15, bold: true, color: C.pink });
        const crit = Math.asin(1 / n) / deg; rI((i / deg).toFixed(0) + '°'); rR(tir ? 'No refracted ray' : (r / deg).toFixed(1) + '°');
        rN(tir || i < .02 ? 'n = ' + n : 'sin ' + ((below ? r : i) / deg).toFixed(0) + '° ÷ sin ' + ((below ? i : r) / deg).toFixed(1) + '° = <b>' + n + '</b>');
        rT(tir ? '<b>Total internal reflection.</b> The angle of incidence is greater than the critical angle (' + crit.toFixed(1) + '°), so all the light is reflected back.' : below ? 'Light leaving a denser medium bends away from the normal. Critical angle for ' + MED[n].toLowerCase() + ': ' + crit.toFixed(1) + '°.' : 'Light entering a denser medium slows down and bends towards the normal.');
      });
    }
  };

  /* ---------- lenses and curved mirrors ---------- */
  S.lens = {
    title: 'Images formed by lenses and curved mirrors', subject: 'phy',
    aim: 'To locate the image formed by a lens or curved mirror and describe its nature for different object positions.',
    steps: ['Choose a lens or a curved mirror.', 'Drag the candle along the principal axis to change the object distance.', 'Follow the two rays from the top of the candle to where they meet (or appear to come from).', 'Describe the image at each position: beyond 2F, at 2F, between F and 2F, and inside F.'],
    init(ui) {
      const c = ui.ctx, X = 400, AY = 230, PX = 5, HO = 50; let f = 12, kind = 'cvl';
      const rU = ui.read('Object distance, u'), rV = ui.read('Image distance, v'), rM = ui.read('Magnification, v ÷ u'), rN = ui.read('The image is');
      ui.select('Optical element', [['cvl', 'Convex (converging) lens'], ['ccl', 'Concave (diverging) lens'], ['ccm', 'Concave mirror'], ['cvm', 'Convex mirror']], v => { kind = v; });
      ui.slider('Focal length', 6, 20, 1, f, 'cm', v => { f = v; });
      const cd = ui.thing({ x: X - 150, y: AY - 30, w: 50, h: 90, lockY: true, clamp: [30, 0, X - 30, 999] });
      ui.say('Drag the candle along the principal axis.');
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H); const lens = kind[2] === 'l', F = kind === 'cvl' || kind === 'ccm' ? f : -f, u = (X - cd.x) / PX, inf = Math.abs(u - F) < .15, v = inf ? 1e6 : u * F / (u - F), m = v / u;
        d.line(c, 10, AY, 750, AY, C.dim, 1.2); const ix = lens ? X + v * PX : X - v * PX, iy = AY + m * HO, top = [cd.x, AY - HO];
        // element
        c.strokeStyle = C.glass; c.lineWidth = 2.5; c.fillStyle = 'rgba(200,236,240,.18)';
        if (lens) { c.beginPath(); if (F > 0) { c.moveTo(X, AY - 130); c.quadraticCurveTo(X + 28, AY, X, AY + 130); c.quadraticCurveTo(X - 28, AY, X, AY - 130); } else { c.moveTo(X - 14, AY - 130); c.quadraticCurveTo(X - 2, AY, X - 14, AY + 130); c.lineTo(X + 14, AY + 130); c.quadraticCurveTo(X + 2, AY, X + 14, AY - 130); c.closePath(); } c.fill(); c.stroke(); }
        else { c.beginPath(); c.moveTo(X + (F > 0 ? -22 : 22), AY - 130); c.quadraticCurveTo(X + (F > 0 ? 22 : -22), AY, X + (F > 0 ? -22 : 22), AY + 130); c.stroke(); for (let y = -120; y <= 120; y += 16) { const bx = X + (F > 0 ? 1 : -1) * (22 - 44 * (y / 130) ** 2) * .5 + (F > 0 ? 0 : 0); d.line(c, bx + 2, AY + y, bx + 12, AY + y - 8, C.dim, 1); } }
        [[1, 'F'], [2, lens ? '2F' : 'C']].forEach(q => [-1, 1].forEach(sd => { if (!lens && sd * (F > 0 ? -1 : 1) < 0) return; const x = X + sd * q[0] * f * PX; if (x > 10 && x < 750) { d.dot(c, x, AY, 3, C.chalk); d.txt(c, q[1], x, AY + 16, { size: 11, color: C.dim }); } }));
        // candle
        c.fillStyle = '#EFE6C8'; c.fillRect(cd.x - 6, AY - HO + 8, 12, HO - 8); d.flame(c, cd.x, AY - HO + 8, 0, t, .16); d.txt(c, 'object', cd.x, AY + 32, { size: 11, color: C.dim });
        // rays
        if (!inf) {
          [[X, AY - HO], [X, AY]].forEach(p => {
            d.line(c, top[0], top[1], p[0], p[1], C.amber, 2); const real = v > 0; let dx = ix - p[0], dy = iy - p[1]; if (!real) { dx = -dx; dy = -dy; d.line(c, p[0], p[1], ix, iy, C.amber, 1.2, [5, 5]); }
            const k = 900 / (Math.hypot(dx, dy) || 1); d.line(c, p[0], p[1], p[0] + dx * k, p[1] + dy * k, C.amber, 2);
          });
          if (ix > 0 && ix < 760 && Math.abs(iy - AY) < 400) { c.save(); if (v < 0) c.setLineDash([5, 4]); d.arrow(c, ix, AY, ix, iy, C.pink, 3); c.restore(); d.txt(c, 'image', ix, AY + (m > 0 ? -14 : 16), { size: 11, color: C.pink }); }
        }
        rU(u.toFixed(1) + ' cm'); rV(inf ? 'At infinity' : Math.abs(v).toFixed(1) + ' cm' + (v < 0 ? ' (virtual side)' : '')); rM(inf ? '–' : Math.abs(m).toFixed(2));
        rN(inf ? 'Formed at infinity: the rays leave parallel. The object is at F.' : (v > 0 ? 'Real, inverted' : 'Virtual, upright') + ', ' + (Math.abs(m) > 1.05 ? 'magnified' : Math.abs(m) < .95 ? 'diminished' : 'the same size as the object'));
      });
    }
  };
})();

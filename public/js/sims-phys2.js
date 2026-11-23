/* Herieth-Lab physics practicals for Form Three and Form Four */
(function () {
  const S = HL.sims, d = HL.d, C = HL.C, clamp = HL.clamp, BY = 380, deg = Math.PI / 180;

  /* ---------- boat crossing a river (vectors) ---------- */
  S.vectors = {
    title: 'Adding velocities: a boat crossing a river', subject: 'phy',
    aim: 'To find the resultant of two velocities and use it to predict where a boat lands on the far bank.',
    steps: ['Drag the white arrow tip in the vector diagram to set the boat’s speed and heading through the water.', 'Set the speed of the river current.', 'Press “Launch the boat” and watch where it lands.', 'Try heading straight across, then find the heading that lands the boat directly opposite its start.'],
    init(ui) {
      const c = ui.ctx, TOP = 70, BOT = 330, W = 100, PX = (BOT - TOP) / W, OX = 620, OY = 330, SC = 22;
      let bx = 0, by = 4, vc = 2, run = false, t = 0, trail = [];
      const rB = ui.read('Boat through the water'), rR = ui.read('Resultant velocity'), rT = ui.read('Time to cross (river 100 m wide)'), rD = ui.read('Lands downstream by');
      ui.slider('River current', 0, 5, .5, vc, 'm/s', v => { vc = v; reset(); });
      ui.button('Launch the boat', () => { reset(); run = true; ui.say('The boat is crossing…'); }, 'btn-main');
      const reset = () => { run = false; t = 0; trail = []; };
      const tip = ui.thing({ x: OX + bx * SC, y: OY - by * SC, w: 30, h: 30, onMove(o) { bx = clamp((o.x - OX) / SC, -6, 6); by = clamp((OY - o.y) / SC, .5, 8); const sp = Math.hypot(bx, by); if (sp > 8) { bx *= 8 / sp; by *= 8 / sp; } o.x = OX + bx * SC; o.y = OY - by * SC; reset(); } });
      ui.say('Drag the white arrow tip to steer the boat, then launch it.');
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H);
        c.fillStyle = '#3B6B3F'; c.fillRect(0, 0, 520, TOP); c.fillRect(0, BOT, 520, ui.H - BOT);
        c.fillStyle = 'rgba(86,174,255,.35)'; c.fillRect(0, TOP, 520, BOT - TOP);
        for (let i = 0; i < 18; i++) { const x = ((i * 63 + performance.now() / 1000 * vc * 18) % 560) - 20, y = TOP + 18 + (i * 37) % (BOT - TOP - 30); d.arrow(c, x, y, x + 14, y, 'rgba(234,244,242,.35)', 1.5); }
        const SX = 120, ux = bx + vc, T = W / by;
        if (run) { t += dt * 6; if (t >= T) { t = T; run = false; ui.say('Landed ' + (ux * T).toFixed(0) + ' m ' + (ux >= 0 ? 'downstream' : 'upstream') + ' of the point opposite the start.'); } }
        const px = SX + ux * t * PX, py = BOT - by * t * PX; if (run || t) trail.push([px, py]);
        c.strokeStyle = C.amber; c.lineWidth = 2; c.setLineDash([5, 5]); c.beginPath(); trail.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); c.setLineDash([]);
        d.line(c, SX, BOT, SX, TOP, 'rgba(234,244,242,.4)', 1, [3, 4]); d.txt(c, 'start', SX, BOT + 14, { size: 11 }); d.txt(c, 'directly opposite', SX, TOP - 12, { size: 11 });
        const a = Math.atan2(-by, bx); c.save(); c.translate(px, py); c.rotate(a + Math.PI / 2); c.fillStyle = '#F4F1E6'; c.beginPath(); c.moveTo(0, -14); c.quadraticCurveTo(8, -4, 7, 12); c.lineTo(-7, 12); c.quadraticCurveTo(-8, -4, 0, -14); c.fill(); c.restore();
        // vector diagram
        c.fillStyle = 'rgba(8,30,35,.6)'; d.rr(c, 530, 40, 220, 340, 12); c.fill(); d.txt(c, 'Vector diagram', 640, 58, { size: 12, color: C.dim });
        d.arrow(c, OX, OY, OX + bx * SC, OY - by * SC, C.chalk, 3); d.arrow(c, OX + bx * SC, OY - by * SC, OX + ux * SC, OY - by * SC, C.blue, 3); d.arrow(c, OX, OY, OX + ux * SC, OY - by * SC, C.amber, 3);
        d.dot(c, tip.x, tip.y, 9, C.chalk); d.txt(c, 'boat', OX + bx * SC / 2 - 22, OY - by * SC / 2, { size: 11 }); d.txt(c, 'current', OX + (bx + ux) * SC / 2, OY - by * SC - 12, { size: 11, color: C.blue }); d.txt(c, 'resultant', OX + ux * SC / 2 + 30, OY - by * SC / 2 + 10, { size: 11, color: C.amber });
        const hb = Math.atan2(bx, by) / deg, rs = Math.hypot(ux, by), hr = Math.atan2(ux, by) / deg;
        rB(Math.hypot(bx, by).toFixed(1) + ' m/s, ' + Math.abs(hb).toFixed(0) + '° ' + (Math.abs(hb) < .5 ? '(straight across)' : hb > 0 ? 'downstream' : 'upstream'));
        rR('√(' + ux.toFixed(1) + '² + ' + by.toFixed(1) + '²) = <b>' + rs.toFixed(1) + ' m/s</b>, ' + Math.abs(hr).toFixed(0) + '° ' + (Math.abs(hr) < .5 ? 'straight across' : hr > 0 ? 'downstream' : 'upstream'));
        rT('100 ÷ ' + by.toFixed(1) + ' = ' + T.toFixed(1) + ' s'); rD(Math.abs(ux * T) < .5 ? '0 m: it lands directly opposite' : (ux * T).toFixed(0) + ' m' + (ux < 0 ? ' (upstream)' : ''));
      });
    }
  };

  /* ---------- friction ---------- */
  S.friction = {
    title: 'Static and sliding friction', subject: 'phy',
    aim: 'To measure limiting friction and sliding friction and find the coefficient of friction.',
    steps: ['Drag the hand on the spring balance slowly to the right to pull the block.', 'Watch the balance reading rise until the block just starts to move: that is limiting friction.', 'Keep pulling steadily: the reading drops a little to the sliding friction.', 'Change the mass or the surface and compare. The graph keeps every pull.'],
    init(ui) {
      const c = ui.ctx, K = .08, SURF = { wood: ['Wood on wood', .5, .35, C.wood], rub: ['Rubber on concrete', .9, .7, '#8E8A80'], ice: ['Steel on ice', .1, .05, '#CFEAF2'], oil: ['Oiled metal', .15, .1, '#7B878C'] };
      let sk = 'wood', m = 2, bx = 150, moving = false, pts = [], all = [];
      const rF = ui.read('Balance reading (pull)'), rR = ui.read('Normal reaction, R = mg'), rS = ui.read('State'), rM = ui.read('Coefficient of friction');
      const reset = () => { bx = 150; moving = false; if (pts.length) all.push(pts); pts = []; hand.x = bx + 50; ui.say('Drag the hand slowly to the right.'); };
      ui.select('Surfaces', Object.keys(SURF).map(k => [k, SURF[k][0]]), v => { sk = v; reset(); });
      ui.slider('Mass of block', 1, 5, .5, m, 'kg', v => { m = v; reset(); });
      ui.button('Put the block back', reset); ui.button('Clear the graph', () => { all = []; pts = []; });
      const hand = ui.thing({ x: 200, y: 288, w: 50, h: 60, lockY: true, clamp: [150, 0, 740, 999] });
      ui.say('Drag the hand slowly to the right.');
      let maxF = 0;
      ui.loop(() => {
        d.bg(c, ui.W, ui.H, 320); const s = SURF[sk], R = m * 10, lim = s[1] * R, kin = s[2] * R;
        let stretch = hand.x - (bx + 50), F = Math.max(0, stretch * K);
        if (!moving && F > lim) moving = true;
        if (moving) { const need = kin / K; if (stretch < need - 2) moving = false; else { bx = Math.min(hand.x - 50 - need, 600); stretch = hand.x - (bx + 50); F = stretch * K; } }
        if (hand.held) { pts.push([F, moving ? kin : Math.min(F, lim)]); maxF = Math.max(maxF, F); }
        c.fillStyle = s[3]; c.fillRect(0, 320, ui.W, 14);
        c.fillStyle = '#C9A24B'; d.rr(c, bx - 50, 320 - 40 - m * 6, 100, 40 + m * 6, 6); c.fill(); d.txt(c, m + ' kg', bx, 300 - m * 3, { size: 14, bold: true, color: '#0B2A30' });
        // spring balance from block to hand
        const L = hand.x - bx - 50, y = 288; c.fillStyle = 'rgba(244,250,249,.95)'; d.rr(c, bx + 50 + 6, y - 9, Math.max(40, L - 16), 18, 5); c.fill();
        c.strokeStyle = '#10383F'; c.lineWidth = 1.5; c.beginPath(); for (let i = 0; i <= 16; i++) c.lineTo(bx + 60 + (L - 30) * i / 16, y + (i % 2 ? 5 : -5)); c.stroke();
        d.txt(c, F.toFixed(1) + ' N', bx + 50 + L / 2, y - 22, { size: 14, bold: true });
        d.hand(c, hand.x, y + 30);
        if (F > 0) { d.arrow(c, bx, 352, bx - Math.min(80, (moving ? kin : Math.min(F, lim)) * 3), 352, C.pink, 3); d.txt(c, 'friction', bx - 40, 368, { size: 11, color: C.pink }); }
        d.graph(c, 470, 60, 250, 160, { xmax: 60, ymax: 50, xl: 'Pull (N)', yl: 'Friction (N)', pts: [], color: C.amber });
        [...all, pts].forEach((p, i, arr) => { c.strokeStyle = i === arr.length - 1 ? C.amber : 'rgba(245,165,36,.35)'; c.lineWidth = 2; c.beginPath(); p.forEach((q, j) => { const X = 470 + clamp(q[0] / 60, 0, 1) * 250, Y = 220 - clamp(q[1] / 50, 0, 1) * 160; j ? c.lineTo(X, Y) : c.moveTo(X, Y); }); c.stroke(); });
        rF(F.toFixed(1) + ' N'); rR(m + ' × 10 = ' + R + ' N'); rS(moving ? 'Sliding: friction = ' + kin.toFixed(1) + ' N' : F > 0 ? 'At rest: friction balances the pull (' + F.toFixed(1) + ' N)' : 'At rest');
        rM(maxF >= lim - .2 || moving ? 'μ<sub>s</sub> = ' + lim.toFixed(1) + ' ÷ ' + R + ' = <b>' + s[1] + '</b>; μ<sub>k</sub> = ' + kin.toFixed(1) + ' ÷ ' + R + ' = <b>' + s[2] + '</b>' : 'Pull until the block moves');
        if (bx >= 600) ui.say('The block reached the end of the bench. Press “Put the block back” to pull again.');
      });
    }
  };

  /* ---------- thermal expansion ---------- */
  S.expansion = {
    title: 'Thermal expansion: rods and the bimetallic strip', subject: 'phy',
    aim: 'To measure the linear expansion of metal rods and see how a bimetallic strip works as a fire alarm.',
    steps: ['Choose an experiment.', 'Rod: pick a metal, then drag the temperature slider up and read the expansion on the dial gauge.', 'Strip: heat the brass–iron strip and watch it bend. Find the temperature at which it touches the contact and rings the bell.', 'Use ΔL = α L₀ Δθ to check the rod readings.'],
    init(ui) {
      const c = ui.ctx, MT = { steel: ['Steel', 12], brass: ['Brass', 19], alu: ['Aluminium', 23], cu: ['Copper', 17], invar: ['Invar', 1.2] };
      let mode = 'rod', mk = 'alu', T = 20, contact = 60, rang = false;
      const rT = ui.read('Temperature'), rA = ui.read('Reading'), rW = ui.read('Working');
      ui.select('Experiment', [['rod', 'Expansion of a 1 m rod'], ['strip', 'Bimetallic strip fire alarm']], v => { mode = v; });
      ui.select('Rod material', Object.keys(MT).map(k => [k, MT[k][0]]), v => { mk = v; }).value = 'alu';
      ui.slider('Temperature', 20, 300, 5, T, '°C', v => { T = v; });
      ui.slider('Gap to the alarm contact', 30, 120, 5, contact, 'mm', v => { contact = v; rang = false; });
      ui.say('Raise the temperature with the slider.');
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY); const dT = T - 20, on = T > 25;
        if (mode === 'rod') {
          const a = MT[mk][1] * 1e-6, dL = a * 1 * dT * 1000; // mm
          c.fillStyle = '#5B6B72'; c.fillRect(70, 200, 30, 120); c.fillStyle = C.steel; c.fillRect(100, 236, 480 + dL * 4, 18);
          [180, 320, 460].forEach(x => { d.burner(c, x, BY, .9); if (on) d.flame(c, x, 276, 1, t + x, .32 + .2 * dT / 280); });
          d.meter(c, 650, 190, 70, dL / 8, 'mm', dL.toFixed(2) + ' mm'); d.line(c, 580 + dL * 4, 245, 600, 245, C.chalk, 3);
          d.txt(c, 'Rod fixed here', 85, 186, { size: 11, color: C.dim }); d.txt(c, 'Dial gauge', 650, 280, { size: 11, color: C.dim });
          rT(T + ' °C (Δθ = ' + dT + ' K)'); rA('Expansion ΔL = <b>' + dL.toFixed(2) + ' mm</b>');
          rW('α for ' + MT[mk][0].toLowerCase() + ' = ' + MT[mk][1] + ' × 10⁻⁶ K⁻¹<br>ΔL = ' + MT[mk][1] + ' × 10⁻⁶ × 1 m × ' + dT + ' = ' + (dL / 1000).toExponential(2) + ' m');
        } else {
          const bend = (19 - 12) * 1e-6 * dT * 60000, X0 = 180, Y0 = 170, L = 360;
          c.fillStyle = '#5B6B72'; c.fillRect(X0 - 40, Y0 - 30, 40, 60);
          const tipY = Y0 + 0; const pt = s => { const k = bend / L / L * 2; return [X0 + s, Y0 - k * s * s / 2]; };
          [[-5, C.amber, 'brass'], [5, C.steel, 'iron']].forEach(q => { c.strokeStyle = q[1]; c.lineWidth = 10; c.beginPath(); for (let s = 0; s <= L; s += 6) { const p = pt(s); c.lineTo(p[0], p[1] + q[0]); } c.stroke(); });
          const tip = pt(L), cy = Y0 - contact, touch = tip[1] - 9 <= cy;
          d.line(c, tip[0] - 4, cy - 40, tip[0] - 4, cy, C.steel, 5); d.dot(c, tip[0] - 4, cy, 6, C.steel); d.txt(c, 'contact', tip[0] + 30, cy - 20, { size: 11, color: C.dim });
          d.txt(c, 'brass', X0 + 60, Y0 - 22, { size: 11, color: C.amber }); d.txt(c, 'iron', X0 + 60, Y0 + 22, { size: 11, color: C.steel });
          [300, 420].forEach(x => { d.burner(c, x, BY, .9); if (on) d.flame(c, x, 276, 1, t + x, .3 + .2 * dT / 280); });
          // bell circuit
          c.fillStyle = touch ? C.amber : '#5B6B72'; c.beginPath(); c.arc(680, 120, 30, Math.PI, 0); c.fill(); c.fillRect(650, 118, 60, 8); d.txt(c, touch ? 'RING!' : 'bell', 680, 160, { size: 14, bold: true, color: touch ? C.amber : C.dim });
          if (touch) for (let i = 0; i < 3; i++) { c.strokeStyle = 'rgba(245,165,36,' + (.6 - i * .2) + ')'; c.lineWidth = 2; c.beginPath(); c.arc(680, 110, 40 + i * 12 + (t * 30) % 12, -2.6, -.5); c.stroke(); }
          d.line(c, tip[0] - 4, cy - 40, 650, 120, C.dim, 1.5, [4, 4]); d.line(c, X0 - 20, Y0 - 30, X0 - 20, 60, C.dim, 1.5, [4, 4]); d.line(c, X0 - 20, 60, 710, 60, C.dim, 1.5, [4, 4]); d.line(c, 710, 60, 710, 120, C.dim, 1.5, [4, 4]);
          rT(T + ' °C'); rA(touch ? 'The strip touches the contact and completes the circuit: the alarm rings.' : 'The strip bends upwards as it warms.');
          rW('Brass (α = 19 × 10⁻⁶ K⁻¹) expands more than iron (12 × 10⁻⁶ K⁻¹), so the strip bends with the brass on the outside of the curve.');
          if (!touch) rang = false; if (touch && !rang) { rang = true; ui.say('The bell rings at ' + T + ' °C. Move the contact closer to make the alarm more sensitive.'); }
        }
      });
    }
  };

  /* ---------- heat transfer ---------- */
  S.heatflow = {
    title: 'Conduction, convection and radiation', subject: 'phy',
    aim: 'To compare how well different materials conduct heat, to see a convection current, and to compare surfaces as emitters of radiation.',
    steps: ['Choose an experiment.', 'Conduction: click the burner. Wax melts along each rod and the pins drop off. Which rod conducts best?', 'Convection: drag the crystal of potassium permanganate into the water, then click the burner under one side.', 'Radiation: fill the cube with hot water and compare the thermometers facing the dull black and shiny faces.'],
    init(ui) {
      const c = ui.ctx; let mode = 'cond', on = false, t = 0, crystal = false;
      const RODS = [['Copper', 400, '#C7773E'], ['Aluminium', 235, '#C9D2D6'], ['Iron', 80, '#7B878C'], ['Glass', 1, 'rgba(200,236,240,.8)']];
      const rR = ui.read('Result'), rE = ui.read('Explanation');
      ui.select('Experiment', [['cond', 'Conduction along rods'], ['conv', 'Convection in water'], ['rad', 'Radiation from a Leslie cube']], v => { mode = v; on = false; t = 0; crystal = false; cr.home(); cr.off = v !== 'conv'; });
      ui.button('Start again', () => { on = false; t = 0; crystal = false; cr.home(); });
      const bn = ui.thing({ x: 110, y: 330, w: 80, h: 110, drag: false, onClick() { if (mode === 'rad') return; on = !on; ui.say(on ? 'Heating.' : 'Burner off.'); } });
      const cube = ui.thing({ x: 380, y: 230, w: 160, h: 160, drag: false, onClick() { if (mode === 'rad') { on = true; ui.say('Hot water poured into the cube. Watch the two thermometers.'); } } });
      const cr = ui.thing({ x: 640, y: 330, w: 40, h: 40, onDrop(o) { if (o.x > 220 && o.x < 540 && o.y > 150) { crystal = true; o.off = true; ui.say('The crystal sits at the bottom. Now click the burner.'); } else o.home(); } }); cr.off = true;
      ui.say('Click the burner to heat the end of the rods.');
      ui.loop((dt, tt) => {
        d.bg(c, ui.W, ui.H, BY); if (on) t += dt; bn.x = mode === 'conv' ? 300 : 110; bn.off = mode === 'rad'; cube.off = mode !== 'rad';
        if (mode === 'cond') {
          d.burner(c, 110, BY, .9); if (on) d.flame(c, 110, 276, 1, tt, .55);
          c.fillStyle = '#5B6B72'; d.rr(c, 70, 150, 80, 130, 6); c.fill();
          RODS.forEach((r, i) => { const y = 170 + i * 30, f = 1 - Math.exp(-t * r[1] / 2400); c.fillStyle = r[2]; c.fillRect(150, y - 5, 500, 10); c.fillStyle = 'rgba(255,240,200,.9)'; c.fillRect(150 + 500 * f, y - 7, 500 * (1 - f), 3);
            for (let p = 1; p <= 6; p++) { const px = 150 + p * 76, dropped = 500 * f > p * 76; d.line(c, px, dropped ? 360 : y + 5, px, dropped ? 376 : y + 22, C.steel, 2); }
            d.txt(c, r[0], 700, y, { size: 12, align: 'left' }); });
          const order = RODS.map(r => [r[0], 1 - Math.exp(-t * r[1] / 2400)]).sort((a, b) => b[1] - a[1]);
          rR(t < .5 ? '–' : 'Wax melted furthest along ' + order[0][0].toLowerCase() + ', then ' + order.slice(1).map(x => x[0].toLowerCase()).join(', ') + '.');
          rE('Metals conduct well because free electrons carry energy quickly. Glass has no free electrons, so it is an insulator.');
        } else if (mode === 'conv') {
          d.burner(c, 300, BY, .9); if (on) d.flame(c, 300, 276, 1, tt, .55); d.tripod(c, 380, BY, 220, 150);
          d.beaker(c, 380, 228, 300, 180, .85, C.water);
          if (crystal) { d.dot(c, 300, 218, 6, '#5B1A6E'); const len = on ? Math.min(1, t / 10) : 0, path = s => { const q = s * 640; if (q < 120) return [300, 218 - q]; if (q < 320) return [300 + (q - 120), 98]; if (q < 440) return [500, 98 + (q - 320)]; return [500 - (q - 440), 218]; };
            c.strokeStyle = 'rgba(150,40,170,.55)'; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); for (let s = 0; s <= len; s += .01) { const p = path(s); s ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); } c.stroke(); c.lineCap = 'butt';
            if (len > .2) for (let k = 0; k < 6; k++) { const s = ((tt * .08 + k / 6) % 1) * len, p = path(s); d.dot(c, p[0], p[1], 3, 'rgba(255,200,255,.9)'); } }
          if (!crystal) d.txt(c, 'Potassium permanganate crystal (drag)', 640, 370, { size: 10, color: C.dim });
          rR(!crystal ? 'Drop the crystal into the water first.' : !on ? 'Purple colour stays near the crystal.' : 'Purple streams rise above the flame, cross the top, sink on the far side and return: a convection current.');
          rE('Heated water expands, becomes less dense and rises. Cooler, denser water sinks to take its place.');
        } else {
          const temp = on ? 20 + 60 * (1 - Math.exp(-t / 8)) : 20, black = on ? 20 + 18 * (1 - Math.exp(-t / 10)) : 20, shiny = on ? 20 + 4 * (1 - Math.exp(-t / 10)) : 20;
          c.fillStyle = '#1C1C1C'; c.beginPath(); c.moveTo(300, 160); c.lineTo(380, 160); c.lineTo(380, 300); c.lineTo(300, 300); c.fill();
          const g = c.createLinearGradient(380, 0, 460, 0); g.addColorStop(0, '#F4F7F8'); g.addColorStop(.5, '#9AAAB0'); g.addColorStop(1, '#E8EEF0'); c.fillStyle = g; c.fillRect(380, 160, 80, 140);
          d.txt(c, 'dull black', 340, 316, { size: 11 }); d.txt(c, 'shiny', 420, 316, { size: 11 }); d.txt(c, on ? 'hot water ' + temp.toFixed(0) + ' °C' : 'Click the cube to fill it', 380, 140, { size: 12, color: on ? C.amber : C.dim });
          [[200, black, 'facing black'], [560, shiny, 'facing shiny']].forEach(q => { d.line(c, q[0], 120, q[0], 300, C.glass, 7); d.line(c, q[0], 300, q[0], 300 - 150 * (q[1] - 15) / 30, C.red, 3); d.dot(c, q[0], 302, 7, C.red); d.txt(c, q[1].toFixed(1) + ' °C', q[0], 104, { size: 13, bold: true }); d.txt(c, q[2], q[0], 330, { size: 11, color: C.dim }); });
          if (on) for (let i = 0; i < 5; i++) { const ph = (tt * 60 + i * 20) % 100; d.arrow(c, 296 - ph, 180 + i * 24, 286 - ph, 180 + i * 24, 'rgba(255,140,60,.7)', 2); }
          rR(!on ? '–' : 'The thermometer facing the dull black face warms much more.');
          rE('Dull black surfaces are good emitters (and absorbers) of radiation; shiny surfaces are poor emitters.');
        }
      });
    }
  };

  /* ---------- specific heat capacity ---------- */
  S.specificheat = {
    title: 'Specific heat capacity by the electrical method', subject: 'phy',
    aim: 'To find the specific heat capacity of a solid or of water using an electric heater of known power.',
    steps: ['Choose the block and note its mass.', 'Click the switch to turn the 50 W heater on. The stopwatch starts.', 'After a temperature rise of 10–20 °C, click the switch again to turn the heater off.', 'Use c = P t ÷ (m Δθ), then press “Show the working” to check.'],
    init(ui) {
      const c = ui.ctx, P = 50, MT = { al: ['Aluminium block', 1, 900, C.steel], cu: ['Copper block', 1, 390, '#C7773E'], fe: ['Iron block', 1, 450, '#7B878C'], w: ['Water in a beaker', .5, 4200, C.water] };
      let k = 'al', on = false, t = 0, T = 25, pts = [], show = false;
      const rT = ui.read('Temperature'), rS = ui.read('Time heated'), rE = ui.read('Energy supplied, P t'), rC = ui.read('Working');
      const reset = () => { on = false; t = 0; T = 25; pts = [[0, 25]]; show = false; };
      ui.select('What to heat', Object.keys(MT).map(x => [x, MT[x][0]]), v => { k = v; reset(); });
      ui.button('Show the working', () => { show = true; }, 'btn-main'); ui.button('Start again', reset);
      ui.thing({ x: 140, y: 140, w: 80, h: 50, drag: false, onClick() { on = !on; ui.say(on ? 'Heater on. Watch the temperature.' : 'Heater off after ' + t.toFixed(0) + ' s.'); } });
      reset(); ui.say('Click the switch to turn the heater on.');
      ui.loop((dt, tt) => {
        d.bg(c, ui.W, ui.H, BY); const m = MT[k];
        if (on) { const h = dt * 10; t += h; T += P * h / (m[1] * m[2]) * .97; pts.push([t, T]); } // 10× time; small heat loss
        if (k === 'w') d.beaker(c, 330, BY, 150, 170, .7, C.water); else { c.fillStyle = m[3]; d.rr(c, 260, 220, 140, 160, 8); c.fill(); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(260, 220, 140, 10); }
        c.fillStyle = 'rgba(234,244,242,.15)'; d.rr(c, 250, 210, 160, 175, 10); c.fill();
        d.line(c, 300, 150, 300, 330, on ? '#FF7A3D' : C.steel, 9); d.line(c, 360, 120, 360, 330, C.glass, 7); d.line(c, 360, 330, 360, 330 - 150 * clamp((T - 20) / 60, 0, 1), C.red, 3); d.dot(c, 360, 332, 6, C.red);
        d.txt(c, T.toFixed(1) + ' °C', 400, 120, { size: 14, bold: true, align: 'left' }); d.txt(c, '50 W heater', 300, 200, { size: 11, color: '#0B2A30', bold: true });
        d.line(c, 300, 150, 300, 140, C.dim, 2); d.line(c, 300, 140, 180, 140, C.dim, 2);
        c.fillStyle = on ? C.green : C.red; d.rr(c, 110, 125, 60, 30, 6); c.fill(); d.txt(c, on ? 'ON' : 'OFF', 140, 140, { size: 12, bold: true, color: '#0B2A30' }); d.txt(c, 'Switch (click)', 140, 172, { size: 11, color: C.dim });
        c.fillStyle = 'rgba(244,250,249,.95)'; d.rr(c, 90, 300, 120, 44, 10); c.fill(); d.txt(c, t.toFixed(0) + ' s', 150, 322, { size: 18, bold: true, color: '#0B2A30' }); d.txt(c, 'Time runs 10× faster', 150, 360, { size: 10, color: C.dim });
        d.graph(c, 500, 70, 220, 190, { xmax: 600, ymax: 80, xl: 'Time (s)', yl: 'Temperature (°C)', pts, color: C.amber });
        const dT = T - 25; rT(T.toFixed(1) + ' °C (rise ' + dT.toFixed(1) + ' K)'); rS(t.toFixed(0) + ' s'); rE(P + ' × ' + t.toFixed(0) + ' = ' + (P * t).toFixed(0) + ' J');
        rC(!show ? 'Work it out, then check.' : dT < 1 ? 'Heat the block first.' : 'c = ' + (P * t).toFixed(0) + ' ÷ (' + m[1] + ' × ' + dT.toFixed(1) + ') = <b>' + (P * t / (m[1] * dT)).toFixed(0) + ' J/(kg K)</b>. The accepted value is ' + m[2] + '; yours is a little higher because some heat escaped.');
      });
    }
  };

  /* ---------- dew point ---------- */
  S.humidity = {
    title: 'Finding the dew point and relative humidity', subject: 'phy',
    aim: 'To find the dew point of the air by cooling a shiny can, and use it to work out the relative humidity.',
    steps: ['Read the temperature of the room air.', 'Drag ice cubes into the shiny can one at a time and stir. The water cools.', 'Watch the outside of the can. Note the temperature at which dew first appears: the dew point.', 'Relative humidity = s.v.p. at the dew point ÷ s.v.p. at the air temperature × 100%. Use the table, then press “Show the working”.'],
    init(ui) {
      const c = ui.ctx, svp = T => .6112 * Math.exp(17.62 * T / (243.12 + T)); // kPa
      const DAY = { dry: ['A dry afternoon', 30, 35], wet: ['A rainy-season morning', 24, 85], coast: ['Humid coast (Dar es Salaam)', 31, 70] };
      let k = 'dry', Tw, dew = null, show = false, ice = 0, Ta, RH, Td;
      const rA = ui.read('Air temperature'), rC = ui.read('Water in the can'), rD = ui.read('Dew point'), rH = ui.read('Relative humidity');
      const set = () => { [, Ta, RH] = DAY[k]; Tw = Ta; dew = null; show = false; ice = 0; const e = svp(Ta) * RH / 100, l = Math.log(e / .6112); Td = 243.12 * l / (17.62 - l); ui.say('Drag ice into the can to cool it.'); };
      ui.select('Weather today', Object.keys(DAY).map(x => [x, DAY[x][0]]), v => { k = v; set(); });
      ui.button('Show the working', () => { show = true; }, 'btn-main'); ui.button('Empty the can and start again', set);
      const ic = ui.thing({ x: 640, y: 330, w: 50, h: 44, onDrop(o) { if (Math.abs(o.x - 300) < 80 && o.y < 330) { Tw -= 1.6 + Math.random() * .6; ice++; } o.home(); } });
      set();
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY); Tw += (Ta - Tw) * dt * .004;
        const fog = Tw <= Td; if (fog && dew == null) { dew = Tw; ui.say('Dew has appeared on the can at about ' + Tw.toFixed(0) + ' °C.'); }
        const g = c.createLinearGradient(240, 0, 360, 0); g.addColorStop(0, '#9AAAB0'); g.addColorStop(.45, '#F4F7F8'); g.addColorStop(1, '#8E9CA2'); c.fillStyle = g; d.rr(c, 240, 180, 120, 200, 8); c.fill();
        if (fog) { for (let i = 0; i < 70; i++) d.dot(c, 246 + (i * 37) % 108, 190 + (i * 53) % 180, 2 + (i % 3) * .6, 'rgba(255,255,255,.75)'); }
        for (let i = 0; i < Math.min(ice, 6); i++) { c.fillStyle = 'rgba(225,245,255,.85)'; d.rr(c, 255 + (i % 3) * 32, 194 + Math.floor(i / 3) * 22, 26, 18, 4); c.fill(); }
        d.line(c, 330, 100, 330, 340, C.glass, 7); d.line(c, 330, 340, 330, 340 - 180 * clamp(Tw / 40, 0, 1), C.red, 3); d.dot(c, 330, 342, 6, C.red); d.txt(c, Tw.toFixed(1) + ' °C', 370, 100, { size: 14, bold: true, align: 'left' });
        c.fillStyle = 'rgba(225,245,255,.9)'; d.rr(c, ic.x - 22, ic.y - 18, 44, 36, 6); c.fill(); if (ic.x === ic.hx) d.txt(c, 'Ice (drag)', 640, 364, { size: 11, color: C.dim });
        d.txt(c, 'Room thermometer: ' + Ta + ' °C', 110, 60, { size: 13, bold: true });
        // s.v.p. table
        c.fillStyle = 'rgba(8,30,35,.6)'; d.rr(c, 480, 40, 250, 230, 10); c.fill(); d.txt(c, 's.v.p. of water (kPa)', 605, 58, { size: 12, color: C.dim });
        for (let i = 0; i < 8; i++) { const T = 10 + i * 3; d.txt(c, T + ' °C', 540, 84 + i * 23, { size: 12 }); d.txt(c, svp(T).toFixed(2), 660, 84 + i * 23, { size: 12, bold: true }); }
        rA(Ta + ' °C'); rC(Tw.toFixed(1) + ' °C'); rD(dew == null ? 'No dew yet' : 'About ' + dew.toFixed(0) + ' °C');
        rH(!show ? 'Work it out, then check.' : dew == null ? 'Find the dew point first.' : svp(dew).toFixed(2) + ' ÷ ' + svp(Ta).toFixed(2) + ' × 100% ≈ <b>' + (svp(dew) / svp(Ta) * 100).toFixed(0) + '%</b>');
      });
    }
  };

  /* ---------- metre bridge ---------- */
  S.bridge = {
    title: 'Finding resistance with a metre bridge', subject: 'phy',
    aim: 'To find an unknown resistance by balancing a metre bridge.',
    steps: ['Choose the known resistance R and an unknown resistor X.', 'Drag the jockey along the wire. Watch the galvanometer needle.', 'Find the point where the needle reads zero: the balance point. Read its length l from the left end.', 'Work out X = R × (100 − l) ÷ l, then press “Show the working”.'],
    init(ui) {
      const c = ui.ctx, L = 120, Rr = 620, Y = 300, PX = (Rr - L) / 100, XS = { A: 3.3, B: 7.5, C: 12, D: 22 };
      let R = 5, xk = 'A', show = false;
      const rL = ui.read('Jockey position, l'), rG = ui.read('Galvanometer'), rX = ui.read('Working');
      ui.select('Known resistor R', [['2', '2 Ω'], ['5', '5 Ω'], ['10', '10 Ω']], v => { R = +v; show = false; }).value = '5';
      ui.select('Unknown resistor', Object.keys(XS).map(k => [k, 'Resistor ' + k]), v => { xk = v; show = false; });
      ui.button('Show the working', () => { show = true; }, 'btn-main');
      const j = ui.thing({ x: L + 30 * PX, y: Y - 40, w: 36, h: 70, lockY: true, clamp: [L, 0, Rr, 999] });
      ui.say('Drag the jockey along the wire until the galvanometer reads zero.');
      ui.loop(() => {
        d.bg(c, ui.W, ui.H); const X = XS[xk], l = (j.x - L) / PX, dev = clamp((l / (100 - l + 1e-9) - R / X) * 1.2, -1, 1) * (l > 0 && l < 100 ? 1 : 0);
        c.fillStyle = C.wood; d.rr(c, L - 40, Y - 6, Rr - L + 80, 50, 6); c.fill();
        for (let i = 0; i <= 100; i += 5) { d.line(c, L + i * PX, Y + 10, L + i * PX, Y + (i % 10 ? 18 : 24), '#3B2A16', 1); if (i % 10 === 0) d.txt(c, String(i), L + i * PX, Y + 34, { size: 10, color: '#3B2A16' }); }
        d.line(c, L, Y, Rr, Y, '#E0C070', 2); d.line(c, L - 20, Y, L, Y, C.steel, 6); d.line(c, Rr, Y, Rr + 20, Y, C.steel, 6); d.line(c, L - 20, Y, L - 20, 150, C.steel, 6); d.line(c, Rr + 20, Y, Rr + 20, 150, C.steel, 6); d.line(c, L - 20, 150, Rr + 20, 150, C.steel, 6);
        [[L + 100, 'R = ' + R + ' Ω'], [Rr - 100, 'X = ?']].forEach(q => { c.fillStyle = C.bg; c.fillRect(q[0] - 40, 136, 80, 28); c.strokeStyle = C.chalk; c.lineWidth = 2; c.strokeRect(q[0] - 40, 138, 80, 24); d.txt(c, q[1], q[0], 150, { size: 12, bold: true }); });
        // battery
        d.line(c, L - 20, Y, L - 20, 380, C.dim, 2); d.line(c, L - 20, 380, Rr + 20, 380, C.dim, 2); d.line(c, Rr + 20, 380, Rr + 20, Y, C.dim, 2); c.fillStyle = C.bg; c.fillRect(350, 368, 40, 24); d.line(c, 362, 366, 362, 394, C.chalk, 2); d.line(c, 374, 374, 374, 386, C.chalk, 5);
        // galvanometer from middle junction to jockey
        const mx = 370; d.line(c, mx, 150, mx, 205, C.dim, 2); d.line(c, mx, 255, j.x, Y - 70, C.dim, 2);
        d.meter(c, mx, 230, 28, .5 + dev / 2, 'G', ''); d.line(c, j.x, Y - 70, j.x, Y - 4, C.steel, 3); c.fillStyle = C.amber; d.rr(c, j.x - 12, Y - 82, 24, 16, 4); c.fill(); d.txt(c, 'jockey', j.x, Y - 94, { size: 10, color: C.dim });
        const bal = Math.abs(dev) < .02;
        rL(l.toFixed(1) + ' cm'); rG(bal ? '<b>Zero: balanced</b>' : 'Needle to the ' + (dev > 0 ? 'right' : 'left'));
        rX(!show ? 'Balance the bridge, then check.' : 'X = ' + R + ' × (100 − ' + l.toFixed(1) + ') ÷ ' + l.toFixed(1) + ' = <b>' + (R * (100 - l) / l).toFixed(1) + ' Ω</b>' + (bal ? '' : ' (not balanced yet, so this is not X)'));
      });
    }
  };

  /* ---------- waves ---------- */
  S.waves = {
    title: 'Transverse and longitudinal waves', subject: 'phy',
    aim: 'To see how particles move in transverse and longitudinal waves and to check that v = f λ.',
    steps: ['Choose a transverse wave (a rope) or a longitudinal wave (a slinky or sound).', 'Change the frequency and watch the wavelength change while the speed stays the same.', 'Follow the highlighted particle: it only vibrates about one position. The energy travels, not the material.', 'For earthquakes, compare P-waves (longitudinal) and S-waves (transverse).'],
    init(ui) {
      const c = ui.ctx; let mode = 'T', f = 1, A = 40, v = 160, t = 0, run = true;
      const rF = ui.read('Frequency f'), rL = ui.read('Wavelength λ'), rV = ui.read('Speed v = f λ'), rN = ui.read('Note');
      ui.select('Wave', [['T', 'Transverse: wave on a rope'], ['L', 'Longitudinal: slinky or sound'], ['S', 'Earthquake: P-waves and S-waves']], v2 => { mode = v2; });
      ui.slider('Frequency', .5, 3, .25, f, 'Hz', x => { f = x; }); ui.slider('Amplitude', 10, 60, 5, A, 'px', x => { A = x; });
      ui.button('Pause or play', () => { run = !run; });
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H); if (run) t += dt; const lam = v / f, k = 2 * Math.PI / lam, w = 2 * Math.PI * f, X0 = 40, X1 = 720, PX = 1;
        const tr = (Y, amp, col, label) => { const k = 2 * Math.PI * f / v; c.strokeStyle = col; c.lineWidth = 3; c.beginPath(); for (let x = X0; x <= X1; x += 3) { const s = x - X0, y = Y - amp * Math.sin(w * t - k * s) * (s < v * t ? 1 : 0); x === X0 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); const s = 200, y = Y - amp * Math.sin(w * t - k * s) * (s < v * t ? 1 : 0); d.dot(c, X0 + s, y, 7, C.pink); d.line(c, X0 + s, Y - amp - 10, X0 + s, Y + amp + 10, 'rgba(255,111,163,.4)', 1, [3, 3]); if (label) d.txt(c, label, X0, Y - amp - 24, { size: 12, align: 'left', color: C.dim }); };
        const lg = (Y, amp, col, label) => { const k = 2 * Math.PI * f / v; for (let i = 0; i < 70; i++) { const x0 = X0 + i * 10, s = x0 - X0, dx = amp * .4 * Math.sin(w * t - k * s) * (s < v * t ? 1 : 0); d.line(c, x0 + dx, Y - 30, x0 + dx, Y + 30, i === 20 ? C.pink : col, i === 20 ? 4 : 2); } if (label) d.txt(c, label, X0, Y - 50, { size: 12, align: 'left', color: C.dim }); };
        if (mode === 'T') { tr(200, A, C.amber); d.arrow(c, X0 + 260, 330, X0 + 380, 330, C.chalk, 2); d.txt(c, 'wave travels this way', X0 + 320, 350, { size: 11 }); d.arrow(c, X0 + 200 + 24, 200 - 30, X0 + 224, 200 + 30, C.pink, 1.5); d.txt(c, 'particle moves up and down', X0 + 300, 120, { size: 11, color: C.pink });
          if (v * t > 3 * lam) { const s0 = (w * t / k + lam / 4) % lam + lam; d.line(c, X0 + s0, 290, X0 + s0 + lam, 290, C.green, 2); d.line(c, X0 + s0, 284, X0 + s0, 296, C.green, 2); d.line(c, X0 + s0 + lam, 284, X0 + s0 + lam, 296, C.green, 2); d.txt(c, 'λ = ' + lam.toFixed(0) + ' cm', X0 + s0 + lam / 2, 306, { size: 12, color: C.green, bold: true }); }
          rN('Transverse: particles vibrate at right angles to the direction of travel. Crests and troughs.'); }
        else if (mode === 'L') { lg(200, A, C.chalk); d.arrow(c, X0 + 260, 330, X0 + 380, 330, C.chalk, 2); d.txt(c, 'wave travels this way', X0 + 320, 350, { size: 11 }); d.txt(c, 'compressions are where the coils bunch together; rarefactions where they spread out', 380, 112, { size: 11, color: C.dim });
          rN('Longitudinal: particles vibrate along the direction of travel. Compressions and rarefactions.'); }
        else { const vp = 200, vs = 110; d.txt(c, 'Same earthquake, two kinds of wave (P travels faster)', 380, 40, { size: 12, color: C.dim });
          const save = v; v = vp; lg(130, A, C.chalk, 'P-wave: longitudinal, through solids and liquids'); v = vs; tr(300, A * .7, C.amber, 'S-wave: transverse, through solids only'); v = save;
          rN('S-waves cannot pass through the liquid outer core, which is how we know it is liquid.'); }
        rF(f + ' Hz (period ' + (1 / f).toFixed(2) + ' s)'); rL(mode === 'S' ? '–' : lam.toFixed(0) + ' cm'); rV(mode === 'S' ? 'P faster than S' : f + ' × ' + lam.toFixed(0) + ' = <b>' + v + ' cm/s</b>, the same at every frequency');
      });
    }
  };

  /* ---------- electromagnetic induction ---------- */
  S.induction = {
    title: 'Electromagnetic induction', subject: 'phy',
    aim: 'To show that moving a magnet into or out of a coil induces a current, and to find what affects its size and direction.',
    steps: ['Drag the magnet into the coil, then pull it out. Watch the galvanometer.', 'Move it faster, then slowly. Then hold it still inside the coil.', 'Change the number of turns and flip the magnet round.', 'Use Lenz’s law to explain the direction of the needle each time.'],
    init(ui) {
      const c = ui.ctx, CX = 430, CY = 200; let turns = 200, flip = false, lastX = 160, I = 0, peak = 0, note = '';
      const rI = ui.read('Induced current'), rP = ui.read('Biggest deflection so far'), rL = ui.read('Lenz’s law');
      ui.select('Turns on the coil', [['100', '100 turns'], ['200', '200 turns'], ['400', '400 turns']], v => { turns = +v; peak = 0; }).value = '200';
      ui.button('Flip the magnet round', () => { flip = !flip; peak = 0; });
      const mg = ui.thing({ x: 160, y: CY, w: 150, h: 46, lockY: true, clamp: [100, 0, 560, 999] });
      ui.say('Drag the magnet into the coil and out again.');
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H);
        const vel = (mg.x - lastX) / Math.max(dt, .001); lastX = mg.x;
        const nose = mg.x + 75, sg = 1 / (1 + Math.exp(-(nose - (CX - 70)) / 30)), grad = sg * (1 - sg) * 4;
        const target = -vel * grad * turns / 200 * .012 * (flip ? -1 : 1); I += (clamp(target, -1, 1) - I) * Math.min(1, dt * 12); peak = Math.max(peak, Math.abs(I));
        // coil
        c.strokeStyle = '#D98A3A'; c.lineWidth = 3; const n = turns / 25;
        for (let i = 0; i < n; i++) { const x = CX - 90 + i * 180 / n; c.beginPath(); c.ellipse(x, CY, 8, 46, 0, Math.PI / 2, Math.PI * 1.5); c.stroke(); }
        // magnet
        const nL = flip; c.fillStyle = nL ? '#3F6FD8' : '#D6455A'; c.fillRect(mg.x, CY - 20, 75, 40); c.fillStyle = nL ? '#D6455A' : '#3F6FD8'; c.fillRect(mg.x - 75, CY - 20, 75, 40);
        d.txt(c, nL ? 'S' : 'N', mg.x + 37, CY, { size: 16, bold: true }); d.txt(c, nL ? 'N' : 'S', mg.x - 37, CY, { size: 16, bold: true });
        for (let i = 0; i < n; i++) { const x = CX - 90 + i * 180 / n; c.strokeStyle = '#D98A3A'; c.beginPath(); c.ellipse(x, CY, 8, 46, 0, -Math.PI / 2, Math.PI / 2); c.stroke(); }
        d.line(c, CX - 90, CY + 46, CX - 90, 330, C.dim, 2); d.line(c, CX + 90, CY + 46, CX + 90, 330, C.dim, 2); d.line(c, CX - 90, 330, 600, 330, C.dim, 2); d.line(c, CX + 90, 330, CX + 90, 330, C.dim, 2);
        d.meter(c, 640, 300, 64, .5 + I / 2, 'G', 'centre-zero'); d.line(c, 600, 330, 576, 330, C.dim, 2);
        if (Math.abs(I) > .05) { const into = vel > 0, endPole = (into ? !flip : flip) ? 'N' : 'S'; note = 'The magnet is moving ' + (into ? 'in' : 'out') + ', so the coil’s left end becomes a ' + endPole + ' pole to ' + (into ? 'repel it' : 'attract it') + ': it opposes the motion.'; d.txt(c, endPole, CX - 110, CY - 60, { size: 20, bold: true, color: C.amber }); }
        rI(Math.abs(I) < .03 ? 'None: no change in the magnetic field through the coil' : (I > 0 ? 'Needle right, ' : 'Needle left, ') + 'size ' + (Math.abs(I) * 100).toFixed(0)); rP((peak * 100).toFixed(0) + ' (faster motion or more turns give more)'); rL(note || 'Move the magnet to induce a current.');
      });
    }
  };

  /* ---------- radioactive decay and absorbers ---------- */
  S.decay = {
    title: 'Radioactive decay and penetrating power', subject: 'phy',
    aim: 'To model the random decay of nuclei and find the half-life, and to compare how far alpha, beta and gamma radiation penetrate.',
    steps: ['Choose an experiment.', 'Decay: press “Start decay”. Each dot is an unstable nucleus. Read off the time for the count to halve, then halve again.', 'Absorbers: choose a source and an absorber and read the count rate on the Geiger–Müller counter.', 'Remember to subtract the background count.'],
    init(ui) {
      const c = ui.ctx, N0 = 400; let mode = 'decay', hl = 4, run = false, t = 0, nuc = [], pts = [], src = 'a', abs = 'none';
      const rA = ui.read('Reading'), rB = ui.read('Working');
      const reset = () => { run = false; t = 0; pts = [[0, N0]]; nuc = []; for (let i = 0; i < N0; i++) nuc.push(true); };
      ui.select('Experiment', [['decay', 'Half-life of a sample'], ['abs', 'Alpha, beta and gamma through absorbers']], v => { mode = v; reset(); });
      ui.slider('Half-life of the nuclide', 2, 10, 1, hl, 's', v => { hl = v; reset(); });
      ui.select('Source', [['a', 'Alpha source'], ['b', 'Beta source'], ['g', 'Gamma source']], v => { src = v; });
      ui.select('Absorber', [['none', 'Nothing (air only)'], ['paper', 'Sheet of paper'], ['al', '5 mm of aluminium'], ['pb', '2 cm of lead']], v => { abs = v; });
      ui.button('Start decay', () => { reset(); run = true; }, 'btn-main');
      reset();
      ui.loop((dt, tt) => {
        d.bg(c, ui.W, ui.H);
        if (mode === 'decay') {
          if (run) { t += dt; const p = 1 - Math.pow(.5, dt / hl); for (let i = 0; i < N0; i++) if (nuc[i] && Math.random() < p) nuc[i] = false; const n = nuc.filter(Boolean).length; pts.push([t, n]); if (t > hl * 5) run = false; }
          for (let i = 0; i < N0; i++) d.dot(c, 50 + (i % 20) * 18, 50 + Math.floor(i / 20) * 17, 6, nuc[i] ? C.amber : 'rgba(234,244,242,.12)');
          const n = nuc.filter(Boolean).length;
          d.graph(c, 450, 60, 270, 220, { xmax: hl * 5, ymax: N0, xl: 'Time (s)', yl: 'Undecayed nuclei', pts, color: C.amber });
          [1, 2, 3].forEach(k => { const x = 450 + 270 * k * hl / (hl * 5), y = 280 - 220 * Math.pow(.5, k); d.line(c, 450, y, x, y, 'rgba(95,211,154,.5)', 1, [3, 3]); d.line(c, x, y, x, 280, 'rgba(95,211,154,.5)', 1, [3, 3]); });
          d.txt(c, 'Amber = undecayed nucleus', 230, 410, { size: 11, color: C.dim });
          rA('Time ' + t.toFixed(1) + ' s; ' + n + ' undecayed of ' + N0); rB('After each ' + hl + ' s about half of what is left decays: ' + N0 + ' → ' + N0 / 2 + ' → ' + N0 / 4 + ' → ' + N0 / 8 + '. Decay is random, so the numbers are never exact.');
        } else {
          const BG = 20, base = { a: 900, b: 700, g: 500 }[src], f = { a: { none: 1, paper: 0, al: 0, pb: 0 }, b: { none: 1, paper: .9, al: 0, pb: 0 }, g: { none: 1, paper: 1, al: .9, pb: .3 } }[src][abs], rate = Math.round(base * f + BG);
          c.fillStyle = '#5B6B72'; d.rr(c, 60, 180, 90, 60, 6); c.fill(); d.txt(c, { a: 'α source', b: 'β source', g: 'γ source' }[src], 105, 210, { size: 12, bold: true });
          const ax = 320; if (abs !== 'none') { c.fillStyle = { paper: '#F4F1E6', al: '#C9D2D6', pb: '#5A6066' }[abs]; c.fillRect(ax - ({ paper: 2, al: 6, pb: 16 }[abs]), 120, { paper: 4, al: 12, pb: 32 }[abs], 180); d.txt(c, { paper: 'paper', al: 'aluminium', pb: 'lead' }[abs], ax, 316, { size: 11 }); }
          const reach = f > 0 ? 560 : ax - 6; for (let i = 0; i < 14; i++) { const ph = (tt * 300 + i * 41) % (reach - 150), x = 150 + ph, y = 210 + Math.sin(i * 7) * 30 * ph / 400; d.dot(c, x, y, src === 'a' ? 4 : src === 'b' ? 2.5 : 2, src === 'a' ? C.pink : src === 'b' ? C.blue : C.green); }
          c.fillStyle = C.steel; d.rr(c, 560, 195, 100, 30, 8); c.fill(); d.txt(c, 'G–M tube', 610, 240, { size: 11, color: C.dim });
          c.fillStyle = 'rgba(244,250,249,.95)'; d.rr(c, 560, 280, 140, 60, 10); c.fill(); d.txt(c, rate + ' /min', 630, 310, { size: 20, bold: true, color: '#0B2A30' });
          rA(rate + ' counts per minute (background ' + BG + ')'); rB(f === 0 ? 'Only background is detected: this absorber stops the radiation.' : src === 'g' && abs === 'pb' ? 'Lead reduces gamma but does not stop it completely.' : 'The radiation passes through ' + (abs === 'none' ? 'the air gap' : 'this absorber') + '. Corrected count = ' + (rate - BG) + ' /min.');
        }
      });
    }
  };

  /* ---------- cathode-ray tube ---------- */
  S.crt = {
    title: 'Cathode rays in a deflection tube', subject: 'phy',
    aim: 'To show that cathode rays come from a heated cathode, carry negative charge, and are deflected by electric and magnetic fields.',
    steps: ['Click the heater switch. Without heating, no electrons leave the cathode.', 'Set the accelerating voltage and watch the spot on the screen.', 'Put a voltage on the Y-plates: which way does the beam bend?', 'Bring the magnet up and compare. A higher accelerating voltage makes the beam harder to deflect.'],
    init(ui) {
      const c = ui.ctx; let heat = false, Va = 2000, Vy = 0, B = 0, glow = 0;
      const rB = ui.read('Beam'), rD = ui.read('Spot moves'), rE = ui.read('Explanation');
      ui.slider('Accelerating voltage', 1000, 5000, 250, Va, 'V', v => { Va = v; }); ui.slider('Y-plate voltage (top plate positive when +)', -200, 200, 10, Vy, 'V', v => { Vy = v; });
      ui.select('Magnet near the tube', [['0', 'None'], ['1', 'North pole facing you'], ['-1', 'South pole facing you']], v => { B = +v; });
      ui.thing({ x: 70, y: 330, w: 90, h: 50, drag: false, onClick() { heat = !heat; ui.say(heat ? 'The cathode is hot: electrons are emitted (thermionic emission).' : 'Heater off: no electrons leave the cathode.'); } });
      ui.say('Click the heater switch to start.');
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H); glow += ((heat ? 1 : 0) - glow) * dt * 2;
        c.strokeStyle = C.glass; c.lineWidth = 2.5; c.beginPath(); c.moveTo(60, 180); c.lineTo(300, 180); c.lineTo(680, 60); c.lineTo(680, 360); c.lineTo(300, 240); c.lineTo(60, 240); c.closePath(); c.stroke(); c.fillStyle = 'rgba(200,236,240,.05)'; c.fill();
        c.fillStyle = 'rgba(95,211,154,.25)'; c.fillRect(676, 64, 6, 292);
        c.strokeStyle = 'rgb(' + (120 + 135 * glow) + ',' + (90 + 80 * glow) + ',60)'; c.lineWidth = 3; c.beginPath(); for (let i = 0; i < 6; i++) c.lineTo(90 + (i % 2 ? 6 : -6), 196 + i * 6); c.stroke(); d.txt(c, 'cathode', 90, 260, { size: 11, color: C.dim }); d.line(c, 150, 186, 150, 206, C.steel, 5); d.line(c, 150, 214, 150, 234, C.steel, 5); d.txt(c, 'anode +', 150, 172, { size: 11, color: C.dim });
        d.line(c, 300, 186, 400, 186, Vy > 0 ? C.pink : Vy < 0 ? C.blue : C.steel, 5); d.line(c, 300, 234, 400, 234, Vy < 0 ? C.pink : Vy > 0 ? C.blue : C.steel, 5); d.txt(c, Vy ? (Vy > 0 ? '+' : '−') : '', 350, 176, { size: 14, bold: true }); d.txt(c, Vy ? (Vy > 0 ? '−' : '+') : '', 350, 248, { size: 14, bold: true }); d.txt(c, 'Y-plates', 350, 262, { size: 11, color: C.dim });
        if (B) { c.fillStyle = B > 0 ? '#D6455A' : '#3F6FD8'; c.beginPath(); c.arc(520, 330, 26, 0, 7); c.fill(); d.txt(c, B > 0 ? 'N' : 'S', 520, 330, { size: 16, bold: true }); }
        const kE = Vy / Va * 900, kB = B * 120 / Math.sqrt(Va / 1000); let yS = 0;
        if (glow > .3) {
          c.strokeStyle = 'rgba(120,200,255,' + glow * .8 + ')'; c.lineWidth = 3; c.beginPath(); c.moveTo(100, 210);
          let y = 210, vy = 0; for (let x = 100; x <= 676; x += 4) { if (x > 300 && x < 400) vy -= kE * .00011; if (x > 430 && x < 610) vy -= kB * .00012; y += vy * 4; c.lineTo(x, y); } c.stroke(); yS = y;
          const yy = clamp(yS, 70, 350); c.fillStyle = 'rgba(160,255,190,' + glow + ')'; c.beginPath(); c.arc(678, yy, 7, 0, 7); c.fill(); c.fillStyle = 'rgba(160,255,190,.25)'; c.beginPath(); c.arc(678, yy, 16, 0, 7); c.fill();
        }
        c.fillStyle = heat ? C.green : C.red; d.rr(c, 40, 315, 60, 30, 6); c.fill(); d.txt(c, heat ? 'ON' : 'OFF', 70, 330, { size: 12, bold: true, color: '#0B2A30' }); d.txt(c, 'Heater (click)', 70, 362, { size: 11, color: C.dim });
        const dy = 210 - yS; rB(glow > .3 ? 'A stream of electrons (cathode rays) hits the screen and makes it glow' : 'No beam');
        rD(glow < .3 ? '–' : Math.abs(dy) < 3 ? 'Straight across: no deflection' : (dy > 0 ? 'Up' : 'Down') + ', about ' + (Math.abs(dy) / 4).toFixed(0) + ' mm on the screen');
        rE(Vy && B ? 'Both fields act on the moving electrons.' : Vy ? 'The beam bends towards the positive plate, so cathode rays are negatively charged. Faster electrons (higher accelerating voltage) bend less.' : B ? 'A magnetic field also bends the beam. Use Fleming’s left-hand rule with current opposite to the electron flow.' : 'With no fields the beam travels in a straight line.');
      });
    }
  };

  /* ---------- diode and rectifier ---------- */
  S.diode = {
    title: 'Diodes and rectification', subject: 'phy',
    aim: 'To show that a diode conducts in one direction only, and to see how diodes and a capacitor turn a.c. into smooth d.c.',
    steps: ['Start with the battery circuit. Click the battery to reverse it and watch the lamp.', 'Switch to the half-wave rectifier and compare the output trace with the a.c. input.', 'Try the bridge (full-wave) rectifier, then add the smoothing capacitor.', 'Explain each trace using forward and reverse bias.'],
    init(ui) {
      const c = ui.ctx; let mode = 'bias', rev = false, t = 0;
      const rS = ui.read('Diode'), rO = ui.read('Output');
      ui.select('Circuit', [['bias', 'Diode, battery and lamp'], ['half', 'Half-wave rectifier'], ['full', 'Full-wave bridge rectifier'], ['smooth', 'Full-wave with smoothing capacitor']], v => { mode = v; });
      ui.thing({ x: 170, y: 120, w: 90, h: 60, drag: false, onClick() { if (mode === 'bias') rev = !rev; } });
      ui.say('Click the battery to reverse it.');
      const diode = (x, y, ang, on) => { c.save(); c.translate(x, y); c.rotate(ang); c.fillStyle = on ? C.amber : C.chalk; c.beginPath(); c.moveTo(-12, -12); c.lineTo(-12, 12); c.lineTo(10, 0); c.fill(); d.line(c, 12, -13, 12, 13, on ? C.amber : C.chalk, 3); c.restore(); };
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H); t += dt;
        if (mode === 'bias') {
          c.strokeStyle = C.chalk; c.lineWidth = 2; c.strokeRect(100, 120, 400, 200);
          c.fillStyle = C.bg; c.fillRect(140, 100, 60, 40); d.line(c, 160, 100, 160, 140, C.chalk, 2); d.line(c, 176, 110, 176, 130, C.chalk, 5); d.txt(c, rev ? '−' : '+', rev ? 186 : 150, 92, { size: 14, bold: true }); d.txt(c, rev ? '+' : '−', rev ? 150 : 186, 92, { size: 14, bold: true }); d.txt(c, 'Battery (click to reverse)', 170, 70, { size: 11, color: C.dim });
          c.fillStyle = C.bg; c.fillRect(290, 105, 40, 30); const on = !rev; diode(310, 120, 0, on);
          c.fillStyle = C.bg; c.beginPath(); c.arc(300, 320, 22, 0, 7); c.fill(); c.strokeStyle = C.chalk; c.beginPath(); c.arc(300, 320, 22, 0, 7); c.stroke(); if (on) { c.fillStyle = 'rgba(255,220,120,.9)'; c.beginPath(); c.arc(300, 320, 18, 0, 7); c.fill(); c.fillStyle = 'rgba(255,220,120,.2)'; c.beginPath(); c.arc(300, 320, 44, 0, 7); c.fill(); }
          d.line(c, 286, 306, 314, 334, C.chalk, 2); d.line(c, 314, 306, 286, 334, C.chalk, 2);
          rS(on ? 'Forward biased (p side to +): the depletion layer narrows and current flows' : 'Reverse biased: the depletion layer widens; almost no current');
          rO(on ? 'Lamp lights' : 'Lamp off');
        } else {
          const input = s => Math.sin(2 * Math.PI * 1 * s), out = s => { const v = input(s); if (mode === 'half') return Math.max(0, v); const a = Math.abs(v); if (mode === 'full') return a; return Math.max(a, .86 + .1 * Math.cos(4 * Math.PI * s)); };
          // circuit sketch
          c.strokeStyle = C.chalk; c.lineWidth = 2; c.beginPath(); c.arc(90, 140, 24, 0, 7); c.stroke(); c.beginPath(); for (let i = 0; i <= 20; i++) c.lineTo(78 + i * 1.2, 140 - 8 * Math.sin(i / 20 * 6.28)); c.stroke(); d.txt(c, 'a.c. in', 90, 180, { size: 11, color: C.dim });
          if (mode === 'half') { d.line(c, 114, 140, 230, 140, C.chalk, 2); diode(180, 140, 0, input(t) > 0); d.line(c, 230, 140, 230, 240, C.chalk, 2); d.line(c, 90, 164, 90, 240, C.chalk, 2); d.line(c, 90, 240, 230, 240, C.chalk, 2); }
          else { const cx = 210, cy = 140, pos = input(t) > 0; c.strokeStyle = C.chalk; c.lineWidth = 2; c.beginPath(); c.moveTo(cx - 60, cy); c.lineTo(cx, cy - 60); c.lineTo(cx + 60, cy); c.lineTo(cx, cy + 60); c.closePath(); c.stroke();
            diode(cx - 30, cy - 30, -Math.PI / 4, pos); diode(cx + 30, cy + 30, -Math.PI / 4, pos); diode(cx + 30, cy - 30, -3 * Math.PI / 4, !pos); diode(cx - 30, cy + 30, -3 * Math.PI / 4, !pos);
            d.line(c, 114, 140, cx - 60, cy, C.chalk, 2); d.line(c, 90, 164, 90, 250, C.chalk, 2); d.line(c, 90, 250, cx + 100, 250, C.chalk, 2); d.line(c, cx + 100, 250, cx + 100, cy, C.chalk, 2); d.line(c, cx + 100, cy, cx + 60, cy, C.chalk, 2);
            d.line(c, cx, cy - 60, 330, cy - 60, C.amber, 2); d.line(c, cx, cy + 60, 330, cy + 60, C.amber, 2); d.line(c, 330, cy - 60, 330, cy + 60, C.amber, 2); c.fillStyle = C.bg; c.fillRect(320, cy - 22, 20, 44); c.strokeStyle = C.amber; c.strokeRect(320, cy - 22, 20, 44); d.txt(c, '+', 344, cy - 60, { size: 13, bold: true, color: C.amber }); }
          if (mode === 'half') { c.fillStyle = C.bg; c.fillRect(220, 168, 20, 44); c.strokeStyle = C.amber; c.lineWidth = 2; c.strokeRect(220, 168, 20, 44); }
          d.txt(c, 'load (amber)', 200, 280, { size: 11, color: C.amber }); if (mode === 'smooth') d.txt(c, '+ capacitor across the load', 200, 300, { size: 11, color: C.amber });
          // CRO
          c.fillStyle = 'rgba(8,30,35,.7)'; d.rr(c, 360, 40, 370, 340, 12); c.fill(); d.txt(c, 'CRO traces', 545, 58, { size: 12, color: C.dim });
          [[130, input, C.blue, 'input (a.c.)'], [290, out, C.green, 'output across the load']].forEach(q => { d.line(c, 380, q[0], 710, q[0], 'rgba(234,244,242,.2)', 1); c.strokeStyle = q[2]; c.lineWidth = 2.5; c.beginPath(); for (let x = 0; x <= 330; x += 2) { const s = t - (330 - x) / 110; const y = q[0] - 55 * q[1](s); x ? c.lineTo(380 + x, y) : c.moveTo(380 + x, y); } c.stroke(); d.txt(c, q[3], 390, q[0] - 70, { size: 11, align: 'left', color: q[2] }); });
          rS(mode === 'half' ? 'Conducts only in the half-cycles when it is forward biased' : 'Two diodes conduct in each half-cycle, steering current the same way through the load');
          rO(mode === 'half' ? 'Half-wave: one pulse per cycle, gaps in between' : mode === 'full' ? 'Full-wave: a pulse in every half-cycle, all in one direction' : 'Smoothed: the capacitor charges at the peaks and discharges in between, giving almost steady d.c. (small ripple)');
        }
      });
    }
  };

  /* ---------- phases of the Moon and eclipses ---------- */
  S.moon = {
    title: 'Phases of the Moon and eclipses', subject: 'phy',
    aim: 'To explain the phases of the Moon and when solar and lunar eclipses can happen.',
    steps: ['Drag the Moon around its orbit, or press “Play a month”.', 'Watch the inset: it shows the Moon as seen from Earth.', 'Find new moon and full moon. Where are the Sun, Earth and Moon at each?', 'Note which phase allows a solar eclipse and which allows a lunar eclipse.'],
    init(ui) {
      const c = ui.ctx, EX = 380, EY = 220, R = 140; let a = Math.PI, play = false;
      const rP = ui.read('Phase'), rD = ui.read('Day of the lunar month'), rE = ui.read('Eclipse?');
      ui.button('Play a month', () => { play = !play; }, 'btn-main');
      const mn = ui.thing({ x: 0, y: 0, w: 40, h: 40, onMove(o, x, y) { a = Math.atan2(y - EY, x - EX); play = false; } });
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H); if (play) a += dt * .4; mn.x = EX + Math.cos(a) * R; mn.y = EY + Math.sin(a) * R;
        for (let i = 0; i < 10; i++) d.arrow(c, 10, 40 + i * 40, 60, 40 + i * 40, 'rgba(255,214,70,.35)', 2); d.txt(c, 'Sunlight', 40, 20, { size: 12, color: C.amber });
        c.strokeStyle = C.faint; c.lineWidth = 1.5; c.beginPath(); c.arc(EX, EY, R, 0, 7); c.stroke();
        c.fillStyle = '#2F7FC1'; c.beginPath(); c.arc(EX, EY, 30, 0, 7); c.fill(); c.fillStyle = 'rgba(0,0,0,.55)'; c.beginPath(); c.arc(EX, EY, 30, -Math.PI / 2, Math.PI / 2); c.fill(); d.txt(c, 'Earth', EX, EY + 46, { size: 11 });
        c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(EX, EY - 30, 380, 60);
        c.fillStyle = '#D9D4C7'; c.beginPath(); c.arc(mn.x, mn.y, 14, 0, 7); c.fill(); c.fillStyle = 'rgba(0,0,0,.6)'; c.beginPath(); c.arc(mn.x, mn.y, 14, -Math.PI / 2, Math.PI / 2); c.fill();
        // phase as seen from Earth: elongation = angle between moon direction and anti-sun... sun is to the left (−x)
        let el = ((a - Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI); // 0 at new moon (moon on sun side)
        const lit = (1 - Math.cos(el)) / 2, day = el / (2 * Math.PI) * 29.5;
        const IX = 650, IY = 330, r = 50; c.fillStyle = 'rgba(8,30,35,.7)'; d.rr(c, IX - 80, IY - 84, 160, 170, 12); c.fill(); d.txt(c, 'Seen from Earth', IX, IY - 68, { size: 11, color: C.dim });
        c.fillStyle = '#1E2A2E'; c.beginPath(); c.arc(IX, IY, r, 0, 7); c.fill();
        const waxing = el < Math.PI, k = Math.cos(el); c.fillStyle = '#E9E4D4'; c.beginPath(); c.arc(IX, IY, r, -Math.PI / 2, Math.PI / 2, !waxing); c.ellipse(IX, IY, Math.abs(k) * r, r, 0, Math.PI / 2, -Math.PI / 2, waxing ? k > 0 : !(k > 0)); c.fill();
        const names = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'], ph = names[Math.round(el / (Math.PI / 4)) % 8];
        const near = (x0) => Math.abs(((el - x0 + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI) < .08;
        if (near(0)) { d.txt(c, 'Moon’s shadow falls on Earth', EX - 110, EY - 60, { size: 12, color: C.amber, bold: true }); c.fillStyle = 'rgba(0,0,0,.6)'; c.beginPath(); c.moveTo(mn.x, mn.y - 12); c.lineTo(EX - 28, EY - 4); c.lineTo(EX - 28, EY + 4); c.lineTo(mn.x, mn.y + 12); c.fill(); }
        if (near(Math.PI)) { c.fillStyle = 'rgba(190,60,40,.55)'; c.beginPath(); c.arc(mn.x, mn.y, 15, 0, 7); c.fill(); }
        d.txt(c, 'Drag the Moon', mn.x, mn.y + 26, { size: 10, color: C.dim });
        rP(ph + ' (' + (lit * 100).toFixed(0) + '% of the face lit)'); rD('Day ' + day.toFixed(1) + ' of about 29.5');
        rE(near(0) ? '<b>Solar eclipse possible:</b> the Moon is between the Sun and the Earth.' : near(Math.PI) ? '<b>Lunar eclipse possible:</b> the Earth is between the Sun and the Moon; the Moon turns coppery red.' : 'No. Eclipses need the three bodies in a line. The Moon’s orbit is tilted about 5°, so most months they miss.');
      });
    }
  };
})();

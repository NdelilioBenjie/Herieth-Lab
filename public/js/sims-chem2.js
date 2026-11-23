/* Herieth-Lab chemistry practicals for Form Three and Form Four */
(function () {
  const S = HL.sims, d = HL.d, C = HL.C, clamp = HL.clamp, BY = 380;
  const sub = f => f.replace(/(\d+)/g, '_$1');
  const subH = f => f.replace(/(\d+)/g, '<sub>$1</sub>');
  function parseF(f) {
    let i = 0;
    const num = () => { let s = ''; while (i < f.length && /\d/.test(f[i])) s += f[i++]; return s ? +s : 1; };
    const grp = () => { const m = {}; while (i < f.length && f[i] !== ')') { if (f[i] === '(') { i++; const g = grp(); i++; const n = num(); for (const k in g) m[k] = (m[k] || 0) + g[k] * n; } else { let el = f[i++]; while (i < f.length && /[a-z]/.test(f[i])) el += f[i++]; const n = num(); m[el] = (m[el] || 0) + n; } } return m; };
    return grp();
  }
  const log = (rows) => '<table class="obs"><tr><th>Experiment</th><th>Observation</th><th>Inference</th></tr>' + rows.slice(-4).map(r => '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>').join('') + '</table>';
  HL.obsLog = log;

  /* ---------- balancing equations ---------- */
  S.balance = {
    title: 'Balancing chemical equations', subject: 'chem',
    aim: 'To balance chemical equations by changing only the numbers in front of formulae, and to see that atoms are conserved.',
    steps: ['Choose an equation.', 'Click the arrows above and below each number to change it. Never change the formulae themselves.', 'Watch the atom count for each element: the two sides must match.', 'When every element balances, the scale levels and the equation is complete.'],
    init(ui) {
      const c = ui.ctx, EQ = [['H2', 'O2'], ['H2O']], LIST = [
        [['H2', 'O2'], ['H2O']], [['Mg', 'O2'], ['MgO']], [['Na', 'H2O'], ['NaOH', 'H2']], [['CH4', 'O2'], ['CO2', 'H2O']], [['N2', 'H2'], ['NH3']], [['Al', 'O2'], ['Al2O3']],
        [['Fe', 'Cl2'], ['FeCl3']], [['Zn', 'HCl'], ['ZnCl2', 'H2']], [['CaCO3', 'HCl'], ['CaCl2', 'H2O', 'CO2']], [['Fe2O3', 'CO'], ['Fe', 'CO2']], [['C3H8', 'O2'], ['CO2', 'H2O']], [['Pb(NO3)2', 'KI'], ['PbI2', 'KNO3']]];
      let eq = LIST[0], co = [], sp = [], done = false;
      const rS = ui.read('Status'), rE = ui.read('Equation');
      const COL = { H: '#EAF4F2', O: '#FF5D5D', C: '#6B7A80', N: '#56AEFF', Na: '#C08AF0', Mg: '#5FD39A', Al: '#C9D2D6', Fe: '#C7773E', Cl: '#9BE07A', Zn: '#9FB0B8', Ca: '#F5A524', Pb: '#7E8C96', K: '#B07AE0', I: '#9B4FD0' };
      const setEq = i => { eq = LIST[i]; sp = [...eq[0], ...eq[1]]; co = sp.map(() => 1); done = false; place(); ui.say('Click the arrows to change the numbers in front of the formulae.'); };
      const arrows = []; for (let k = 0; k < 10; k++) arrows.push(ui.thing({ x: -99, y: -99, w: 34, h: 26, drag: false, k, onClick(o) { const j = o.k >> 1; if (j >= sp.length) return; co[j] = clamp(co[j] + (o.k % 2 ? -1 : 1), 1, 12); } }));
      const xs = () => { const n = sp.length, L = eq[0].length; return sp.map((_, j) => 70 + (j + (j >= L ? .8 : 0)) * (570 / (n - .2))); };
      const place = () => { const X = xs(); arrows.forEach(a => { const j = a.k >> 1; if (j < sp.length) { a.x = X[j] - 20; a.y = a.k % 2 ? 132 : 48; a.off = false; } else a.off = true; }); };
      ui.select('Equation', LIST.map((e, i) => [i, e[0].join(' + ') + ' → ' + e[1].join(' + ')]), v => setEq(+v));
      ui.button('Reset the numbers', () => { co = sp.map(() => 1); done = false; });
      setEq(0);
      ui.loop(() => {
        d.bg(c, ui.W, ui.H); const X = xs(), L = eq[0].length;
        const side = (a, b) => { const m = {}; for (let j = a; j < b; j++) { const p = parseF(sp[j]); for (const k in p) m[k] = (m[k] || 0) + p[k] * co[j]; } return m; };
        const left = side(0, L), right = side(L, sp.length), els = [...new Set([...Object.keys(left), ...Object.keys(right)])];
        sp.forEach((f, j) => {
          if (j > 0 && j !== L) d.txt(c, '+', (X[j] + X[j - 1]) / 2 + 10, 90, { size: 22, bold: true, color: C.dim });
          c.fillStyle = 'rgba(245,165,36,.15)'; d.rr(c, X[j] - 38, 74, 36, 34, 6); c.fill();
          d.txt(c, String(co[j]), X[j] - 20, 91, { size: 24, bold: true, color: co[j] > 1 ? C.amber : C.dim });
          d.chem(c, sub(f), X[j], 91, 22, C.chalk, 'left');
          [48, 132].forEach((y, u) => { c.fillStyle = 'rgba(234,244,242,.12)'; d.rr(c, X[j] - 37, y - 12, 34, 24, 5); c.fill(); c.fillStyle = C.chalk; c.beginPath(); if (u) { c.moveTo(X[j] - 28, y - 4); c.lineTo(X[j] - 12, y - 4); c.lineTo(X[j] - 20, y + 5); } else { c.moveTo(X[j] - 28, y + 4); c.lineTo(X[j] - 12, y + 4); c.lineTo(X[j] - 20, y - 5); } c.fill(); });
        });
        d.arrow(c, (X[L - 1] + X[L]) / 2 - 10, 91, (X[L - 1] + X[L]) / 2 + 40, 91, C.chalk, 3);
        // atom counts
        let diff = 0;
        els.forEach((e, i) => { const y = 200 + i * 34, l = left[e] || 0, r = right[e] || 0, ok = l === r; diff += l - r;
          d.txt(c, e, 60, y, { size: 16, bold: true, color: COL[e] || C.chalk });
          for (let k = 0; k < Math.min(l, 18); k++) d.dot(c, 330 - k * 13, y, 5, COL[e] || C.chalk); for (let k = 0; k < Math.min(r, 8); k++) d.dot(c, 430 + k * 13, y, 5, COL[e] || C.chalk); if (r > 8) d.txt(c, '…', 540, y, { size: 13, color: C.dim });
          d.txt(c, String(l), 350, y, { size: 13, bold: true, align: 'left' }); d.txt(c, String(r), 410, y, { size: 13, bold: true, align: 'right' }); d.txt(c, ok ? '✓' : '✗', 380, y, { size: 16, bold: true, color: ok ? C.green : C.red }); });
        d.txt(c, 'Reactant atoms', 260, 170, { size: 11, color: C.dim }); d.txt(c, 'Product atoms', 500, 170, { size: 11, color: C.dim });
        const bal = els.every(e => (left[e] || 0) === (right[e] || 0));
        // see-saw
        const ang = clamp(diff * .03, -.3, .3), cx = 640, cy = 300; c.save(); c.translate(cx, cy); c.rotate(-ang); d.line(c, -80, 0, 80, 0, C.steel, 5); c.fillStyle = 'rgba(234,244,242,.25)'; c.fillRect(-90, -20, 30, 20); c.fillRect(60, -20, 30, 20); c.restore();
        c.fillStyle = C.steel; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx - 14, cy + 30); c.lineTo(cx + 14, cy + 30); c.fill(); d.txt(c, bal ? 'Balanced' : 'Not balanced', cx, cy + 50, { size: 13, bold: true, color: bal ? C.green : C.dim });
        const g = co.reduce((a, b) => { while (b) [a, b] = [b, a % b]; return a; });
        if (bal && !done) { done = true; ui.say('<b>Balanced!</b> Every element has the same number of atoms on both sides.'); } if (!bal) done = false;
        rS(bal ? (g > 1 ? 'Balanced, but every number can be divided by ' + g + '. Use the smallest whole numbers.' : '<b>Balanced</b> with the smallest whole numbers') : 'Not balanced yet: check the elements marked ✗');
        rE(sp.map((f, j) => (co[j] > 1 ? co[j] : '') + subH(f)).slice(0, L).join(' + ') + ' → ' + sp.map((f, j) => (co[j] > 1 ? co[j] : '') + subH(f)).slice(L).join(' + '));
      });
    }
  };

  /* ---------- hardness of water ---------- */
  S.hardness = {
    title: 'Testing water for hardness with soap', subject: 'chem',
    aim: 'To compare the hardness of water samples by the volume of soap solution needed to form a lasting lather, and to test methods of softening.',
    steps: ['Choose a water sample and, if you like, a treatment.', 'Press and hold the burette tap to add soap solution, about 0.5 cm³ at a time.', 'Shake the flask by dragging it quickly left and right. A lather that lasts means enough soap has been added.', 'Record the volume. Compare the samples and treatments in the table.'],
    init(ui) {
      const c = ui.ctx, SAM = { dist: ['Distilled water', .5, 0], rain: ['Rain water', 1, 0], tap: ['Tap water', 3.5, 1], temp: ['Water with Ca(HCO₃)₂ (temporary hardness)', 8, 2], perm: ['Water with CaSO₄ (permanent hardness)', 8, 3] };
      const TR = { none: 'No treatment', boil: 'Boiled, then cooled and filtered', soda: 'Washing soda added and filtered', ion: 'Passed through an ion exchanger' };
      let sk = 'tap', tk = 'none', soap = 0, shake = 0, lx = 0, lather = false, flow = false, table = {};
      const need = () => { const b = SAM[sk][1]; if (tk === 'boil' && sk === 'temp') return 1.5; if (tk === 'boil' && sk === 'tap') return 2.5; if (tk === 'soda' && b > 1) return 1.5; if (tk === 'ion' && b > 1) return .8; return b; };
      const rV = ui.read('Soap added'), rO = ui.read('Observation'), rT = ui.read('Results so far');
      const fresh = () => { soap = 0; shake = 0; lather = false; ui.say('Add soap solution, then shake the flask.'); };
      ui.select('Water sample', Object.keys(SAM).map(k => [k, SAM[k][0]]), v => { sk = v; fresh(); }).value = 'tap';
      ui.select('Treatment', Object.keys(TR).map(k => [k, TR[k]]), v => { tk = v; fresh(); });
      ui.button('Empty the flask and refill', fresh);
      ui.thing({ x: 250, y: 168, w: 70, h: 44, drag: false, onDown() { flow = true; }, onUp() { flow = false; } });
      const fl = ui.thing({ x: 250, y: 318, w: 130, h: 120, lockY: true, clamp: [180, 0, 330, 999], onDown(o) { lx = o.x; }, onMove(o) { shake += Math.abs(o.x - lx); lx = o.x; }, onUp(o) { o.x = o.hx; } });
      fresh();
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY); if (flow) { soap = Math.min(15, soap + dt * 1.2); shake = 0; lather = false; }
        if (shake > 400 && !lather) { if (soap >= need()) { lather = true; const key = SAM[sk][0].replace(/ \(.*/, '') + (tk === 'none' ? '' : ', ' + tk.replace('soda', 'washing soda').replace('ion', 'ion exchange').replace('boil', 'boiled')); table[key] = soap.toFixed(1); ui.say('<b>A lasting lather formed</b> after ' + soap.toFixed(1) + ' cm³ of soap solution.'); } else ui.say(soap < .2 ? 'Add some soap solution first.' : 'No lasting lather yet' + (SAM[sk][1] > 1 && tk !== 'ion' ? ': grey scum forms instead. Add more soap.' : '. Add a little more soap.')); shake = 0; }
        // burette
        d.stand(c, 220, BY, 360, 70); c.fillStyle = 'rgba(245,245,235,.5)'; c.fillRect(244, 40 + soap * 8, 12, 120 - soap * 8 + 2); c.strokeStyle = C.glass; c.lineWidth = 2; c.strokeRect(243, 30, 14, 134); d.line(c, 250, 164, 250, 190, C.glass, 4);
        c.fillStyle = flow ? C.green : C.amber; d.rr(c, 232, 160, 36, 12, 4); c.fill(); d.txt(c, 'Soap solution (press and hold the tap)', 250, 16, { size: 11, color: C.dim }); if (flow) d.dot(c, 250, 198 + (t * 160) % 40, 3, 'rgba(255,255,240,.9)');
        const sx = fl.x; d.flask(c, sx, BY, 120, 130, .38, 'rgba(200,225,245,.35)');
        const scum = need() > 1.2 ? Math.min(1, soap / need()) : 0;
        for (let i = 0; i < 40 * scum; i++) d.dot(c, sx - 40 + (i * 23) % 80, 345 + (i * 13) % 28, 2, 'rgba(150,150,140,.9)');
        if ((tk === 'boil' && (sk === 'temp' || sk === 'tap')) || (tk === 'soda' && SAM[sk][1] > 1)) d.txt(c, 'white CaCO₃ was filtered off', sx, 404, { size: 10, color: C.dim });
        if (lather) for (let i = 0; i < 26; i++) { c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(sx - 30 + (i * 17) % 60, 320 - (i % 4) * 7 + Math.sin(t * 3 + i) * 1.5, 6 + (i % 3) * 2, 0, 7); c.fill(); }
        if (fl.held) d.txt(c, 'Shaking…', sx, 240, { size: 13, bold: true, color: C.amber }); else d.txt(c, 'Drag to shake', sx, 240, { size: 11, color: C.dim });
        // results table
        c.fillStyle = 'rgba(8,30,35,.6)'; d.rr(c, 430, 40, 300, 300, 10); c.fill(); d.txt(c, 'Soap needed for a lasting lather (cm³)', 580, 60, { size: 12, color: C.dim });
        if (!Object.keys(table).length) d.txt(c, 'No results yet. Get a lasting lather to record one.', 580, 180, { size: 11, color: C.dim }); Object.keys(table).slice(-9).forEach((k, i) => { d.txt(c, k.length > 34 ? k.slice(0, 33) + '…' : k, 444, 90 + i * 27, { size: 11, align: 'left' }); d.txt(c, table[k], 716, 90 + i * 27, { size: 12, bold: true, align: 'right' }); });
        rV(soap.toFixed(1) + ' cm³'); rO(lather ? 'Lasting lather' : scum > .2 ? 'Grey scum, no lasting lather' : soap > 0 ? 'No lasting lather yet' : '–');
        rT(sk === 'temp' && tk === 'boil' ? 'Boiling removed the temporary hardness.' : sk === 'perm' && tk === 'boil' ? 'Boiling did not remove permanent hardness.' : tk === 'soda' && SAM[sk][1] > 1 ? 'Washing soda removed the Ca²⁺ ions as calcium carbonate.' : tk === 'ion' && SAM[sk][1] > 1 ? 'The ion exchanger swapped Ca²⁺ for Na⁺.' : 'The harder the water, the more soap it needs.');
      });
    }
  };

  /* ---------- weighing moles ---------- */
  S.moles = {
    title: 'Weighing out a mole', subject: 'chem',
    aim: 'To use molar mass to weigh out a given number of moles of a substance, and to count the particles in it.',
    steps: ['Read the task: the substance and the number of moles to weigh out.', 'Work out the mass needed: mass = moles × molar mass.', 'Drag the large spatula (about 5 g) or the small spatula (about 0.5 g) from the jar to the dish on the balance. Use “Remove a little” if you add too much.', 'Press “Check my mass” when the balance shows your target.'],
    init(ui) {
      const c = ui.ctx, SUB = [['Sodium chloride', 'NaCl', 58.5, '#F4F4F0'], ['Calcium carbonate', 'CaCO3', 100, '#EDEBE4'], ['Sodium hydroxide', 'NaOH', 40, '#F7F7F7'], ['Magnesium ribbon', 'Mg', 24, '#C9D2D6'], ['Copper(II) sulphate crystals', 'CuSO4·5H2O', 249.5, '#3F7FD8'], ['Carbon (charcoal)', 'C', 12, '#2A2A2A']];
      let k = 0, n = .2, m = 0, ok = null;
      const rT = ui.read('Task'), rM = ui.read('Balance'), rN = ui.read('Moles in the dish'), rP = ui.read('Particles');
      const task = () => { const opts = [.05, .1, .2, .25, .5].filter(x => x * SUB[k][2] <= 30 && x * SUB[k][2] >= 2); n = opts[Math.floor(Math.random() * opts.length)]; m = 0; ok = null; ui.say('Weigh out <b>' + n + ' mol</b> of ' + SUB[k][0].toLowerCase() + '.'); };
      ui.select('Substance', SUB.map((s, i) => [i, s[0]]), v => { k = +v; task(); });
      ui.button('Check my mass', () => { const tgt = n * SUB[k][2]; ok = Math.abs(m - tgt) / tgt < .03; ui.say(ok ? '<b>Well done.</b> ' + m.toFixed(2) + ' g is ' + (m / SUB[k][2]).toFixed(3) + ' mol.' : 'Not quite. You need ' + n + ' × ' + SUB[k][2] + ' = ' + tgt.toFixed(2) + ' g; you have ' + m.toFixed(2) + ' g.'); }, 'btn-main');
      ui.button('Remove a little', () => { m = Math.max(0, m - .5); ok = null; }); ui.button('New task', task);
      const BX = 470, JX = 150;
      const sp = [[5, 'Large spatula', 120, 80], [.5, 'Small spatula', 120, 60]].map((q, i) => ui.thing({ x: 300, y: 230 + i * 70, w: q[2], h: 30, q, onDrop(o) { if (Math.abs(o.x - BX) < 90 && o.y < 330) { m += q[0] * (.9 + Math.random() * .2); ok = null; } o.home(); } }));
      task();
      ui.loop(() => {
        d.bg(c, ui.W, ui.H, BY); const s = SUB[k];
        // jar
        c.fillStyle = 'rgba(200,236,240,.15)'; d.rr(c, JX - 60, 200, 120, 180, 12); c.fill(); c.strokeStyle = C.glass; c.lineWidth = 2; d.rr(c, JX - 60, 200, 120, 180, 12); c.stroke();
        c.fillStyle = s[3]; d.rr(c, JX - 54, 280, 108, 94, 8); c.fill(); c.fillStyle = 'rgba(244,250,249,.95)'; d.rr(c, JX - 48, 220, 96, 44, 5); c.fill(); d.chem(c, sub(s[1]), JX, 236, 14, '#10383F'); d.txt(c, 'M = ' + s[2] + ' g/mol', JX, 254, { size: 10, color: '#10383F', bold: true });
        // balance and dish
        c.fillStyle = '#5B6B72'; d.rr(c, BX - 100, 300, 200, 80, 10); c.fill(); c.fillStyle = C.steel; d.rr(c, BX - 80, 282, 160, 14, 5); c.fill(); c.fillStyle = '#0B2A30'; d.rr(c, BX - 70, 318, 140, 44, 6); c.fill(); d.txt(c, m.toFixed(2) + ' g', BX, 341, { size: 22, bold: true, color: C.green });
        c.fillStyle = 'rgba(244,250,249,.92)'; c.beginPath(); c.ellipse(BX, 276, 60, 10, 0, 0, 7); c.fill(); if (m > 0) { c.fillStyle = s[3]; c.beginPath(); c.ellipse(BX, 272, Math.min(50, 10 + m * 2), Math.min(10, 2 + m * .3), 0, 0, 7); c.fill(); }
        sp.forEach(o => { d.line(c, o.x - o.q[2] / 2, o.y, o.x + o.q[2] / 2, o.y, C.steel, 5); c.fillStyle = C.steel; c.beginPath(); c.ellipse(o.x - o.q[2] / 2, o.y, o.q[0] > 1 ? 16 : 8, o.q[0] > 1 ? 9 : 5, 0, 0, 7); c.fill(); if (o.x === o.hx) d.txt(c, o.q[1] + ' (drag)', o.x + 10, o.y + 20, { size: 11, color: C.dim }); });
        c.fillStyle = 'rgba(8,30,35,.6)'; d.rr(c, 590, 60, 150, 150, 10); c.fill(); d.txt(c, 'Your target', 665, 82, { size: 12, color: C.dim }); d.txt(c, n + ' mol', 665, 118, { size: 26, bold: true, color: C.amber }); d.chem(c, sub(s[1]), 665, 160, 16);
        if (ok !== null) d.txt(c, ok ? '✓' : '✗', 665, 192, { size: 22, bold: true, color: ok ? C.green : C.red });
        const mol = m / s[2]; rT(n + ' mol of ' + s[0].toLowerCase()); rM(m.toFixed(2) + ' g'); rN(m.toFixed(2) + ' ÷ ' + s[2] + ' = ' + mol.toFixed(3) + ' mol'); rP(mol > 0 ? mol.toFixed(3) + ' × 6.02 × 10²³ = ' + (mol * 6.02).toFixed(2) + ' × 10²³ ' + (s[1] === 'Mg' || s[1] === 'C' ? 'atoms' : 'formula units') : '–');
      });
    }
  };

  /* ---------- electrolysis ---------- */
  S.electrolysis = {
    title: 'Electrolysis of solutions and melts', subject: 'chem',
    aim: 'To identify the products at each electrode and to use Faraday’s laws to calculate the amounts formed.',
    steps: ['Choose an electrolyte and its electrodes.', 'Set the current and click the switch to start. Time runs 30 times faster than real life.', 'Watch each electrode and read what forms there.', 'Use Q = I t and 1 faraday = 96 500 C to check the amounts, then compare with the readings.'],
    init(ui) {
      const c = ui.ctx, Fd = 96500;
      const SET = {
        acid: ['Dilute sulphuric acid, platinum electrodes', 'rgba(210,230,245,.35)', ['Hydrogen gas', '2H⁺ + 2e⁻ → H₂', 'g', 2, 'H₂'], ['Oxygen gas', '4OH⁻ → 2H₂O + O₂ + 4e⁻', 'g', 4, 'O₂']],
        cuc: ['Copper(II) sulphate, carbon electrodes', 'rgba(70,140,230,.6)', ['Copper metal', 'Cu²⁺ + 2e⁻ → Cu', 'cu', 2, 'Cu'], ['Oxygen gas', '4OH⁻ → 2H₂O + O₂ + 4e⁻', 'g', 4, 'O₂']],
        cucu: ['Copper(II) sulphate, copper electrodes', 'rgba(70,140,230,.6)', ['Copper metal', 'Cu²⁺ + 2e⁻ → Cu', 'cu', 2, 'Cu'], ['Copper dissolves', 'Cu → Cu²⁺ + 2e⁻', 'dis', 2, 'Cu']],
        brine: ['Concentrated sodium chloride (brine), carbon electrodes', 'rgba(225,235,240,.35)', ['Hydrogen gas', '2H⁺ + 2e⁻ → H₂', 'g', 2, 'H₂'], ['Chlorine gas', '2Cl⁻ → Cl₂ + 2e⁻', 'cl', 2, 'Cl₂']],
        pbbr: ['Molten lead(II) bromide, carbon electrodes', 'rgba(250,240,200,.5)', ['Lead metal', 'Pb²⁺ + 2e⁻ → Pb', 'pb', 2, 'Pb'], ['Bromine vapour', '2Br⁻ → Br₂ + 2e⁻', 'br', 2, 'Br₂']]
      };
      let k = 'acid', I = 1, on = false, t = 0, bub = [];
      const rQ = ui.read('Charge passed, Q = I t'), rK = ui.read('Cathode (−)'), rA = ui.read('Anode (+)'), rN = ui.read('Note');
      ui.select('Electrolyte', Object.keys(SET).map(x => [x, SET[x][0]]), v => { k = v; t = 0; on = false; bub = []; });
      ui.slider('Current', .5, 3, .25, I, 'A', v => { I = v; });
      ui.button('Start again', () => { t = 0; on = false; bub = []; });
      ui.thing({ x: 380, y: 50, w: 90, h: 50, drag: false, onClick() { on = !on; ui.say(on ? 'Current flowing.' : 'Switched off.'); } });
      ui.say('Click the switch to pass a current.');
      ui.loop((dt, tt) => {
        d.bg(c, ui.W, ui.H, BY); const s = SET[k]; if (on) t += dt * 30;
        const Q = I * t, ne = Q / Fd, CX = 280, AX = 480, sol = s[1];
        if (k === 'pbbr') { d.burner(c, 380, BY, .9); d.flame(c, 380, 276, 1, tt, .4); d.tripod(c, 380, BY, 220, 110); }
        const by = k === 'pbbr' ? 270 : BY, cu = s[1].includes('70,140') ? clamp(1 - (k === 'cuc' ? ne * 8 : 0), .25, 1) : 1;
        d.beaker(c, 380, by, 320, 170, .8, k === 'cuc' ? 'rgba(70,140,230,' + (.6 * cu) + ')' : sol);
        const elec = (x, kind, amt) => { const bw = kind === 'dis' ? Math.max(4, 14 - amt * 1500) : 14; c.fillStyle = k === 'cucu' ? '#C7773E' : k === 'acid' ? '#D9DDE0' : '#3A3F44'; c.fillRect(x - bw / 2, 80, bw, by - 110); if (kind === 'cu') { const w = 14 + Math.min(10, amt * 1500); c.fillStyle = '#C7773E'; c.fillRect(x - w / 2, by - 140, w, 110); } if (kind === 'pb') { const w = 14 + Math.min(16, amt * 1500); c.fillStyle = '#9AA3AA'; d.rr(c, x - w / 2, by - 50, w, 18, 6); c.fill(); } };
        elec(CX, s[2][2], ne / s[2][3]); elec(AX, s[3][2], ne / s[3][3]);
        // gas collection tubes
        const vol = (side) => side[2] === 'g' || side[2] === 'cl' ? ne / side[3] * 24000 * (side[2] === 'cl' ? .7 : 1) : 0;
        [[CX, s[2]], [AX, s[3]]].forEach(q => { const v = vol(q[1]); if (q[1][2] === 'g' || q[1][2] === 'cl') { c.strokeStyle = C.glass; c.lineWidth = 2; c.strokeRect(q[0] - 22, 100, 44, by - 150); const h = Math.min(by - 152, v * 1.6); c.fillStyle = q[1][2] === 'cl' ? 'rgba(190,230,120,.55)' : 'rgba(255,255,255,.18)'; c.fillRect(q[0] - 21, 101, 42, h); d.txt(c, v.toFixed(0) + ' cm³', q[0] + 28, 116, { size: 12, bold: true, align: 'left' }); if (on && Math.random() < I * .6) bub.push({ x: q[0] - 6 + Math.random() * 12, y: by - 45 }); } });
        if (s[3][2] === 'br' && on) { c.fillStyle = 'rgba(160,60,20,' + Math.min(.6, ne * 300) + ')'; c.beginPath(); c.ellipse(AX, by - 180, 40, 22 + Math.sin(tt * 2) * 3, 0, 0, 7); c.fill(); }
        bub = bub.filter(b => { b.y -= 80 * dt; d.dot(c, b.x, b.y, 2.5, 'rgba(255,255,255,.8)'); return b.y > 110; });
        // circuit
        d.line(c, CX, 80, CX, 50, C.dim, 2); d.line(c, AX, 80, AX, 50, C.dim, 2); d.line(c, CX, 50, 340, 50, C.dim, 2); d.line(c, 420, 50, AX, 50, C.dim, 2);
        c.fillStyle = on ? C.green : C.red; d.rr(c, 350, 36, 60, 28, 6); c.fill(); d.txt(c, on ? 'ON' : 'OFF', 380, 50, { size: 12, bold: true, color: '#0B2A30' }); d.txt(c, 'Switch (click)', 380, 24, { size: 11, color: C.dim });
        d.txt(c, 'cathode −', CX, by + 16 > 400 ? 398 : by + 16, { size: 11, color: C.blue, bold: true }); d.txt(c, 'anode +', AX, by + 16 > 400 ? 398 : by + 16, { size: 11, color: C.pink, bold: true });
        d.txt(c, I + ' A, time ' + (t / 60).toFixed(1) + ' min', 640, 340, { size: 12, color: C.dim });
        const amt = (side) => side[2] === 'g' || side[2] === 'cl' ? (ne / side[3] * 24000).toFixed(0) + ' cm³ of ' + side[4] + (side[2] === 'cl' ? ' (some dissolves, so you collect less)' : '') : side[2] === 'cu' ? (ne / 2 * 63.5).toFixed(3) + ' g of copper deposited' : side[2] === 'pb' ? (ne / 2 * 207).toFixed(3) + ' g of lead' : side[2] === 'dis' ? (ne / 2 * 63.5).toFixed(3) + ' g of copper lost' : 'brown bromine vapour';
        rQ(I + ' × ' + t.toFixed(0) + ' s = ' + Q.toFixed(0) + ' C = ' + ne.toFixed(4) + ' mol of electrons');
        rK(s[2][0] + '. ' + s[2][1] + '<br>' + amt(s[2])); rA(s[3][0] + '. ' + s[3][1] + '<br>' + amt(s[3]));
        rN(k === 'acid' ? 'Hydrogen and oxygen form in a 2 : 1 volume ratio: water is being electrolysed.' : k === 'cuc' ? 'The blue colour fades as Cu²⁺ ions are removed from the solution.' : k === 'cucu' ? 'Copper moves from anode to cathode, so the blue colour stays the same. This is how copper is purified.' : k === 'brine' ? 'The solution left behind becomes sodium hydroxide: it turns red litmus blue.' : 'Solid lead bromide does not conduct; its ions are only free to move when it is molten.');
      });
    }
  };

  /* ---------- rates of reaction ---------- */
  S.rates = {
    title: 'Rate of reaction with a gas syringe', subject: 'chem',
    aim: 'To investigate how temperature, concentration, surface area and a catalyst affect the rate of a reaction.',
    steps: ['Choose the reaction and set the conditions.', 'Drag the solid (marble or catalyst) into the flask to start the reaction. Gas collects in the syringe.', 'Watch the graph of volume against time. A steeper start means a faster rate.', 'Change one condition at a time and run again. Earlier runs stay on the graph for comparison.'],
    init(ui) {
      const c = ui.ctx; let rx = 'marble', T = 25, cc = 1, size = 'chips', cat = true, run = false, t = 0, pts = [], runs = [];
      const AREA = { lumps: [1, 'large lumps'], chips: [2.5, 'small chips'], powder: [7, 'powder'] };
      const rV = ui.read('Gas collected'), rR = ui.read('Average rate in the first 20 s'), rN = ui.read('Why');
      const sel = (lab, opts, cb, val) => { const s = ui.select(lab, opts, cb); if (val) s.value = val; return s; };
      sel('Reaction', [['marble', 'Marble chips + hydrochloric acid'], ['h2o2', 'Hydrogen peroxide decomposing']], v => { rx = v; stop(); });
      ui.slider('Temperature', 20, 60, 5, T, '°C', v => { T = v; stop(); }); ui.slider('Concentration of acid or peroxide', .5, 2, .25, cc, 'mol/dm³', v => { cc = v; stop(); });
      sel('Marble size', [['lumps', 'Large lumps'], ['chips', 'Small chips'], ['powder', 'Powder']], v => { size = v; stop(); }, 'chips');
      sel('Catalyst (peroxide only)', [['1', 'Manganese(IV) oxide added'], ['0', 'No catalyst']], v => { cat = v === '1'; stop(); });
      ui.button('Clear the graph', () => { runs = []; pts = []; stop(); });
      const stop = () => { if (pts.length > 2) runs.push(pts); run = false; t = 0; pts = []; sol.home(); sol.off = false; };
      const sol = ui.thing({ x: 110, y: 330, w: 60, h: 50, onDrop(o) { if (Math.abs(o.x - 260) < 70 && o.y < 340) { o.off = true; run = true; t = 0; pts = [[0, 0]]; ui.say('Reaction started.'); } else o.home(); } });
      ui.say('Drag the solid into the flask to start.');
      ui.loop((dt, tt) => {
        d.bg(c, ui.W, ui.H, BY); const f2 = Math.pow(2, (T - 20) / 10);
        const Vmax = rx === 'marble' ? 60 : Math.min(95, 40 * cc), k = rx === 'marble' ? .012 * cc * AREA[size][0] * f2 : (cat ? .05 : .0015) * f2;
        if (run) { t += dt * 4; pts.push([t, Vmax * (1 - Math.exp(-k * t))]); if (t >= 120) { run = false; ui.say('Run finished. Change one condition and run again.'); } }
        const V = pts.length ? pts[pts.length - 1][1] : 0;
        d.flask(c, 260, BY, 130, 140, .35, rx === 'marble' ? 'rgba(210,230,245,.35)' : 'rgba(230,240,250,.3)');
        if (run || V > 0) { if (rx === 'marble') { const n = size === 'powder' ? 0 : size === 'chips' ? 9 : 3, r0 = size === 'chips' ? 7 : 13; for (let i = 0; i < n; i++) { c.fillStyle = '#EDEBE4'; d.rr(c, 222 + (i % 5) * 16, 356 - Math.floor(i / 5) * 12, r0 * Math.max(.2, 1 - V / Vmax), r0 * .8 * Math.max(.2, 1 - V / Vmax), 3); c.fill(); } if (size === 'powder') { c.fillStyle = 'rgba(237,235,228,' + Math.max(.1, 1 - V / Vmax) + ')'; c.fillRect(215, 368, 90, 8); } } else { c.fillStyle = '#2A2A2A'; c.fillRect(240, 368, 40, 6); }
          const rate = Vmax * k * Math.exp(-k * t); for (let i = 0; i < Math.min(14, rate * 10); i++) d.dot(c, 230 + ((i * 37 + tt * 60) % 60), 370 - ((tt * 80 + i * 23) % 60), 2.5, 'rgba(255,255,255,.75)'); }
        // bung, tube and syringe
        c.fillStyle = '#5B4636'; c.fillRect(248, 228, 24, 16); d.line(c, 260, 228, 260, 200, C.glass, 4); d.line(c, 260, 200, 380, 200, C.glass, 4);
        c.strokeStyle = C.glass; c.lineWidth = 2; c.strokeRect(380, 186, 250, 28); for (let i = 0; i <= 100; i += 10) { d.line(c, 384 + i * 2.4, 214, 384 + i * 2.4, i % 50 ? 206 : 202, C.glass, 1); if (i % 20 === 0) d.txt(c, String(i), 384 + i * 2.4, 224, { size: 9, color: C.dim }); }
        c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(381, 187, V * 2.4, 26); d.line(c, 384 + V * 2.4, 188, 384 + V * 2.4, 212, C.steel, 5); d.line(c, 384 + V * 2.4, 200, 660 + V * 1.2, 200, C.steel, 3);
        d.txt(c, 'Gas syringe (cm³)', 505, 172, { size: 11, color: C.dim });
        if (!sol.off) { if (rx === 'marble') { for (let i = 0; i < 4; i++) { c.fillStyle = '#EDEBE4'; d.rr(c, sol.x - 20 + (i % 2) * 18, sol.y - 12 + Math.floor(i / 2) * 14, 14, 11, 3); c.fill(); } d.txt(c, 'Marble (' + AREA[size][1] + ')', sol.x, sol.y + 32, { size: 11, color: C.dim }); } else { c.fillStyle = '#2A2A2A'; d.rr(c, sol.x - 18, sol.y - 8, 36, 16, 4); c.fill(); d.txt(c, cat ? 'MnO₂ catalyst' : 'Start (no catalyst)', sol.x, sol.y + 26, { size: 11, color: C.dim }); } }
        d.graph(c, 430, 250, 280, 120, { xmax: 120, ymax: 100, xl: 'Time (s)', yl: 'Volume (cm³)', pts: [] });
        [...runs, pts].forEach((p, i, a) => { c.strokeStyle = i === a.length - 1 ? C.amber : 'rgba(245,165,36,.3)'; c.lineWidth = 2; c.beginPath(); p.forEach((q, j) => { const X = 430 + q[0] / 120 * 280, Y = 370 - q[1] / 100 * 120; j ? c.lineTo(X, Y) : c.moveTo(X, Y); }); c.stroke(); });
        const v20 = Vmax * (1 - Math.exp(-k * 20));
        rV(V.toFixed(1) + ' cm³ after ' + t.toFixed(0) + ' s'); rR(t >= 20 ? (v20 / 20).toFixed(2) + ' cm³/s' : 'Wait for 20 s');
        rN(rx === 'marble' ? 'Higher temperature, stronger acid and smaller pieces all give more successful collisions per second. The final volume stays the same because the same mass of marble is used.' : cat ? 'MnO₂ gives the reaction a route with lower activation energy. It is not used up.' : 'Without a catalyst, hydrogen peroxide decomposes very slowly. Its final volume depends on the concentration.');
      });
    }
  };

  /* ---------- action of heat on compounds ---------- */
  const HEAT = {
    cuco3: ['Copper(II) carbonate', 'CuCO3', '#3FA06A', '#1E1E1E', null, ['CO2'], 'CuCO₃ → CuO + CO₂', 'Green powder turns black.'],
    znco3: ['Zinc carbonate', 'ZnCO3', '#F2F2EE', '#F2F2EE', '#F2D24A', ['CO2'], 'ZnCO₃ → ZnO + CO₂', 'White powder turns yellow when hot and white again when cold: zinc oxide.'],
    na2co3: ['Sodium carbonate (anhydrous)', 'Na2CO3', '#F7F7F7', '#F7F7F7', null, [], 'No decomposition', 'No change: Group I carbonates are stable to heat.'],
    cuoh: ['Copper(II) hydroxide', 'Cu(OH)2', '#6FA8DC', '#1E1E1E', null, ['H2O'], 'Cu(OH)₂ → CuO + H₂O', 'Blue solid turns black; droplets of water form higher up the tube.'],
    cuno3: ['Copper(II) nitrate', 'Cu(NO3)2', '#2F7FC1', '#1E1E1E', null, ['NO2', 'O2'], '2Cu(NO₃)₂ → 2CuO + 4NO₂ + O₂', 'Blue crystals melt, brown fumes are given off and a black residue is left.'],
    nano3: ['Sodium nitrate', 'NaNO3', '#F7F7F7', '#F2F2EE', null, ['O2'], '2NaNO₃ → 2NaNO₂ + O₂', 'White crystals melt; a colourless gas is given off.'],
    pbno3: ['Lead(II) nitrate', 'Pb(NO3)2', '#F7F7F7', '#F2D24A', '#D2691E', ['NO2', 'O2'], '2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂', 'Crystals crackle (decrepitate); brown fumes; residue orange-red when hot, yellow when cold.'],
    cuso4: ['Copper(II) sulphate crystals', 'CuSO4·5H2O', '#2F7FC1', '#F2F2EE', null, ['H2O'], 'CuSO₄·5H₂O → CuSO₄ + 5H₂O', 'Blue crystals turn to a white powder; water droplets condense higher up.'],
    feso4: ['Iron(II) sulphate crystals', 'FeSO4·7H2O', '#9FD08A', '#8B2E14', null, ['H2O', 'SO2'], '2FeSO₄ → Fe₂O₃ + SO₂ + SO₃', 'Green crystals turn white, then a red-brown residue forms; steamy, choking fumes.'],
    nh4cl: ['Ammonium chloride', 'NH4Cl', '#F7F7F7', null, null, ['NH3', 'HCl'], 'NH₄Cl ⇌ NH₃ + HCl', 'The white solid disappears from the bottom and forms a white ring on the cooler part of the tube (sublimation).']
  };
  S.heatsalts = {
    title: 'Action of heat on compounds of metals', subject: 'chem',
    aim: 'To observe what happens when metal carbonates, hydroxides, nitrates and sulphates are heated, and to test the gases given off.',
    steps: ['Choose a compound and click the burner to heat it.', 'Note any colour change of the residue when hot and when cold.', 'Drag the test papers and splint to the mouth of the tube, or click the limewater tube to bubble the gas through it.', 'Read the observation table and write the equation.'],
    init(ui) {
      const c = ui.ctx, X = 300; let k = 'cuco3', on = false, p = 0, rows = [], lime = 0, limeOn = false;
      const rL = ui.read('Observations'), rE = ui.read('Equation');
      const fresh = () => { on = false; p = 0; rows = []; lime = 0; limeOn = false; ui.say('Click the burner to heat the compound.'); };
      ui.select('Compound', Object.keys(HEAT).map(x => [x, HEAT[x][0]]), v => { k = v; fresh(); }); ui.button('Fresh sample', fresh);
      ui.thing({ x: X, y: 330, w: 80, h: 100, drag: false, onClick() { on = !on; } });
      ui.thing({ x: 560, y: 315, w: 60, h: 130, drag: false, onClick() { limeOn = !limeOn; } });
      const has = g => HEAT[k][5].includes(g), gasOut = () => p > .05 && (p < 1 || on);
      const add = (e, o, i) => { if (!rows.some(r => r[0] === e && r[1] === o)) rows.push([e, o, i]); };
      const TOOLS = [['Glowing splint', '#E8D2A6', () => has('O2') && gasOut() ? ['It relights', 'Oxygen is given off'] : ['It does not relight', 'No oxygen detected']],
        ['Damp blue litmus', '#3F6FD8', () => gasOut() && (has('NO2') || has('SO2') || has('HCl') || has('CO2')) ? ['Turns red', 'An acidic gas is given off'] : ['No change', 'No acidic gas detected']],
        ['Damp red litmus', '#E24D62', () => gasOut() && has('NH3') ? ['Turns blue (then red as HCl reaches it)', 'Ammonia is given off'] : ['No change', 'No alkaline gas detected']],
        ['Acidified K₂Cr₂O₇ paper', '#F5A524', () => gasOut() && has('SO2') ? ['Orange turns green', 'Sulphur dioxide is given off'] : ['Stays orange', 'No SO₂ detected']],
        ['Anhydrous CuSO₄', '#F2F2EE', () => gasOut() && has('H2O') ? ['White powder turns blue', 'Water is given off'] : ['Stays white', 'No water detected']]];
      const tools = TOOLS.map((q, i) => ui.thing({ x: 90, y: 60 + i * 56, w: 120, h: 40, q, onDrop(o) { if (Math.abs(o.x - X) < 70 && Math.abs(o.y - 80) < 60) { const r = q[2](); add(q[0] + ' at the mouth', r[0], r[1]); o.res = r[0]; } else o.res = null; o.home(); } }));
      fresh();
      ui.loop((dt, tt) => {
        d.bg(c, ui.W, ui.H, BY); const h = HEAT[k]; if (on) p = Math.min(1, p + dt / 6);
        d.burner(c, X, BY, .9); if (on) d.flame(c, X, 276, 1, tt, .55); d.stand(c, X - 60, BY, 300, 70);
        d.tube(c, X, 270, 30, 190, 0, null);
        const hot = on && p > .1, col = h[3] === null ? h[2] : p < .5 ? h[2] : hot && h[4] ? h[4] : h[3];
        if (k === 'nh4cl') { c.fillStyle = h[2]; c.globalAlpha = 1 - p; c.fillRect(X - 13, 248, 26, 18); c.globalAlpha = 1; if (p > .2) { c.fillStyle = 'rgba(255,255,255,' + Math.min(.9, p) + ')'; c.fillRect(X - 14, 140, 28, 10); } }
        else { c.fillStyle = col; c.beginPath(); c.moveTo(X - 13, 245); c.lineTo(X + 13, 245); c.lineTo(X + 13, 254); c.arc(X, 254, 13, 0, Math.PI); c.closePath(); c.fill(); }
        if (gasOut() && on) { if (has('NO2')) { c.fillStyle = 'rgba(150,60,20,' + (.25 + .3 * Math.sin(p * 3)) + ')'; c.fillRect(X - 14, 110, 28, 130); } if (has('H2O') && p > .3) for (let i = 0; i < 8; i++) d.dot(c, X - 10 + (i * 7) % 20, 130 + (i * 11) % 30, 2, 'rgba(220,240,255,.9)'); if (has('SO2') || has('HCl')) { c.fillStyle = 'rgba(240,240,240,.18)'; c.fillRect(X - 14, 100, 28, 140); }
          if (k === 'pbno3' && p < .6) for (let i = 0; i < 4; i++) d.dot(c, X - 8 + Math.random() * 16, 240 - Math.random() * 20, 2, '#fff'); }
        // limewater via delivery tube
        c.strokeStyle = C.glass; c.lineWidth = 3; if (limeOn) { c.beginPath(); c.moveTo(X, 90); c.lineTo(X, 70); c.lineTo(560, 70); c.lineTo(560, 340); c.stroke(); }
        if (limeOn && gasOut() && on && has('CO2')) lime = Math.min(1, lime + dt * .4);
        d.tube(c, 560, 380, 34, 130, .6, 'rgba(' + (230 - 10 * lime) + ',' + (240 - 10 * lime) + ',245,' + (.3 + .6 * lime) + ')'); d.txt(c, limeOn ? 'Limewater (click to disconnect)' : 'Limewater (click to connect)', 560, 404, { size: 11, color: C.dim });
        if (limeOn && on && gasOut() && h[5].length) for (let i = 0; i < 4; i++) d.dot(c, 556 + (i % 2) * 6, 370 - ((tt * 60 + i * 15) % 50), 2.5, 'rgba(255,255,255,.8)');
        if (limeOn && lime > .5) add('Gas bubbled into limewater', 'Limewater turns milky', 'Carbon dioxide is given off');
        if (limeOn && on && p > .6 && !has('CO2') && h[5].length) add('Gas bubbled into limewater', 'No milkiness', 'No carbon dioxide');
        tools.forEach(o => { c.fillStyle = o.q[1]; d.rr(c, o.x - 40, o.y - 9, 80, 18, 4); c.fill(); if (o.q[0] === 'Glowing splint') { d.dot(c, o.x - 40, o.y, 4, '#FF7A3D'); } if (o.x === o.hx) d.txt(c, o.q[0], o.x, o.y + 22, { size: 10, color: C.dim }); });
        if (p > .9 && !on) add('Residue after cooling', h[3] === null ? 'Nothing left at the bottom' : 'Residue is ' + (h[3] === '#1E1E1E' ? 'black' : h[3] === '#F2D24A' ? 'yellow' : h[3] === '#8B2E14' ? 'red-brown' : 'white'), '');
        if (p > .5 && on) add('Heat the ' + h[0][0].toLowerCase() + h[0].slice(1), h[7], '');
        rL(rows.length ? log(rows) : 'Heat the compound to begin.'); rE(subH(h[1]) + ': ' + h[6]);
      });
    }
  };

  /* ---------- tests for gases ---------- */
  const GAS = {
    O2: ['Oxygen', null], H2: ['Hydrogen', null], CO2: ['Carbon dioxide', null], NH3: ['Ammonia', null], Cl2: ['Chlorine', 'rgba(190,230,120,.45)'], SO2: ['Sulphur dioxide', null], HCl: ['Hydrogen chloride', null], N2: ['Nitrogen', null]
  };
  const GT = [
    ['Glowing splint', g => g === 'O2' ? ['Relights', 'Oxygen present'] : ['Goes out', 'Not oxygen']],
    ['Burning splint', g => g === 'H2' ? ['Squeaky pop', 'Hydrogen present'] : g === 'O2' ? ['Burns more brightly', 'Supports burning'] : ['Goes out', 'Gas does not support burning']],
    ['Damp red litmus', g => g === 'NH3' ? ['Turns blue', 'Alkaline gas: ammonia'] : g === 'Cl2' ? ['Bleached white', 'Bleaching gas: chlorine'] : ['No change', 'Not alkaline']],
    ['Damp blue litmus', g => g === 'Cl2' ? ['Turns red, then white', 'Acidic bleaching gas: chlorine'] : ['CO2', 'SO2', 'HCl'].includes(g) ? ['Turns red', 'Acidic gas'] : ['No change', 'Not acidic']],
    ['Limewater', g => g === 'CO2' || g === 'SO2' ? ['Turns milky', g === 'CO2' ? 'Probably carbon dioxide' : 'CO₂ or SO₂: check with dichromate'] : ['Stays clear', 'Not CO₂']],
    ['Acidified K₂Cr₂O₇ paper', g => g === 'SO2' ? ['Orange to green', 'Sulphur dioxide present'] : ['Stays orange', 'Not SO₂']],
    ['Rod with conc. HCl', g => g === 'NH3' ? ['Dense white fumes', 'Ammonia (forms NH₄Cl)'] : ['No fumes', 'Not ammonia']],
    ['Rod with conc. NH₃', g => g === 'HCl' ? ['Dense white fumes', 'Hydrogen chloride (forms NH₄Cl)'] : g === 'Cl2' ? ['Some white fumes', 'Chlorine reacts with ammonia'] : ['No fumes', 'Not HCl']]];
  S.gastests = {
    title: 'Identifying gases', subject: 'chem',
    aim: 'To identify common gases using standard laboratory tests.',
    steps: ['Choose “Unknown gas” to be given a mystery gas jar, or pick a named gas to practise.', 'Drag a test to the mouth of the gas jar and let go. Watch what happens.', 'Use several tests. The observation table builds up as you go.', 'Choose your answer and press “Check my answer”.'],
    init(ui) {
      const c = ui.ctx, X = 380; let g = 'CO2', unknown = true, rows = [], flash = null, ans = 'O2';
      const rL = ui.read('Observations'), rA = ui.read('Answer');
      const newGas = () => { const ks = Object.keys(GAS); g = ks[Math.floor(Math.random() * ks.length)]; rows = []; rA('–'); ui.say('Here is a jar of an unknown gas. Test it.'); };
      ui.select('Gas jar', [['?', 'Unknown gas'], ...Object.keys(GAS).map(k => [k, GAS[k][0]])], v => { unknown = v === '?'; if (unknown) newGas(); else { g = v; rows = []; rA('–'); ui.say('Test the ' + GAS[g][0].toLowerCase() + '.'); } });
      ui.select('My answer', Object.keys(GAS).map(k => [k, GAS[k][0]]), v => { ans = v; });
      ui.button('Check my answer', () => rA(ans === g ? '<b>Correct:</b> ' + GAS[g][0].toLowerCase() + '.' : 'Not quite. Look again at your observations' + (rows.length < 3 ? ' and try more tests' : '') + '.'), 'btn-main');
      ui.button('New unknown gas', () => newGas());
      const tools = GT.map((q, i) => ui.thing({ x: 70 + (i % 2) * 140, y: 70 + Math.floor(i / 2) * 80, w: 100, h: 50, q, onDrop(o) { if (Math.abs(o.x - X) < 80 && o.y > 40 && o.y < 200) { const r = q[1](g); if (!rows.find(x => x[0] === q[0])) rows.push([q[0], r[0], r[1]]); flash = { r: r[0], t: 1.6, i }; ui.say(q[0] + ': ' + r[0] + '.'); } o.home(); } }));
      newGas();
      ui.loop((dt, tt) => {
        d.bg(c, ui.W, ui.H, BY);
        const col = GAS[g][1]; c.fillStyle = col || 'rgba(225,240,245,.08)'; c.fillRect(X - 50, 150, 100, 228); c.strokeStyle = C.glass; c.lineWidth = 2.5; c.beginPath(); c.moveTo(X - 52, 140); c.lineTo(X - 52, 372); c.quadraticCurveTo(X - 52, 380, X - 44, 380); c.lineTo(X + 44, 380); c.quadraticCurveTo(X + 52, 380, X + 52, 372); c.lineTo(X + 52, 140); c.stroke();
        c.fillStyle = 'rgba(244,250,249,.5)'; c.fillRect(X - 60, 136, 34, 5); d.txt(c, unknown ? 'Gas ?' : GAS[g][0], X, 260, { size: 16, bold: true, color: C.dim });
        if (g === 'HCl') d.txt(c, 'steamy fumes in moist air', X, 120, { size: 10, color: C.dim });
        if (flash) { flash.t -= dt; const r = flash.r; if (/fumes/.test(r) && !/No/.test(r)) for (let i = 0; i < 18; i++) d.dot(c, X - 30 + (i * 17) % 60, 130 - ((tt * 40 + i * 9) % 60), 6, 'rgba(255,255,255,.35)');
          if (/pop/i.test(r)) d.txt(c, 'POP!', X, 100, { size: 26, bold: true, color: C.amber }); if (/Relights|brightly/.test(r)) d.flame(c, X, 140, 0, tt, .35);
          d.txt(c, r, X, 76, { size: 14, bold: true, color: C.amber }); if (flash.t <= 0) flash = null; }
        tools.forEach(o => { const n = o.q[0]; if (/splint/.test(n)) { d.line(c, o.x - 40, o.y, o.x + 40, o.y, '#E8D2A6', 4); if (/Burning/.test(n)) d.flame(c, o.x - 40, o.y, 0, tt + o.x, .18); else d.dot(c, o.x - 40, o.y, 4, '#FF7A3D'); }
          else if (/litmus/.test(n)) { c.fillStyle = /red/.test(n) ? '#F08A9A' : '#7FA2EE'; c.fillRect(o.x - 30, o.y - 10, 60, 20); }
          else if (n === 'Limewater') d.tube(c, o.x, o.y + 18, 20, 44, .6, 'rgba(225,240,245,.4)');
          else if (/K₂Cr₂O₇/.test(n)) { c.fillStyle = '#F5A524'; c.fillRect(o.x - 30, o.y - 10, 60, 20); }
          else { d.line(c, o.x - 40, o.y, o.x + 40, o.y, C.glass, 4); d.dot(c, o.x - 40, o.y, 4, 'rgba(255,255,255,.7)'); }
          if (o.x === o.hx) d.txt(c, n, o.x, o.y + 28, { size: 10, color: C.dim }); });
        c.fillStyle = 'rgba(8,30,35,.6)'; d.rr(c, 500, 40, 240, 330, 10); c.fill(); d.txt(c, 'Tests done', 620, 60, { size: 12, color: C.dim });
        rows.forEach((r, i) => { d.txt(c, r[0], 512, 88 + i * 36, { size: 11, align: 'left', color: C.dim }); d.txt(c, r[1], 512, 104 + i * 36, { size: 12, align: 'left', bold: true }); });
        rL(rows.length ? log(rows) : 'Drag a test to the gas jar.');
      });
    }
  };

  /* ---------- organic molecule builder ---------- */
  const PRE = ['meth', 'eth', 'prop', 'but', 'pent', 'hex'];
  S.organic = {
    title: 'Homologous series: build and test', subject: 'chem',
    aim: 'To draw the structures of members of five homologous series, name them, and tell them apart with simple tests.',
    steps: ['Choose a homologous series and the number of carbon atoms.', 'Study the displayed formula, name, molecular formula and general formula.', 'Drag bromine water, sodium carbonate solution or acidified potassium dichromate onto the test tube.', 'Compare the results for an alkane, an alkene, an alcohol and an acid.'],
    init(ui) {
      const c = ui.ctx; let ser = 'alkene', n = 2, res = null;
      const SER = { alkane: ['Alkanes', 'CₙH₂ₙ₊₂', 1], alkene: ['Alkenes', 'CₙH₂ₙ', 2], alkyne: ['Alkynes', 'CₙH₂ₙ₋₂', 2], alcohol: ['Alcohols', 'CₙH₂ₙ₊₁OH', 1], acid: ['Carboxylic acids', 'Cₙ₋₁H₂ₙ₋₁COOH', 1] };
      const rN = ui.read('Name'), rF = ui.read('Molecular formula'), rG = ui.read('General formula and state'), rT = ui.read('Test result');
      const sl = ui.slider('Number of carbon atoms', 1, 6, 1, n, '', v => { n = Math.max(v, SER[ser][2]); if (n !== v) sl.set(n); res = null; });
      ui.select('Homologous series', Object.keys(SER).map(k => [k, SER[k][0]]), v => { ser = v; n = Math.max(n, SER[ser][2]); sl.set(n); res = null; }).value = 'alkene';
      const name = () => { const p = PRE[n - 1]; if (ser === 'alkane') return p + 'ane'; if (ser === 'alkene') return n < 4 ? p + 'ene' : p + '-1-ene'; if (ser === 'alkyne') return n < 4 ? p + 'yne' : p + '-1-yne'; if (ser === 'alcohol') return n < 3 ? p + 'anol' : p + 'an-1-ol'; return p + 'anoic acid'; };
      const cf = (a, b) => 'C' + (a > 1 ? '_' + a : '') + 'H' + (b > 1 ? '_' + b : '');
      const mf = () => ser === 'alkane' ? cf(n, 2 * n + 2) : ser === 'alkene' ? cf(n, 2 * n) : ser === 'alkyne' ? cf(n, 2 * n - 2) : ser === 'alcohol' ? cf(n, 2 * n + 1) + 'OH' : n === 1 ? 'HCOOH' : cf(n - 1, 2 * n - 1) + 'COOH';
      const state = () => ser === 'alcohol' || ser === 'acid' ? 'liquid' : (ser === 'alkyne' ? n <= 4 : n <= 4) ? 'gas' : 'liquid';
      const TS = [['Bromine water', '#D9822B', () => ser === 'alkene' || ser === 'alkyne' ? ['Orange colour disappears quickly', 'Unsaturated: has a C=C or C≡C bond'] : ['Stays orange', 'Saturated (no C=C bond)']],
        ['Sodium carbonate solution', 'rgba(225,240,245,.8)', () => ser === 'acid' ? ['Effervescence: CO₂ turns limewater milky', 'A carboxylic acid'] : ['No fizzing', 'Not an acid']],
        ['Acidified K₂Cr₂O₇, warm', '#F5A524', () => ser === 'alcohol' ? ['Orange turns green', 'An alcohol (it is oxidised)'] : ['Stays orange', 'No alcohol present']]];
      const tools = TS.map((q, i) => ui.thing({ x: 690, y: 70 + i * 100, w: 50, h: 90, q, onDrop(o) { if (Math.abs(o.x - 560) < 60 && o.y > 230) { res = { i, r: q[2](), t: 0 }; ui.say(q[0] + ': ' + res.r[0] + '.'); } o.home(); } }));
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H, BY);
        // displayed formula
        const dx = 64, x0 = 60 + (6 - n) * dx * .4, y = 160, cx = i => x0 + i * dx; const bo = i => ser === 'alkene' && i === 0 ? 2 : ser === 'alkyne' && i === 0 ? 3 : 1;
        const H = (x, y2) => { d.txt(c, 'H', x, y2, { size: 18, bold: true, color: C.chalk }); };
        for (let i = 0; i < n - 1; i++) { const o = bo(i); for (let j = 0; j < o; j++) d.line(c, cx(i) + 12, y + (j - (o - 1) / 2) * 7, cx(i + 1) - 12, y + (j - (o - 1) / 2) * 7, C.chalk, 2); }
        for (let i = 0; i < n; i++) {
          let used = (i > 0 ? bo(i - 1) : 0) + (i < n - 1 ? bo(i) : 0); const last = i === n - 1; let rightFree = last;
          if (last && ser === 'alcohol') { used += 1; rightFree = false; d.line(c, cx(i) + 12, y, cx(i) + 42, y, C.chalk, 2); d.txt(c, 'O', cx(i) + 54, y, { size: 18, bold: true, color: C.red }); d.line(c, cx(i) + 66, y, cx(i) + 90, y, C.chalk, 2); H(cx(i) + 102, y); }
          if (last && ser === 'acid') { used += 3; rightFree = false; d.line(c, cx(i) - 4, y - 12, cx(i) - 4, y - 40, C.chalk, 2); d.line(c, cx(i) + 4, y - 12, cx(i) + 4, y - 40, C.chalk, 2); d.txt(c, 'O', cx(i), y - 52, { size: 18, bold: true, color: C.red }); d.line(c, cx(i) + 12, y, cx(i) + 42, y, C.chalk, 2); d.txt(c, 'O', cx(i) + 54, y, { size: 18, bold: true, color: C.red }); d.line(c, cx(i) + 66, y, cx(i) + 90, y, C.chalk, 2); H(cx(i) + 102, y); }
          let rem = 4 - used; const slots = []; if (i === 0) slots.push('l'); if (rightFree && i !== 0) slots.push('r'); slots.push('t', 'b'); if (rightFree && i === 0) slots.push('r');
          slots.slice(0, rem).forEach(sl2 => { if (sl2 === 'l') { d.line(c, cx(i) - 12, y, cx(i) - 34, y, C.chalk, 2); H(cx(i) - 46, y); } if (sl2 === 'r') { d.line(c, cx(i) + 12, y, cx(i) + 34, y, C.chalk, 2); H(cx(i) + 46, y); } if (sl2 === 't') { d.line(c, cx(i), y - 12, cx(i), y - 34, C.chalk, 2); H(cx(i), y - 46); } if (sl2 === 'b') { d.line(c, cx(i), y + 12, cx(i), y + 34, C.chalk, 2); H(cx(i), y + 46); } });
          d.txt(c, 'C', cx(i), y, { size: 20, bold: true, color: C.amber });
        }
        d.txt(c, name(), 290, 270, { size: 26, bold: true }); d.chem(c, mf(), 290, 304, 20, C.dim);
        // test tube
        let col = 'rgba(225,240,245,.25)'; if (res) { res.t += dt; const r = res.r[0]; if (res.i === 0) col = /disappears/.test(r) ? 'rgba(225,240,245,' + (.25 + Math.max(0, .5 - res.t * .5)) + ')' : 'rgba(217,130,43,.75)'; if (res.i === 2) col = /green/.test(r) && res.t > .6 ? 'rgba(80,170,90,.8)' : 'rgba(245,165,36,.75)'; if (res.i === 1 && /Effervescence/.test(r)) for (let k = 0; k < 6; k++) d.dot(c, 552 + (k % 3) * 8, 370 - ((res.t * 80 + k * 13) % 70), 2.5, 'rgba(255,255,255,.8)'); if (res.i === 0 && /disappears/.test(r) && res.t < 1) col = 'rgba(217,130,43,' + (.75 - res.t * .7) + ')'; }
        d.tube(c, 560, BY, 36, 140, .5, col); d.txt(c, name(), 560, 404, { size: 11, color: C.dim });
        tools.forEach(o => { d.dropper(c, o.x, o.y + 40, o.q[1]); if (o.x === o.hx) d.txt(c, o.q[0], o.x, o.y + 56, { size: 10, color: C.dim }); });
        rN(name()); rF(subH(mf().replace(/_/g, ''))); rG(SER[ser][1] + '; ' + state() + ' at room temperature'); rT(res ? TS[res.i][0] + ': ' + res.r[0] + '. <b>' + res.r[1] + '</b>' : 'Drag a test reagent onto the test tube.');
      });
    }
  };

  /* ---------- cation analysis ---------- */
  const CAT = {
    Zn: ['Zinc, Zn²⁺', null, ['#F2F2EE', 1], ['#F2F2EE', 1]], Al: ['Aluminium, Al³⁺', null, ['#F2F2EE', 1], ['#F2F2EE', 0]], Pb: ['Lead(II), Pb²⁺', null, ['#F2F2EE', 1], ['#F2F2EE', 0]],
    Ca: ['Calcium, Ca²⁺', null, ['#F2F2EE', 0, .5], null], Mg: ['Magnesium, Mg²⁺', null, ['#F2F2EE', 0], ['#F2F2EE', 0]], Cu: ['Copper(II), Cu²⁺', 'rgba(70,140,230,.45)', ['#7FB2E8', 0], ['#7FB2E8', 2]],
    Fe2: ['Iron(II), Fe²⁺', 'rgba(170,220,150,.4)', ['#5E7A3A', 0], ['#5E7A3A', 0]], Fe3: ['Iron(III), Fe³⁺', 'rgba(210,160,60,.45)', ['#8B3A14', 0], ['#8B3A14', 0]], NH4: ['Ammonium, NH₄⁺', null, null, null]
  };
  S.qualanalysis = {
    title: 'Identifying cations with sodium hydroxide and ammonia', subject: 'chem',
    aim: 'To identify the cation in an unknown salt solution from its reactions with sodium hydroxide and ammonia solutions.',
    steps: ['Choose an unknown solution (or a named one to practise). Note its colour.', 'Drag the NaOH dropper to the tube a few times: is a precipitate formed? What colour? Keep adding until excess: does it dissolve?', 'Use a fresh tube and repeat with ammonia solution.', 'If nothing forms with NaOH, warm the tube and hold damp red litmus at its mouth. Then choose your answer and check it.'],
    init(ui) {
      const c = ui.ctx, X = 380; let k = 'Zn', unknown = true, reag = null, drops = 0, warm = false, litmus = null, rows = [], ans = 'Zn';
      const rL = ui.read('Observations'), rA = ui.read('Answer');
      const tube = () => { reag = null; drops = 0; warm = false; litmus = null; };
      const pick = () => { const ks = Object.keys(CAT); k = ks[Math.floor(Math.random() * ks.length)]; rows = []; tube(); rA('–'); ui.say('Here is an unknown solution. Add a few drops of a reagent.'); };
      ui.select('Solution', [['?', 'Unknown solution'], ...Object.keys(CAT).map(x => [x, CAT[x][0]])], v => { unknown = v === '?'; if (unknown) pick(); else { k = v; rows = []; tube(); rA('–'); } });
      ui.select('My answer', Object.keys(CAT).map(x => [x, CAT[x][0]]), v => { ans = v; });
      ui.button('Check my answer', () => rA(ans === k ? '<b>Correct:</b> ' + CAT[k][0] + '.' : 'Not quite. Compare your observations with the table in the lesson.'), 'btn-main');
      ui.button('Fresh test tube', () => { tube(); ui.say('Fresh tube of the same solution.'); });
      ui.button('Warm the tube', () => { if (reag === 'NaOH') { warm = true; ui.say('Warming. Hold damp red litmus at the mouth.'); } else ui.say('Add sodium hydroxide first, then warm.'); });
      const res = () => { const r = reag === 'NaOH' ? CAT[k][2] : CAT[k][3]; if (!r) return null; if (drops === 0) return null; const ex = drops >= 8; return { col: r[0], dissolved: ex && r[1] === 1, deep: ex && r[1] === 2, slight: r[2] }; };
      const describe = () => { const r = res(), nm = reag === 'NaOH' ? 'NaOH(aq)' : 'NH₃(aq)'; const cname = !r ? '' : { '#F2F2EE': 'white', '#7FB2E8': 'pale blue', '#5E7A3A': 'dirty green', '#8B3A14': 'reddish-brown' }[r.col];
        if (drops < 8) return [nm + ', a few drops', r ? (r.slight ? 'Slight ' + cname : cname[0].toUpperCase() + cname.slice(1)) + ' precipitate' : 'No precipitate', r ? 'Possible: ' + { white: 'Zn²⁺, Al³⁺, Pb²⁺, Ca²⁺ or Mg²⁺', 'pale blue': 'Cu²⁺', 'dirty green': 'Fe²⁺', 'reddish-brown': 'Fe³⁺' }[cname] : reag === 'NaOH' ? 'Possibly NH₄⁺ (warm to test)' : 'Ca²⁺ or NH₄⁺ possible'];
        return [nm + ', in excess', !r ? 'Still no precipitate' : r.deep ? 'Precipitate dissolves to a deep blue solution' : r.dissolved ? 'Precipitate dissolves' : (cname[0].toUpperCase() + cname.slice(1)) + ' precipitate remains', !r ? '' : r.deep ? 'Cu²⁺ present' : r.dissolved ? (reag === 'NaOH' ? 'Zn²⁺, Al³⁺ or Pb²⁺' : 'Zn²⁺ present') : (reag === 'NaOH' ? (cname === 'white' ? 'Ca²⁺ or Mg²⁺' : 'Not amphoteric') : (cname === 'white' ? 'Al³⁺, Pb²⁺ or Mg²⁺' : 'Insoluble in ammonia'))]; };
      const drs = [['NaOH', 'Sodium hydroxide solution', 'rgba(225,240,245,.8)'], ['NH3', 'Ammonia solution', 'rgba(225,240,245,.8)']].map((q, i) => ui.thing({ x: 600, y: 90 + i * 120, w: 50, h: 90, q, onDrop(o) { if (Math.abs(o.x - X) < 60 && o.y < 300) { if (reag && reag !== q[0]) ui.say('This tube already has ' + (reag === 'NaOH' ? 'sodium hydroxide' : 'ammonia') + ' in it. Use a fresh test tube.'); else { reag = q[0]; drops += 2; const r = describe(); const last = rows[rows.length - 1]; if (last && last[0] === r[0]) rows[rows.length - 1] = r; else rows.push(r); ui.say(r[1] + '.'); } } o.home(); } }));
      const lit = ui.thing({ x: 600, y: 350, w: 70, h: 30, onDrop(o) { if (Math.abs(o.x - X) < 60 && Math.abs(o.y - 140) < 50) { litmus = warm && k === 'NH4' ? 'blue' : 'red'; rows.push(['Warm with NaOH(aq); damp red litmus at mouth', litmus === 'blue' ? 'Litmus turns blue; pungent smell' : 'No change', litmus === 'blue' ? 'Ammonia gas: NH₄⁺ present' : warm ? 'NH₄⁺ absent' : 'Warm the tube first']); } o.home(); } });
      pick();
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY); const r = res();
        let col = CAT[k][1] || 'rgba(225,240,245,.3)'; if (r && r.deep) col = 'rgba(30,60,200,.75)';
        d.stand(c, X - 50, BY, 290, 60); d.tube(c, X, 370, 44, 220, .25 + drops * .02, col);
        if (r && !r.dissolved && !r.deep) for (let i = 0; i < (r.slight ? 14 : 40); i++) d.dot(c, X - 16 + (i * 13) % 32, 352 - (i * 7) % 26 * (1 + Math.min(drops, 8) * .1), 3.2, r.col);
        if (warm) { d.flame(c, X, 418, 1, t, .25); for (let i = 0; i < 5; i++) { c.strokeStyle = 'rgba(234,244,242,.25)'; c.beginPath(); c.arc(X - 10 + i * 5, 130 - (t * 30 + i * 12) % 50, 6, 0, 3); c.stroke(); } }
        d.txt(c, unknown ? 'Unknown solution' : CAT[k][0], X, 404, { size: 12, color: C.dim }); d.txt(c, drops ? drops + ' drops of ' + (reag === 'NaOH' ? 'NaOH' : 'NH₃') + (drops >= 8 ? ' (excess)' : '') : 'no reagent yet', X, 128, { size: 11, color: C.dim });
        drs.forEach(o => { d.dropper(c, o.x, o.y + 40, o.q[2]); if (o.x === o.hx) d.txt(c, o.q[1], o.x, o.y + 56, { size: 10, color: C.dim }); });
        c.fillStyle = litmus === 'blue' ? '#3F6FD8' : '#F08A9A'; c.fillRect(lit.x - 30, lit.y - 9, 60, 18); if (lit.x === lit.hx) d.txt(c, 'Damp red litmus', lit.x, lit.y + 24, { size: 10, color: C.dim });
        rL(rows.length ? log(rows) : 'Add a reagent to begin.');
      });
    }
  };
})();

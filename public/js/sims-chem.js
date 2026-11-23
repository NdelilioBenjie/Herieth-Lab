/* Herieth-Lab chemistry practicals */
(function () {
  const S = HL.sims, d = HL.d, C = HL.C, clamp = HL.clamp, BY = 380;
  const UNI = ['#E5232B', '#F0452A', '#F47B2A', '#F9A82B', '#F8D32D', '#D9DD35', '#7CC243', '#3FA34D', '#2E9E8F', '#2F7FC1', '#3A5CB8', '#4A46A8', '#5B3A99', '#5E2C86'];
  const CLEAR = 'rgba(225,240,245,.28)';

  /* ---------- indicators: pick up liquid with a dropper and test it ---------- */
  S.ph = {
    title: 'Testing liquids with litmus and other indicators', subject: 'chem',
    aim: 'To find out whether everyday liquids are acidic, neutral or basic using indicators.',
    steps: ['Drag the dropper into a bottle on the shelf to suck up some liquid.', 'Carry the dropper over a litmus paper, the universal indicator paper, or one of the two indicator tubes, and let go.', 'Watch the colour and record it. Test the same liquid on every indicator.', 'Press “Fresh papers and tubes” before testing a new liquid.'],
    init(ui) {
      const c = ui.ctx, L = [['Dilute hydrochloric acid', 'Dilute|HCl', 1, CLEAR], ['Lemon juice', 'Lemon|juice', 2, 'rgba(250,232,110,.6)'], ['Vinegar', 'Vinegar', 3, 'rgba(235,205,150,.5)'], ['Distilled water', 'Distilled|water', 7, CLEAR], ['Soap solution', 'Soap|solution', 10, 'rgba(235,235,225,.5)'], ['Ash water', 'Ash|water', 11, 'rgba(190,178,155,.6)'], ['Dilute sodium hydroxide', 'Dilute|NaOH', 13, CLEAR]];
      const T = [{ k: 'blue', n: 'blue litmus paper', x: 90 }, { k: 'red', n: 'red litmus paper', x: 175 }, { k: 'uni', n: 'universal indicator paper', x: 260 }, { k: 'php', n: 'phenolphthalein', x: 385 }, { k: 'mo', n: 'methyl orange', x: 495 }];
      let loaded = null, drops = []; const rHold = ui.read('Dropper holds'), rObs = ui.read('What you saw'), rCon = ui.read('Conclusion');
      const reset = () => { T.forEach(t => { t.res = null; t.grow = 0; }); rObs('–'); rCon('–'); };
      reset(); rHold('nothing');
      ui.button('Fresh papers and tubes', reset);
      ui.say('Drag the dropper into a bottle to pick up a liquid.');
      const dr = ui.thing({
        x: 650, y: 150, w: 44, h: 96, onDrop(o) {
          const tx = o.x, ty = o.y + 40; const bi = L.findIndex((b, i) => Math.abs(tx - (70 + i * 76)) < 26 && ty > 96 && ty < 196);
          if (bi >= 0) { loaded = bi; rHold(L[bi][0]); ui.say('The dropper is full. Now hold it over a paper or an indicator tube and let go.'); return; }
          const t = T.find(t => Math.abs(tx - t.x) < 36 && ty > 215);
          if (t) { if (loaded == null) { ui.say('The dropper is empty. Fill it from a bottle first.'); return; } drops.push({ x: tx, y: ty, t, li: loaded }); loaded = null; rHold('nothing'); }
        }
      });
      const result = (t, li) => {
        const p = L[li][2], n = L[li][0]; t.res = li; t.grow = 0; let obs, kind = p < 7 ? 'an acid' : p > 7 ? 'a base (alkali)' : 'neutral';
        if (t.k === 'blue') obs = p < 6 ? 'Blue litmus turned red' : 'Blue litmus stayed blue';
        if (t.k === 'red') obs = p > 8 ? 'Red litmus turned blue' : 'Red litmus stayed red';
        if (t.k === 'uni') obs = 'Universal indicator paper matched pH ' + p + ' on the chart';
        if (t.k === 'php') obs = p > 8.3 ? 'Phenolphthalein turned pink' : 'Phenolphthalein stayed colourless';
        if (t.k === 'mo') obs = p < 3.5 ? 'Methyl orange turned red' : p < 4.5 ? 'Methyl orange stayed orange' : 'Methyl orange turned yellow';
        rObs(obs); rCon(n + ' is ' + kind + (t.k === 'uni' ? ' (pH ≈ ' + p + ')' : '') + '.'); ui.say(obs + '. Try the same liquid on another indicator.');
      };
      const col = t => {
        if (t.res == null) return null; const p = L[t.res][2];
        return t.k === 'blue' ? (p < 6 ? '#E24D62' : '#3F6FD8') : t.k === 'red' ? (p > 8 ? '#3F6FD8' : '#E24D62') : t.k === 'uni' ? UNI[p - 1] : t.k === 'php' ? (p > 8.3 ? 'rgba(240,60,150,.8)' : CLEAR) : (p < 3.5 ? 'rgba(232,60,60,.85)' : p < 4.5 ? 'rgba(245,150,40,.85)' : 'rgba(250,212,60,.85)');
      };
      ui.loop(dt => {
        d.bg(c, ui.W, ui.H, BY);
        d.line(c, 30, 196, 560, 196, C.wood, 6); d.txt(c, 'Liquids to test', 44, 76, { align: 'left', size: 12, color: C.dim });
        L.forEach((b, i) => d.bottle(c, 70 + i * 76, 193, 50, 96, b[3], b[1]));
        // white tile with papers
        c.fillStyle = 'rgba(244,250,249,.92)'; d.rr(c, 40, 318, 270, 52, 6); c.fill(); d.txt(c, 'White tile', 175, 396, { size: 11, color: C.dim });
        T.slice(0, 3).forEach(t => {
          c.fillStyle = t.k === 'blue' ? '#7FA2EE' : t.k === 'red' ? '#F08A9A' : '#F1E3A0'; d.rr(c, t.x - 28, 326, 56, 36, 3); c.fill();
          if (t.res != null) { t.grow = Math.min(1, t.grow + dt * 2); c.fillStyle = col(t); c.beginPath(); c.ellipse(t.x, 344, 17 * t.grow, 12 * t.grow, 0, 0, 7); c.fill(); }
          d.txt(c, t.k === 'uni' ? 'Universal' : t.k === 'blue' ? 'Blue litmus' : 'Red litmus', t.x, 306, { size: 11 });
        });
        // indicator tubes in a rack
        c.fillStyle = C.wood; d.rr(c, 360, 300, 160, 10, 3); c.fill(); d.rr(c, 360, 366, 160, 12, 3); c.fill();
        T.slice(3).forEach(t => { if (t.res != null) t.grow = Math.min(1, t.grow + dt * 1.5); const base = t.k === 'php' ? CLEAR : 'rgba(245,150,40,.85)'; d.tube(c, t.x, 372, 30, 110, .55, t.res != null && t.grow > .4 ? col(t) : base); d.txt(c, t.k === 'php' ? 'Phenolphthalein' : 'Methyl orange', t.x, 412, { size: 11 }); });
        // universal chart
        d.txt(c, 'Universal indicator chart', 655, 268, { size: 11, color: C.dim });
        UNI.forEach((u, i) => { c.fillStyle = u; c.fillRect(578 + i * 11, 280, 11, 20); });
        d.txt(c, '1', 583, 312, { size: 10, color: C.dim }); d.txt(c, '7', 649, 312, { size: 10, color: C.dim }); d.txt(c, '14', 726, 312, { size: 10, color: C.dim });
        d.txt(c, 'acid', 600, 326, { size: 10, color: C.dim }); d.txt(c, 'neutral', 649, 340, { size: 10, color: C.dim }); d.txt(c, 'base', 712, 326, { size: 10, color: C.dim });
        drops = drops.filter(p => { p.y += 260 * dt; d.dot(c, p.x, p.y, 4, 'rgba(200,230,255,.95)'); const end = p.t.x < 300 ? 340 : 318; if (p.y >= end) { result(p.t, p.li); return false; } return true; });
        d.dropper(c, dr.x, dr.y + 40, loaded != null ? (L[loaded][3] === CLEAR ? 'rgba(200,230,255,.7)' : L[loaded][3]) : null);
        if (!dr.held && loaded == null && dr.x === dr.hx) d.txt(c, 'Dropper', 650, 206, { size: 11, color: C.dim });
      });
    }
  };

  /* ---------- Bunsen burner ---------- */
  S.bunsen = {
    title: 'Lighting a Bunsen burner and comparing flames', subject: 'chem',
    aim: 'To light a Bunsen burner safely and identify luminous and non-luminous flames.',
    steps: ['Keep the air hole closed. Click the matchbox to strike a match.', 'Click the gas tap to open it, then carry the burning match to the top of the chimney.', 'Slide the collar to open the air hole and watch the flame change.', 'Hold the porcelain dish in each flame using the tongs. Which flame leaves soot?', 'Click the gas tap again to put the burner off.'],
    init(ui) {
      const c = ui.ctx, X = 380; let gas = false, lit = false, air = 0, matchLit = 0, leak = 0, soot = 0, hot = 0;
      const rG = ui.read('Gas tap'), rA = ui.read('Air hole'), rF = ui.read('Flame'), rN = ui.read('Notes');
      ui.say('Click the matchbox to strike a match.');
      ui.thing({ x: 96, y: 300, w: 60, h: 60, onClick() { gas = !gas; if (!gas) { lit = false; leak = 0; ui.say('Gas is off. The flame goes out.'); } else ui.say(lit ? '' : 'Gas is flowing. Bring the burning match to the top of the chimney now.'); } });
      ui.thing({ x: 660, y: 356, w: 70, h: 44, onClick() { matchLit = 12; match.x = 640; match.y = 300; ui.say('The match is burning. ' + (gas ? 'Carry it to the top of the chimney.' : 'Open the gas tap, then carry the match to the chimney.')); } });
      const match = ui.thing({ x: 640, y: 300, w: 70, h: 40, onMove(o) { if (matchLit > 0 && gas && !lit && Math.abs(o.x - 30 - X) < 28 && Math.abs(o.y - 268) < 34) { lit = true; leak = 0; ui.say(air > .3 ? 'Lit. Next time close the air hole before lighting, to avoid the flame striking back.' : 'Lit: a luminous flame. Now slide the collar to open the air hole.'); } } });
      const collar = ui.thing({ x: 340, y: 412, w: 34, h: 30, lockY: true, clamp: [340, 0, 420, 999], onMove(o) { air = (o.x - 340) / 80; } });
      const dish = ui.thing({ x: 220, y: 200, w: 90, h: 50 });
      ui.button('Clean the dish', () => { soot = 0; });
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY);
        // gas pipe and tap
        d.line(c, 0, 300, 70, 300, C.steel, 8); c.fillStyle = gas ? C.green : C.red; d.rr(c, 70, 284, 50, 32, 6); c.fill(); d.txt(c, gas ? 'ON' : 'OFF', 95, 300, { size: 12, color: '#0B2A30', bold: true }); d.txt(c, 'Gas tap (click)', 95, 268, { size: 11, color: C.dim });
        c.strokeStyle = '#D98A3A'; c.lineWidth = 5; c.beginPath(); c.moveTo(120, 300); c.bezierCurveTo(220, 300, 250, 420, 330, 398); c.bezierCurveTo(380, 386, 400, 366, 414, 361); c.stroke();
        d.burner(c, X, BY, air);
        if (gas && !lit) { leak += dt; c.strokeStyle = 'rgba(234,244,242,.3)'; c.lineWidth = 1.5; for (let i = -1; i <= 1; i++) { c.beginPath(); for (let k = 0; k < 40; k++) c.lineTo(X + i * 8 + Math.sin(t * 5 + k * .4 + i) * 4, 270 - k * 2); c.stroke(); } if (leak > 5) ui.say('<b>Gas is escaping.</b> Light it now or close the tap. Never leave an unlit burner with the gas on.'); }
        if (lit) d.flame(c, X, 276, air, t);
        // air-hole slider
        d.line(c, 340, 412, 420, 412, C.dim, 3); c.fillStyle = '#C9A24B'; d.rr(c, collar.x - 12, 402, 24, 20, 5); c.fill(); d.txt(c, 'closed', 318, 412, { size: 10, color: C.dim, align: 'right' }); d.txt(c, 'open', 442, 412, { size: 10, color: C.dim, align: 'left' }); d.txt(c, 'Slide the collar to change the air hole', X, 430, { size: 11, color: C.dim });
        // matchbox and match
        c.fillStyle = '#C2415B'; d.rr(c, 625, 338, 70, 36, 4); c.fill(); c.fillStyle = '#5A3A22'; c.fillRect(625, 366, 70, 8); d.txt(c, 'Matches (click)', 660, 354, { size: 10 });
        if (matchLit > 0) { matchLit -= dt; d.line(c, match.x + 30, match.y, match.x - 30, match.y + 8, '#E8D2A6', 4); d.dot(c, match.x - 30, match.y + 8, 4, '#7A2E22'); d.flame(c, match.x - 30, match.y + 6, 0, t, .22); } else match.off = true; if (matchLit > 0) match.off = false;
        // dish with tongs
        const inFlame = lit && Math.abs(dish.x - X) < 34 && dish.y > 130 && dish.y < 272;
        if (inFlame) { hot = Math.min(1, hot + dt * .5); if (air < .45) soot = Math.min(1, soot + dt * .35); } else hot = Math.max(0, hot - dt * .2);
        d.line(c, dish.x + 40, dish.y - 2, dish.x + 110, dish.y - 26, C.steel, 3); d.line(c, dish.x + 40, dish.y + 2, dish.x + 110, dish.y - 14, C.steel, 3);
        c.fillStyle = 'rgb(' + [244 + 10 * hot, 250 - 60 * hot, 249 - 90 * hot].map(Math.round) + ')'; c.beginPath(); c.moveTo(dish.x - 42, dish.y - 8); c.quadraticCurveTo(dish.x, dish.y + 26, dish.x + 42, dish.y - 8); c.closePath(); c.fill();
        if (soot > 0) { c.fillStyle = 'rgba(20,20,20,' + soot * .9 + ')'; c.beginPath(); c.moveTo(dish.x - 30, dish.y + 1); c.quadraticCurveTo(dish.x, dish.y + 24, dish.x + 30, dish.y + 1); c.quadraticCurveTo(dish.x, dish.y + 12, dish.x - 30, dish.y + 1); c.fill(); }
        if (!dish.held && dish.x === dish.hx) d.txt(c, 'Porcelain dish', dish.x, dish.y + 28, { size: 11, color: C.dim });
        rG(gas ? 'open' : 'closed'); rA(air < .1 ? 'closed' : air < .6 ? 'partly open' : 'fully open');
        rF(!lit ? 'none' : air < .35 ? 'Luminous: yellow, tall, unsteady' : air < .7 ? 'Changing: less yellow, more blue' : 'Non-luminous: blue, steady, noisy');
        rN(!lit ? '–' : soot > .3 ? 'Black soot on the dish: unburnt carbon from the luminous flame' : air > .7 ? 'Hot and clean: the flame to use for heating' : 'Not enough air, so the gas does not burn completely');
      });
    }
  };

  /* ---------- apparatus ---------- */
  S.apparatus = {
    title: 'Know your laboratory apparatus', subject: 'chem',
    aim: 'To identify common laboratory apparatus and state what each is used for.',
    steps: ['Read the name shown below the bench.', 'Click the apparatus with that name.', 'Read what it is used for, then find the next one.'],
    init(ui) {
      const c = ui.ctx, g = C.glass;
      const A = [
        ['Beaker', 'holding, mixing and heating liquids', (x, y) => d.beaker(c, x, y, 54, 64, .5, C.water)],
        ['Conical flask', 'titrations and mixing liquids by swirling', (x, y) => d.flask(c, x, y, 62, 76, .4, C.water)],
        ['Test tube', 'holding and heating small amounts of substances', (x, y) => d.tube(c, x, y, 20, 80, .4, C.water)],
        ['Measuring cylinder', 'measuring the volume of a liquid', (x, y) => { c.fillStyle = C.water; c.fillRect(x - 11, y - 48, 22, 44); c.strokeStyle = g; c.lineWidth = 2.2; c.strokeRect(x - 11, y - 84, 22, 80); d.line(c, x - 22, y - 2, x + 22, y - 2, g, 4); for (let i = 1; i < 8; i++) d.line(c, x - 11, y - 4 - i * 10, x - 3, y - 4 - i * 10, g, 1); }],
        ['Filter funnel', 'filtering, and pouring liquids into narrow containers', (x, y) => { c.strokeStyle = g; c.lineWidth = 2.2; c.beginPath(); c.moveTo(x - 32, y - 78); c.lineTo(x - 4, y - 40); c.lineTo(x - 4, y); c.moveTo(x + 32, y - 78); c.lineTo(x + 4, y - 40); c.lineTo(x + 4, y - 6); c.moveTo(x - 32, y - 78); c.lineTo(x + 32, y - 78); c.stroke(); }],
        ['Bunsen burner', 'heating substances', (x, y) => { c.save(); c.translate(x, y); c.scale(.72, .72); d.burner(c, 0, 0, .6); c.restore(); }],
        ['Burette', 'delivering accurate volumes of a liquid, as in titration', (x, y) => { c.strokeStyle = g; c.lineWidth = 2; c.strokeRect(x - 6, y - 96, 12, 78); c.fillStyle = C.water; c.fillRect(x - 5, y - 70, 10, 51); for (let i = 0; i < 8; i++) d.line(c, x - 6, y - 90 + i * 9, x, y - 90 + i * 9, g, 1); d.line(c, x - 10, y - 14, x + 10, y - 14, C.amber, 4); d.line(c, x, y - 18, x, y, g, 3); }],
        ['Thermometer', 'measuring temperature', (x, y) => { c.save(); c.translate(x, y - 45); c.rotate(.5); c.strokeStyle = g; c.lineWidth = 2; d.rr(c, -4, -46, 8, 86, 4); c.stroke(); d.dot(c, 0, 42, 7, C.red); d.line(c, 0, 40, 0, -10, C.red, 3); c.restore(); }],
        ['Tripod stand', 'supporting apparatus while it is heated', (x, y) => d.tripod(c, x, y, 60, 70)],
        ['Round-bottomed flask', 'heating liquids evenly and preparing gases', (x, y) => d.vessel(c, () => { c.beginPath(); c.moveTo(x - 9, y - 86); c.lineTo(x - 9, y - 54); c.arc(x, y - 30, 30, -1.88, -1.26, true); c.lineTo(x + 9, y - 86); }, y - 86, y, .35, C.water)],
        ['Evaporating dish', 'evaporating a solution to leave the dissolved solid', (x, y) => { c.fillStyle = 'rgba(244,250,249,.92)'; c.beginPath(); c.moveTo(x - 40, y - 26); c.quadraticCurveTo(x, y + 16, x + 40, y - 26); c.closePath(); c.fill(); }],
        ['Dropper', 'transferring a liquid one drop at a time', (x, y) => d.dropper(c, x, y, C.water)]
      ];
      let order = [], cur = -1, score = 0, tries = 0, msg = '', good = -1, bad = -1;
      const rS = ui.read('Score'), rU = ui.read('Used for');
      const next = () => { if (!order.length) { cur = -1; ui.say('<b>All found.</b> You scored ' + score + ' out of ' + A.length + '. Press “Start again” to retry.'); return; } cur = order.pop(); tries = 0; ui.say('Click the <b>' + A[cur][0].toLowerCase() + '</b>.'); };
      const start = () => { order = A.map((_, i) => i).sort(() => Math.random() - .5); score = 0; good = bad = -1; rU('–'); next(); };
      A.forEach((a, i) => ui.thing({ x: 95 + (i % 4) * 190, y: 80 + Math.floor(i / 4) * 138, w: 170, h: 124, drag: false, onClick() { if (cur < 0) return; if (i === cur) { if (!tries) score++; good = i; bad = -1; rU('<b>' + a[0] + '</b>: ' + a[1] + '.'); next(); } else { tries++; bad = i; ui.say('That is the ' + a[0].toLowerCase() + '. Look again for the <b>' + A[cur][0].toLowerCase() + '</b>.'); } } }));
      ui.button('Start again', start); start();
      ui.loop(() => {
        d.bg(c, ui.W, ui.H);
        A.forEach((a, i) => { const x = 95 + (i % 4) * 190, y = 80 + Math.floor(i / 4) * 138; c.fillStyle = i === good ? 'rgba(95,211,154,.16)' : i === bad ? 'rgba(255,93,93,.16)' : 'rgba(234,244,242,.05)'; d.rr(c, x - 85, y - 62, 170, 124, 10); c.fill(); a[2](x, y + 50); });
        rS(score + ' / ' + A.length);
      });
    }
  };

  /* ---------- fire ---------- */
  S.fire = {
    title: 'Choosing the right fire extinguisher', subject: 'chem',
    aim: 'To choose a suitable extinguisher for each class of fire and explain which side of the fire triangle it removes.',
    steps: ['Choose what is burning.', 'Drag an extinguisher onto the fire and let go.', 'Read why it worked, failed or made things worse, then light the fire again and try another.'],
    init(ui) {
      const c = ui.ctx; const G = 1, P = 0, B = -1;
      const E = [['Water', '#D6455A', 'Heat'], ['Foam', '#E8C66A', 'Oxygen'], ['CO₂', '#3B3F45', 'Oxygen'], ['Dry powder', '#3F6FD8', 'Oxygen'], ['Dry sand', '#C9A24B', 'Oxygen'], ['Fire blanket', '#EAF4F2', 'Oxygen']];
      const F = {
        A: ['Wood and paper (Class A)', [[G, 'Water cools the burning solid below its ignition temperature.'], [G, 'Foam cools the fuel and covers it.'], [P, 'Carbon dioxide does not cool glowing solids, so the fire can start again.'], [G, 'Dry powder smothers the flames.'], [G, 'Sand cuts off the air from a small fire.'], [G, 'A blanket smothers a small fire by keeping air out.']]],
        B: ['Petrol or kerosene (Class B)', [[B, 'Petrol floats on water, so water carries the burning liquid and spreads the fire.'], [G, 'Foam floats on the liquid and seals it from the air.'], [G, 'Carbon dioxide is denser than air. It blankets the fire and keeps oxygen out.'], [G, 'Dry powder smothers the flames.'], [G, 'Sand soaks up and covers a small spill.'], [G, 'A blanket smothers a small liquid fire.']]],
        C: ['Leaking gas cylinder (Class C)', [[P, 'Water does not stop gas from escaping. Close the valve to remove the fuel.'], [P, 'Foam cannot cover a gas. Close the valve to remove the fuel.'], [P, 'The flame may go out for a moment, but gas keeps leaking and can explode. Close the valve.'], [G, 'Dry powder knocks down a gas flame. Then close the valve to remove the fuel.'], [P, 'Sand cannot cover a gas jet. Close the valve.'], [P, 'A blanket cannot stop a gas jet. Close the valve.']]],
        D: ['Burning magnesium (Class D)', [[B, 'Burning metals react with water and release hydrogen, which can explode.'], [B, 'Foam contains water, which reacts with the burning metal.'], [B, 'Magnesium keeps burning in carbon dioxide.'], [G, 'A special dry powder for metal fires smothers the burning metal.'], [G, 'Dry sand covers the metal and keeps air out.'], [P, 'The metal burns hot enough to burn through a blanket.']]],
        E: ['Electrical appliance (Class E)', [[B, 'Water conducts electricity, so you can get an electric shock.'], [B, 'Foam contains water and conducts electricity.'], [G, 'Carbon dioxide does not conduct electricity and leaves no mess. Switch off at the mains first.'], [G, 'Dry powder does not conduct electricity. Switch off at the mains first.'], [P, 'Sand is hard to apply and damages equipment. Switch off the mains and use CO₂ or dry powder.'], [P, 'Switch off at the mains and use CO₂ or dry powder.']]],
        F: ['Cooking oil in a pan (Class F)', [[B, 'Water sinks under the hot oil, boils at once and throws burning oil out of the pan.'], [P, 'Ordinary foam is not made for very hot oil. Cover the pan instead.'], [P, 'The jet of gas can blow burning oil out of the pan.'], [P, 'The powder jet can splash burning oil, and the hot oil can catch fire again.'], [P, 'Sand splashes the hot oil.'], [G, 'Covering the pan with a fire blanket or lid keeps oxygen out. Turn off the heat as well.']]]
      };
      let k = 'A', level = 1, target = 1, side = '', flash = 0;
      const rR = ui.read('Result'), rT = ui.read('Fire triangle');
      const relight = () => { level = target = 1; side = ''; rR('–'); rT('Fuel, heat and oxygen are all present'); ui.say('Drag an extinguisher onto the fire.'); };
      ui.select('What is burning', Object.keys(F).map(x => [x, F[x][0]]), v => { k = v; relight(); });
      ui.button('Light the fire again', relight);
      E.forEach((e, i) => ui.thing({ x: 440 + (i % 3) * 110, y: 250 + Math.floor(i / 3) * 110, w: 80, h: 96, onDrop(o) { if (Math.abs(o.x - 190) < 120 && o.y > 150 && level > .1) { const r = F[k][1][i]; target = r[0] === G ? 0 : r[0] === B ? 1.7 : 1; flash = r[0] === B ? 1 : 0; side = r[0] === G ? (k === 'C' ? 'Fuel' : e[2]) : ''; rR((r[0] === G ? '<b>Fire out.</b> ' : r[0] === B ? '<b>Dangerous.</b> ' : '<b>Not suitable.</b> ') + r[1]); rT(side ? side + ' removed, so burning stops' : 'All three sides are still present'); ui.say(e[0] + ' on ' + F[k][0].replace(/ \(.*/, '').toLowerCase() + ': ' + (r[0] === G ? 'it works.' : r[0] === B ? 'it makes the fire worse.' : 'it does not put the fire out.')); } o.home(); } }));
      relight();
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY); level += (target - level) * Math.min(1, dt * 1.6); flash = Math.max(0, flash - dt);
        if (flash > 0) { c.fillStyle = 'rgba(255,120,40,' + flash * .25 + ')'; c.fillRect(0, 0, ui.W, ui.H); }
        // the burning thing
        const x = 190; c.fillStyle = k === 'E' ? '#5B6B72' : k === 'C' ? '#C2415B' : k === 'F' ? '#3B3F45' : k === 'D' ? C.steel : k === 'B' ? '#7A6A2A' : C.wood;
        if (k === 'A') { for (let i = 0; i < 3; i++) { c.save(); c.translate(x, 366); c.rotate(-.5 + i * .5); d.rr(c, -50, -8, 100, 16, 6); c.fill(); c.restore(); } }
        else if (k === 'B') { c.beginPath(); c.ellipse(x, 372, 80, 12, 0, 0, 7); c.fill(); }
        else if (k === 'C') { d.rr(c, x - 28, 290, 56, 90, 14); c.fill(); c.fillRect(x - 6, 276, 12, 16); }
        else if (k === 'D') { d.rr(c, x - 40, 366, 80, 10, 3); c.fill(); }
        else if (k === 'E') { d.rr(c, x - 50, 300, 100, 78, 8); c.fill(); c.fillStyle = C.bg; d.rr(c, x - 40, 310, 60, 44, 4); c.fill(); }
        else { d.rr(c, x - 50, 352, 100, 26, 6); c.fill(); c.fillRect(x + 48, 356, 60, 8); }
        const fy = k === 'C' ? 276 : k === 'E' ? 304 : k === 'F' ? 354 : 368;
        if (level > .04) for (let i = -1; i <= 1; i++) { c.save(); c.globalAlpha = k === 'D' ? .7 : 1; d.flame(c, x + i * 26 * (k === 'C' ? .2 : 1), fy, 0, t + i * 2, level * (i ? .7 : 1)); c.restore(); }
        else { c.strokeStyle = 'rgba(234,244,242,.25)'; c.lineWidth = 2; for (let i = -1; i <= 1; i++) { c.beginPath(); for (let n = 0; n < 30; n++) c.lineTo(x + i * 20 + Math.sin(t * 2 + n * .3 + i) * 6, fy - n * 4); c.stroke(); } }
        if (k === 'D' && level > .1) d.dot(c, x, 356, 16 * level, 'rgba(255,255,255,.9)');
        // triangle
        const tx = 120, ty = 150, s = 62, pts = [[tx, ty - s], [tx + s, ty + s * .7], [tx - s, ty + s * .7]], names = ['Heat', 'Fuel', 'Oxygen'], mids = [[tx + 46, ty - 12], [tx, ty + s * .7 + 16], [tx - 50, ty - 12]];
        pts.forEach((p, i) => { const q = pts[(i + 1) % 3], gone = side === names[i]; d.line(c, p[0], p[1], q[0], q[1], gone ? C.faint : C.amber, 5, gone ? [6, 6] : null); d.txt(c, names[i] + (gone ? ' ✕' : ''), mids[i][0], mids[i][1], { size: 12, color: gone ? C.dim : C.chalk, bold: true }); });
        // extinguishers
        E.forEach((e, i) => { const o = ui.things[i]; if (i < 4) { c.fillStyle = e[1]; d.rr(c, o.x - 20, o.y - 30, 40, 70, 8); c.fill(); c.fillStyle = '#22292D'; c.fillRect(o.x - 8, o.y - 42, 16, 12); d.line(c, o.x + 8, o.y - 38, o.x + 30, o.y - 24, '#22292D', 4); } else if (i === 4) { c.fillStyle = '#C2415B'; c.beginPath(); c.moveTo(o.x - 30, o.y - 20); c.lineTo(o.x + 30, o.y - 20); c.lineTo(o.x + 22, o.y + 40); c.lineTo(o.x - 22, o.y + 40); c.fill(); c.fillStyle = e[1]; c.beginPath(); c.ellipse(o.x, o.y - 20, 30, 9, 0, 0, 7); c.fill(); } else { c.fillStyle = e[1]; d.rr(c, o.x - 30, o.y - 26, 60, 60, 4); c.fill(); d.line(c, o.x - 30, o.y - 6, o.x + 30, o.y - 6, C.steel, 1); d.line(c, o.x - 30, o.y + 14, o.x + 30, o.y + 14, C.steel, 1); } d.txt(c, e[0], o.x, o.y + 54, { size: 11 }); });
      });
    }
  };

  /* ---------- states of matter ---------- */
  S.states = {
    title: 'Heating a solid until it boils', subject: 'chem',
    aim: 'To investigate how a substance changes from solid to liquid to gas and what its particles do.',
    steps: ['Click the burner to turn it on.', 'Watch the thermometer, the heating curve and the particles in the magnified view.', 'Notice that the temperature stays constant while the substance melts and while it boils.', 'Click the burner again to pause the heating at any point.'],
    init(ui) {
      const c = ui.ctx, SUB = { water: ['Water (ice)', 0, 100, -20, C.water], eth: ['Ethanol', -114, 78, -130, 'rgba(210,225,255,.4)'], nap: ['Naphthalene', 80, 218, 20, 'rgba(245,245,235,.6)'] };
      let k = 'water', e = 0, on = false, pts = [], P = [];
      const seg = [6, 5, 8, 7, 4], rT = ui.read('Temperature'), rS = ui.read('State'), rP = ui.read('Particles');
      const reset = () => { e = 0; pts = []; on = false; P = []; for (let i = 0; i < 36; i++) P.push({ x: 0, y: 0, vx: Math.cos(i * 2.4), vy: Math.sin(i * 2.4), i }); ui.say('Click the burner to start heating.'); };
      ui.select('Substance', Object.keys(SUB).map(x => [x, SUB[x][0]]), v => { k = v; reset(); }); ui.button('Start again', reset);
      ui.thing({ x: 130, y: 330, w: 90, h: 110, drag: false, onClick() { on = !on; ui.say(on ? 'Heating. Watch the temperature and the particles.' : 'Burner off. Heating is paused.'); } });
      reset();
      const info = () => { // returns [temperature, phase index, fraction through phase]
        const s = SUB[k]; let r = e, i = 0; while (i < 4 && r > seg[i]) { r -= seg[i]; i++; } const f = clamp(r / seg[i], 0, 1);
        const T = i === 0 ? s[3] + (s[1] - s[3]) * f : i === 1 ? s[1] : i === 2 ? s[1] + (s[2] - s[1]) * f : i === 3 ? s[2] : s[2] + 40 * f; return [T, i, f];
      };
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY); const s = SUB[k]; if (on && e < 30) e += dt; const [T, ph, f] = info(); if (on && e < 30) pts.push([e, T - s[3]]);
        // burner, tripod, beaker
        d.burner(c, 130, BY, .9); if (on) d.flame(c, 130, 276, 1, t, .6); d.tripod(c, 130, BY, 110, 150);
        const lv = ph < 3 ? .55 : ph === 3 ? .55 - .3 * f : .25; d.beaker(c, 130, 226, 90, 100, ph === 0 ? 0 : lv * (ph === 1 ? .3 + .7 * f : 1), s[4]);
        if (ph < 2) { const n = ph === 0 ? 5 : Math.ceil(5 * (1 - f)); c.fillStyle = 'rgba(235,248,255,.85)'; for (let i = 0; i < n; i++) d.rr(c, 96 + (i % 3) * 24 + (i > 2 ? 12 : 0), 200 - (i > 2 ? 22 : 0), 20, 20, 4), c.fill(); }
        if (ph === 3 || ph === 4) for (let i = 0; i < 8; i++) { const yy = (t * 40 + i * 30) % 60; d.dot(c, 100 + i * 8, 222 - yy * (ph === 3 ? 1 : 0), 3, 'rgba(255,255,255,.5)'); c.strokeStyle = 'rgba(234,244,242,.25)'; c.beginPath(); c.arc(105 + i * 7, 110 - yy, 6, 0, 3); c.stroke(); }
        // thermometer
        d.line(c, 162, 80, 162, 212, C.glass, 7); d.line(c, 162, 212, 162, 212 - 120 * clamp((T - s[3]) / (s[2] + 40 - s[3]), 0, 1), C.red, 3); d.dot(c, 162, 214, 6, C.red); d.txt(c, T.toFixed(0) + ' °C', 196, 84, { size: 14, bold: true });
        d.txt(c, 'Burner (click)', 130, 404, { size: 11, color: C.dim });
        // particle view
        const bx = 268, by = 70, bs = 170; c.fillStyle = 'rgba(8,30,35,.55)'; d.rr(c, bx, by, bs, bs, 12); c.fill(); d.txt(c, 'Particles, magnified', bx + bs / 2, by + bs + 16, { size: 11, color: C.dim });
        P.forEach(p => {
          const st = ph === 0 ? 0 : ph === 1 ? (p.i < 36 * f ? 1 : 0) : ph === 2 ? 1 : ph === 3 ? (p.i < 36 * f ? 2 : 1) : 2, r = 7;
          if (st === 0) { const j = 1 + 2.5 * (ph === 0 ? f : 1); p.x = bx + 34 + (p.i % 6) * 17 + Math.sin(t * 30 + p.i) * j; p.y = by + bs - 14 - Math.floor(p.i / 6) * 17 + Math.cos(t * 27 + p.i * 2) * j; }
          else { const sp = st === 1 ? 30 : 120, top = st === 1 ? by + bs * .5 : by + r; p.x += p.vx * sp * dt; p.y += p.vy * sp * dt; if (p.x < bx + r || p.x > bx + bs - r) { p.vx *= -1; p.x = clamp(p.x, bx + r, bx + bs - r); } if (p.y < top || p.y > by + bs - r) { p.vy *= -1; p.y = clamp(p.y, top, by + bs - r); } if (st === 1 && Math.random() < .02) { const a = Math.random() * 7; p.vx = Math.cos(a); p.vy = Math.sin(a); } }
          d.dot(c, p.x, p.y, r, st === 0 ? '#9FD0FF' : st === 1 ? C.blue : C.amber);
        });
        d.graph(c, 510, 80, 210, 170, { xmax: 30, ymax: s[2] + 40 - s[3], xl: 'Heating time', yl: 'Temperature', pts, color: C.amber });
        d.txt(c, 'melting', 560, 80 + 170 - 170 * (s[1] - s[3]) / (s[2] + 40 - s[3]) - 9, { size: 10, color: C.dim }); d.txt(c, 'boiling', 665, 80 + 170 - 170 * (s[2] - s[3]) / (s[2] + 40 - s[3]) - 9, { size: 10, color: C.dim });
        rT(T.toFixed(0) + ' °C'); rS(['Solid', 'Melting: solid and liquid together', 'Liquid', 'Boiling: liquid and gas together', 'Gas'][ph]);
        rP(['Packed in fixed positions. They only vibrate, faster as it gets hotter.', 'Heat is used to break particles free, so the temperature does not rise.', 'Close together but free to slide past each other.', 'Heat is used to separate the particles completely, so the temperature does not rise.', 'Far apart and moving fast in all directions.'][ph]);
      });
    }
  };

  /* ---------- separating mixtures ---------- */
  S.separate = {
    title: 'Separating mixtures', subject: 'chem',
    aim: 'To choose and carry out a suitable method for separating a given mixture.',
    steps: ['Choose a mixture and decide which method fits it.', 'Choose the apparatus to set up on the bench.', 'Drag the beaker of mixture to the apparatus and let go.', 'If nothing separates, read why and try another method.'],
    init(ui) {
      const c = ui.ctx;
      const MIX = { sand: ['Sand and water', ['filt', 'dec'], '#CDAE74'], muddy: ['Muddy water left to settle', ['dec', 'filt'], '#8A6A45'], salt: ['Salt solution (to get the salt)', ['evap'], 'rgba(200,225,245,.5)'], saltw: ['Salt solution (to get pure water)', ['dist'], 'rgba(200,225,245,.5)'], oil: ['Kerosene and water', ['funnel'], '#D8C26A'], eth: ['Ethanol and water', ['frac'], 'rgba(210,225,255,.45)'], iod: ['Iodine and sand', ['subl'], '#6B5A6E'], ink: ['Dyes in black ink', ['chrom'], '#1D2230'], iron: ['Iron filings and sulphur powder', ['mag'], '#B9B04A'] };
      const M = { filt: ['Filtration', 'Filtration separates an insoluble solid from a liquid.', 'The liquid (filtrate) passes through the filter paper. The solid (residue) is too big and stays behind.'], dec: ['Decantation', 'Decantation pours a liquid off a solid that has settled.', 'The clear liquid is poured off gently and the settled solid stays in the beaker.'], evap: ['Evaporation', 'Evaporation recovers a dissolved solid, but the liquid is lost.', 'The water evaporates and crystals of the dissolved solid are left in the dish.'], dist: ['Simple distillation', 'Simple distillation recovers the liquid from a solution of a solid.', 'The water boils, its vapour is cooled in the condenser, and pure water (distillate) is collected.'], frac: ['Fractional distillation', 'Fractional distillation separates miscible liquids with different boiling points.', 'Ethanol boils first at 78 °C, rises up the column, condenses and is collected. Water stays behind.'], funnel: ['Separating funnel', 'A separating funnel separates liquids that do not mix.', 'The denser water forms the lower layer and is run off through the tap. Kerosene stays in the funnel.'], subl: ['Sublimation', 'Sublimation separates a solid that turns straight into vapour on heating.', 'Iodine turns into purple vapour and forms crystals again on the cold surface. Sand stays behind.'], chrom: ['Paper chromatography', 'Chromatography separates dissolved coloured substances.', 'The solvent climbs the paper and carries each dye a different distance.'], mag: ['Using a magnet', 'A magnet separates a magnetic substance from a non-magnetic one.', 'Iron filings are attracted to the magnet. Sulphur is left in the dish.'] };
      let mk = 'sand', me = 'filt', p = 0, run = false;
      const rM = ui.read('Method'), rR = ui.read('Result');
      const reset = () => { p = 0; run = false; bk.home(); bk.off = false; rM(M[me][0]); rR('–'); ui.say('Drag the beaker of mixture to the apparatus.'); };
      ui.select('Mixture', Object.keys(MIX).map(x => [x, MIX[x][0]]), v => { mk = v; reset(); });
      ui.select('Apparatus on the bench', Object.keys(M).map(x => [x, M[x][0]]), v => { me = v; reset(); });
      ui.button('Start again', () => reset());
      const bk = ui.thing({ x: 110, y: 330, w: 80, h: 90, onDrop(o) { if (o.x > 260) { if (MIX[mk][1].includes(me)) { run = true; o.off = true; rR(M[me][2]); ui.say('Pouring the mixture in. Watch what happens.'); } else { rR('<b>No separation.</b> ' + M[me][1] + ' ' + MIX[mk][0] + ' needs a different method.'); ui.say('This method does not suit this mixture. Choose other apparatus.'); o.home(); } } else o.home(); } });
      reset();
      const X = 440, col = () => MIX[mk][2];
      const draw = {
        filt(t) { d.flask(c, X, BY, 110, 130, p * .4, C.water); c.strokeStyle = C.glass; c.lineWidth = 2.2; c.beginPath(); c.moveTo(X - 50, 190); c.lineTo(X - 6, 244); c.lineTo(X - 6, 290); c.moveTo(X + 50, 190); c.lineTo(X + 6, 244); c.lineTo(X + 6, 280); c.stroke(); c.fillStyle = 'rgba(244,250,249,.7)'; c.beginPath(); c.moveTo(X - 44, 194); c.lineTo(X, 246); c.lineTo(X + 44, 194); c.fill(); if (run) { c.fillStyle = col(); c.beginPath(); c.moveTo(X - 14 - 14 * p, 232 - 16 * p); c.lineTo(X, 246); c.lineTo(X + 14 + 14 * p, 232 - 16 * p); c.fill(); if (p < 1) d.dot(c, X, 290 + (t * 120) % 60, 3, C.blue); } d.txt(c, 'filter paper in funnel', X + 120, 200, { size: 11, color: C.dim }); if (p > .5) { d.txt(c, 'residue', X + 86, 228, { size: 11 }); d.txt(c, 'filtrate', X + 92, 356, { size: 11 }); } },
        dec() { d.beaker(c, X - 60, BY, 90, 110, run ? .7 - .5 * p : 0, C.water); if (run) { c.fillStyle = col(); c.fillRect(X - 103, BY - 18, 86, 16); } d.beaker(c, X + 90, BY, 90, 110, .6 * p, C.water); if (run && p < 1) d.arrow(c, X - 10, 300, X + 40, 300, C.amber, 2); if (p > .5) { d.txt(c, 'settled solid', X - 60, 402, { size: 11 }); d.txt(c, 'clear liquid', X + 90, 402, { size: 11 }); } },
        evap(t) { d.burner(c, X, BY, .9); if (run) d.flame(c, X, 276, 1, t, .55); d.tripod(c, X, BY, 120, 150); c.fillStyle = 'rgba(244,250,249,.92)'; c.beginPath(); c.moveTo(X - 60, 196); c.quadraticCurveTo(X, 250, X + 60, 196); c.closePath(); c.fill(); if (run) { c.fillStyle = 'rgba(86,174,255,' + (.6 * (1 - p)) + ')'; c.beginPath(); c.moveTo(X - 46, 204); c.quadraticCurveTo(X, 240, X + 46, 204); c.fill(); for (let i = 0; i < 12 * p; i++) c.fillStyle = '#fff', c.fillRect(X - 30 + i * 5, 212 + (i % 3) * 3, 4, 4); if (p < 1) for (let i = 0; i < 4; i++) { c.strokeStyle = 'rgba(234,244,242,.3)'; c.beginPath(); c.arc(X - 30 + i * 20, 170 - (t * 30 + i * 17) % 50, 7, 0, 3); c.stroke(); } } if (p > .6) d.txt(c, 'crystals left behind', X + 130, 214, { size: 11 }); },
        dist(t, frac) { d.burner(c, X - 90, BY, .9); if (run) d.flame(c, X - 90, 276, 1, t, .5); d.tripod(c, X - 90, BY, 100, 150); d.vessel(c, () => { c.beginPath(); c.moveTo(X - 99, frac ? 80 : 130); c.lineTo(X - 99, 168); c.arc(X - 90, 196, 30, -1.88, -1.26, true); c.lineTo(X - 81, frac ? 80 : 130); }, 130, 226, run ? .5 - .25 * p : 0, col()); if (frac) { c.fillStyle = 'rgba(234,244,242,.12)'; c.fillRect(X - 99, 80, 18, 60); d.txt(c, 'fractionating column', X - 170, 96, { size: 11, color: C.dim }); } const y0 = frac ? 90 : 138; c.strokeStyle = C.glass; c.lineWidth = 2.2; c.beginPath(); c.moveTo(X - 81, y0); c.lineTo(X + 110, y0 + 110); c.stroke(); c.strokeStyle = 'rgba(86,174,255,.6)'; c.lineWidth = 12; c.beginPath(); c.moveTo(X - 40, y0 + 24); c.lineTo(X + 80, y0 + 93); c.stroke(); d.txt(c, 'condenser (cold water)', X + 90, y0 + 40, { size: 11, color: C.dim }); d.beaker(c, X + 120, BY, 70, 90, p * .5, C.water); if (run && p < 1) d.dot(c, X + 112, y0 + 116 + (t * 130) % (BY - y0 - 150), 3, C.blue); if (p > .5) d.txt(c, 'distillate', X + 120, 402, { size: 11 }); },
        frac(t) { draw.dist(t, true); },
        funnel(t) { d.stand(c, X - 60, BY, 300, 70); d.vessel(c, () => { c.beginPath(); c.moveTo(X - 12, 100); c.lineTo(X - 12, 120); c.quadraticCurveTo(X - 52, 150, X - 40, 200); c.lineTo(X - 5, 262); c.lineTo(X - 5, 290); c.lineTo(X + 5, 290); c.lineTo(X + 5, 262); c.lineTo(X + 40, 200); c.quadraticCurveTo(X + 52, 150, X + 12, 120); c.lineTo(X + 12, 100); }, 120, 290, run ? .85 : 0, '#D8C26A'); if (run) { c.save(); c.beginPath(); c.moveTo(X - 44, 190 + 80 * p); c.lineTo(X + 44, 190 + 80 * p); c.lineTo(X + 5, 290); c.lineTo(X - 5, 290); c.clip(); c.fillStyle = C.blue; c.fillRect(X - 44, 190 + 80 * p - (80 * p > 60 ? 0 : 0), 88, 100); c.restore(); if (p < 1) d.dot(c, X, 296 + (t * 120) % 40, 3, C.blue); } d.line(c, X - 14, 270, X + 14, 270, C.amber, 5); d.beaker(c, X, BY, 70, 60, p * .7, C.water); if (run) { d.txt(c, 'kerosene (less dense)', X + 120, 160, { size: 11 }); d.txt(c, 'water', X + 76, 356, { size: 11 }); } },
        subl(t) { d.burner(c, X, BY, .9); if (run) d.flame(c, X, 276, 1, t, .55); d.tripod(c, X, BY, 120, 150); d.beaker(c, X, 226, 100, 110, 0, null); c.fillStyle = 'rgba(244,250,249,.92)'; c.beginPath(); c.moveTo(X - 62, 100); c.quadraticCurveTo(X, 136, X + 62, 100); c.closePath(); c.fill(); d.txt(c, 'dish of cold water', X + 130, 104, { size: 11, color: C.dim }); if (run) { c.fillStyle = p > .8 ? '#CDAE74' : col(); c.fillRect(X - 46, 212, 92, 12); c.fillStyle = 'rgba(150,70,200,' + (.35 * Math.sin(Math.PI * p)) + ')'; c.fillRect(X - 46, 130, 92, 82); for (let i = 0; i < 10 * p; i++) c.fillStyle = '#5B2A86', c.fillRect(X - 30 + i * 6, 120 + (i % 2) * 3, 5, 5); } if (p > .6) { d.txt(c, 'iodine crystals', X - 120, 126, { size: 11 }); d.txt(c, 'sand', X - 86, 218, { size: 11 }); } },
        chrom() { d.beaker(c, X, BY, 130, 190, .12, C.water); d.line(c, X - 80, 186, X + 80, 186, C.wood, 5); c.fillStyle = 'rgba(244,250,249,.95)'; c.fillRect(X - 26, 188, 52, 180); if (run) { c.fillStyle = 'rgba(86,174,255,.18)'; c.fillRect(X - 26, 368 - 170 * p, 52, 170 * p); [['#E5232B', .9], ['#F5A524', .65], ['#2F7FC1', .4], ['#5B3A99', .2]].forEach(q => { c.fillStyle = q[0]; c.globalAlpha = Math.min(1, p * 3); c.beginPath(); c.ellipse(X, 346 - 150 * p * q[1], 14, 6, 0, 0, 7); c.fill(); c.globalAlpha = 1; }); if (p < .25) d.dot(c, X, 346, 8, col()); } else d.dot(c, X, 346, 6, '#1D2230'); d.txt(c, 'solvent', X + 96, 368, { size: 11, color: C.dim }); if (p > .7) d.txt(c, 'separate dyes', X + 84, 260, { size: 11 }); },
        mag(t) { c.fillStyle = 'rgba(244,250,249,.92)'; c.beginPath(); c.moveTo(X - 80, 340); c.quadraticCurveTo(X, 400, X + 80, 340); c.closePath(); c.fill(); const mx = X + Math.sin(t * 1.5) * 40 * (run && p < 1 ? 1 : 0), my = 250; if (run) { c.fillStyle = '#E3D34A'; c.beginPath(); c.moveTo(X - 60, 348); c.quadraticCurveTo(X, 386, X + 60, 348); c.fill(); for (let i = 0; i < 26; i++) { const up = i < 26 * p; d.dot(c, up ? mx - 34 + (i % 13) * 5.5 : X - 50 + i * 4, up ? my + 22 + (i % 3) * 4 : 352 + (i % 4) * 3, 2, '#2A2F33'); } } c.fillStyle = '#D6455A'; c.fillRect(mx - 40, my - 20, 40, 40); c.fillStyle = '#3F6FD8'; c.fillRect(mx, my - 20, 40, 40); d.txt(c, 'N', mx - 20, my, { bold: true }); d.txt(c, 'S', mx + 20, my, { bold: true }); if (p > .6) { d.txt(c, 'iron filings on the magnet', mx + 130, my + 30, { size: 11 }); d.txt(c, 'sulphur left in the dish', X + 150, 372, { size: 11 }); } }
      };
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY); if (run && p < 1) { p = Math.min(1, p + dt / 6); if (p === 1) ui.say('<b>Separated.</b> ' + M[me][2]); }
        draw[me](t);
        if (!bk.off) { d.beaker(c, bk.x, bk.y + 45, 70, 80, .6, col()); d.txt(c, MIX[mk][0], bk.x, bk.y + 62, { size: 11 }); }
        d.txt(c, M[me][0], X, 40, { size: 15, bold: true });
      });
    }
  };

  /* ---------- atom builder ---------- */
  const EL = 'H,Hydrogen,0|He,Helium,2|Li,Lithium,4|Be,Beryllium,5|B,Boron,6|C,Carbon,6|N,Nitrogen,7|O,Oxygen,8|F,Fluorine,10|Ne,Neon,10|Na,Sodium,12|Mg,Magnesium,12|Al,Aluminium,14|Si,Silicon,14|P,Phosphorus,16|S,Sulphur,16|Cl,Chlorine,18|Ar,Argon,22|K,Potassium,20|Ca,Calcium,20'.split('|').map(s => s.split(','));
  const shells = n => { const cap = [2, 8, 8, 2], r = []; cap.forEach(k => { if (n > 0) { r.push(Math.min(k, n)); n -= k; } }); return r; };
  S.atom = {
    title: 'Build an atom', subject: 'chem',
    aim: 'To build atoms of the first 20 elements and relate their particles to atomic number, mass number and electron arrangement.',
    steps: ['Drag protons and neutrons into the nucleus, and electrons into the atom.', 'Or click an element in the mini periodic table to build it at once.', 'Change only the neutrons to make an isotope. Change only the electrons to make an ion.', 'Compare the electron arrangement with the element’s group and period.'],
    init(ui) {
      const c = ui.ctx, X = 290, Y = 215; let p = 1, n = 0, e = 1;
      const rE = ui.read('Element'), rZ = ui.read('Atomic number'), rA = ui.read('Mass number'), rC = ui.read('Electron arrangement'), rQ = ui.read('Charge'), rG = ui.read('Position');
      const grid = HL.el('div', 'ptable'); const pos = [[1, 1], [18, 1], [1, 2], [2, 2], [13, 2], [14, 2], [15, 2], [16, 2], [17, 2], [18, 2], [1, 3], [2, 3], [13, 3], [14, 3], [15, 3], [16, 3], [17, 3], [18, 3], [1, 4], [2, 4]];
      EL.forEach((x, i) => { const b = HL.el('button', 'pt', x[0]); b.type = 'button'; b.title = x[1]; b.style.gridColumn = pos[i][0] > 2 ? pos[i][0] - 10 : pos[i][0]; b.style.gridRow = pos[i][1]; b.onclick = () => { p = e = i + 1; n = +x[2]; }; grid.append(b); });
      ui.panel.append(grid);
      const row = HL.el('div', 'btn-row'); ui.panel.append(row); const old = ui.panel; ui.panel = row;
      ui.button('− proton', () => { p = Math.max(1, p - 1); }); ui.button('− neutron', () => { n = Math.max(0, n - 1); }); ui.button('− electron', () => { e = Math.max(0, e - 1); }); ui.panel = old;
      const bins = [['Proton', C.pink, '+'], ['Neutron', '#9AAAB0', ''], ['Electron', C.blue, '−']];
      bins.forEach((b, i) => ui.thing({ x: 660, y: 110 + i * 110, w: 70, h: 70, onDrop(o) { if (Math.hypot(o.x - X, o.y - Y) < 200) { if (i === 0) p = Math.min(20, p + 1); if (i === 1) n = Math.min(24, n + 1); if (i === 2) e = Math.min(20, e + 1); } o.home(); } }));
      ui.say('Drag particles into the atom, or click an element in the table.');
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H); const sh = shells(e);
        sh.forEach((k, i) => { const r = 62 + i * 36; c.strokeStyle = C.faint; c.lineWidth = 1.5; c.beginPath(); c.arc(X, Y, r, 0, 7); c.stroke(); for (let j = 0; j < k; j++) { const a = j / k * 6.283 + t * (.5 - i * .1); d.dot(c, X + Math.cos(a) * r, Y + Math.sin(a) * r, 6, C.blue); } });
        for (let i = 0; i < p + n; i++) { const a = i * 2.4, r = 5.4 * Math.sqrt(i); d.dot(c, X + Math.cos(a) * r, Y + Math.sin(a) * r, 6.5, Math.floor((i + 1) * p / (p + n)) > Math.floor(i * p / (p + n)) ? C.pink : '#9AAAB0'); }
        bins.forEach((b, i) => { const o = ui.things[i]; d.dot(c, o.x, o.y, 22, b[1]); d.txt(c, b[2], o.x, o.y, { size: 20, bold: true, color: '#0B2A30' }); d.txt(c, b[0] + ' (drag)', 660, 148 + i * 110, { size: 11, color: C.dim }); });
        const x = EL[p - 1], q = p - e;
        d.txt(c, String(p + n), 62, 44, { size: 14, align: 'right' }); d.txt(c, String(p), 62, 70, { size: 14, align: 'right' }); d.txt(c, x[0], 66, 56, { size: 36, bold: true, align: 'left' });
        rE(x[1] + (q ? ' ion' : '') + (n !== +x[2] ? ', a different isotope from the common one' : '')); rZ(p + ' (protons)'); rA((p + n) + ' (protons + neutrons)'); rC(sh.join(' : ') || '–');
        rQ(q === 0 ? '0, a neutral atom' : (q > 0 ? q + '+ , a positive ion (cation)' : -q + '− , a negative ion (anion)')); const ps = shells(p); rG('Period ' + ps.length + ', Group ' + (p === 2 ? 'VIII (0)' : ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII (0)'][ps[ps.length - 1] - 1]));
      });
    }
  };

  /* ---------- formula builder ---------- */
  S.formula = {
    title: 'Writing chemical formulae from valencies', subject: 'chem',
    aim: 'To write the formula and name of an ionic compound by exchanging the valencies of its ions.',
    steps: ['Click one positive ion (cation) on the left and one negative ion (anion) on the right.', 'Follow the arrows: each ion takes the valency of the other as its subscript.', 'Simplify the numbers where possible, and put brackets round a radical when there is more than one.', 'Remember the rule gives a formula on paper. A few of these pairs do not form stable compounds.'],
    init(ui) {
      const c = ui.ctx, gcd = (a, b) => b ? gcd(b, a % b) : a;
      const CA = [['Na', 'Sodium', 1], ['K', 'Potassium', 1], ['Ag', 'Silver', 1], ['NH_4', 'Ammonium', 1, 1], ['Mg', 'Magnesium', 2], ['Ca', 'Calcium', 2], ['Zn', 'Zinc', 2], ['Cu', 'Copper(II)', 2], ['Fe', 'Iron(II)', 2], ['Pb', 'Lead(II)', 2], ['Fe', 'Iron(III)', 3], ['Al', 'Aluminium', 3]];
      const AN = [['Cl', 'chloride', 1], ['Br', 'bromide', 1], ['OH', 'hydroxide', 1, 1], ['NO_3', 'nitrate', 1, 1], ['HCO_3', 'hydrogencarbonate', 1, 1], ['O', 'oxide', 2], ['S', 'sulphide', 2], ['SO_4', 'sulphate', 2, 1], ['CO_3', 'carbonate', 2, 1], ['PO_4', 'phosphate', 3, 1]];
      let a = 4, b = 0; const rN = ui.read('Name'), rV = ui.read('Valencies'), rW = ui.read('Working');
      CA.forEach((x, i) => ui.thing({ x: 56 + (i % 2) * 96, y: 70 + Math.floor(i / 2) * 56, w: 88, h: 44, drag: false, onClick() { a = i; } }));
      AN.forEach((x, i) => ui.thing({ x: 608 + (i % 2) * 96, y: 70 + Math.floor(i / 2) * 56, w: 88, h: 44, drag: false, onClick() { b = i; } }));
      ui.say('Click a cation on the left and an anion on the right.');
      const part = (x, k) => (x[3] && k > 1 ? '(' + x[0] + ')' : x[0]) + (k > 1 ? '_' + k : '');
      ui.loop(() => {
        d.bg(c, ui.W, ui.H); d.txt(c, 'Cations (+)', 104, 28, { size: 13, bold: true }); d.txt(c, 'Anions (−)', 656, 28, { size: 13, bold: true });
        const card = (o, x, sel, sign) => { c.fillStyle = sel ? C.amber : 'rgba(234,244,242,.08)'; d.rr(c, o.x - 44, o.y - 22, 88, 44, 8); c.fill(); d.chem(c, x[0] + '^' + (x[2] > 1 ? x[2] : '') + sign, o.x, o.y - 5, 15, sel ? '#0B2A30' : C.chalk); d.txt(c, x[1], o.x, o.y + 13, { size: 9.5, color: sel ? '#0B2A30' : C.dim }); };
        CA.forEach((x, i) => card(ui.things[i], x, i === a, '+')); AN.forEach((x, i) => card(ui.things[CA.length + i], x, i === b, '-'));
        const A = CA[a], B = AN[b], g = gcd(A[2], B[2]), na = B[2] / g, nb = A[2] / g;
        d.chem(c, A[0], 300, 120, 34, C.pink); d.txt(c, String(A[2]), 300, 80, { size: 20, color: C.pink, bold: true }); d.chem(c, B[0], 460, 120, 34, C.blue); d.txt(c, String(B[2]), 460, 80, { size: 20, color: C.blue, bold: true });
        d.txt(c, 'valency', 380, 80, { size: 11, color: C.dim }); d.arrow(c, 312, 94, 448, 160, C.dim, 1.5); d.arrow(c, 448, 94, 312, 160, C.dim, 1.5);
        d.chem(c, A[0] + '_' + B[2], 300, 182, 22, C.dim); d.chem(c, B[0] + '_' + A[2], 460, 182, 22, C.dim);
        c.fillStyle = 'rgba(8,30,35,.55)'; d.rr(c, 240, 232, 280, 130, 14); c.fill();
        d.chem(c, part(A, na) + part(B, nb), 380, 284, 44, C.chalk); d.txt(c, A[1] + ' ' + B[1], 380, 336, { size: 15, color: C.amber, bold: true });
        rN(A[1] + ' ' + B[1]); rV(A[1] + ' ' + A[2] + ', ' + B[1] + ' ' + B[2]);
        rW('Exchange the valencies: ' + B[2] + ' and ' + A[2] + (g > 1 ? ', then divide both by ' + g : '') + '. Ratio ' + na + ' : ' + nb + '.' + (a === 3 && (b === 5 || b === 6) ? ' This pair is not a stable compound in practice.' : ''));
      });
    }
  };

  /* ---------- metals and dilute acids ---------- */
  S.reactivity = {
    title: 'Reaction of metals with dilute acids', subject: 'chem',
    aim: 'To compare how different metals react with a dilute acid and to test the gas given off.',
    steps: ['Drag a metal from its dish and drop it into the boiling tube of acid.', 'Compare how fast the bubbles form for each metal.', 'Bring the burning splint to the mouth of the tube to test the gas.', 'Press “Fresh acid” before trying the next metal.'],
    init(ui) {
      const c = ui.ctx, X = 380, MT = [['Calcium', 'Ca', 1, '#D9DEDF'], ['Magnesium', 'Mg', .7, '#C9D2D6'], ['Zinc', 'Zn', .35, '#9FB0B8'], ['Iron', 'Fe', .14, '#7B878C'], ['Copper', 'Cu', 0, '#C7773E']];
      let m = -1, acid = 'HCl', gas = 0, bub = [], size = 1, pop = 0, my = 0; const rO = ui.read('Observation'), rW = ui.read('Word equation'), rS = ui.read('Symbol equation');
      const fresh = () => { m = -1; gas = 0; bub = []; size = 1; rO('–'); rW('–'); rS('–'); ui.say('Drag a metal into the tube of acid.'); };
      ui.select('Acid in the tube', [['HCl', 'Dilute hydrochloric acid'], ['H2SO4', 'Dilute sulphuric acid']], v => { acid = v; fresh(); }); ui.button('Fresh acid', fresh);
      MT.forEach((x, i) => ui.thing({ x: 60 + i * 56, y: 356, w: 50, h: 44, onDrop(o) { if (Math.abs(o.x - X) < 34 && o.y < 320 && m < 0) { m = i; my = 150; size = 1; const salt = acid === 'HCl' ? ['chloride', 'Cl_2', '2HCl'] : ['sulphate', 'SO_4', 'H_2SO_4']; const nm = x[0] === 'Iron' ? 'iron(II)' : x[0].toLowerCase(); if (x[2]) { rW(x[0] + ' + ' + (acid === 'HCl' ? 'hydrochloric acid' : 'sulphuric acid') + ' → ' + nm + ' ' + salt[0] + ' + hydrogen'); rS((x[1] + ' + ' + salt[2] + ' → ' + x[1] + salt[1] + ' + H_2').replace(/_(\d)/g, '<sub>$1</sub>')); rO((x[2] > .8 ? 'Very fast bubbling. The tube gets hot.' : x[2] > .5 ? 'Fast bubbling. The metal disappears quickly.' : x[2] > .2 ? 'Steady bubbling.' : 'Slow bubbling.') + (x[0] === 'Calcium' && acid !== 'HCl' ? ' The reaction soon slows, because insoluble calcium sulphate coats the metal.' : '')); ui.say('Now bring the burning splint to the mouth of the tube.'); } else { rO('No bubbles. Copper does not react with dilute acids.'); rW('No reaction'); rS('–'); ui.say('Copper is below hydrogen in the reactivity series, so it cannot displace hydrogen from the acid.'); } } o.home(); } }));
      const sp = ui.thing({ x: 650, y: 300, w: 120, h: 40, onMove(o) { if (pop <= 0 && Math.abs(o.x - 50 - X) < 30 && Math.abs(o.y - 130) < 36) { if (gas > 1.2) { pop = .6; gas = 0; ui.say('<b>Pop!</b> The gas burns with a squeaky pop, so it is hydrogen.'); } else if (m >= 0 && !MT[m][2]) ui.say('No pop. No gas is being produced.'); } } });
      fresh();
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY); d.stand(c, X - 40, BY, 300, 60); d.line(c, X - 30, 180, X - 16, 180, C.steel, 6);
        d.tube(c, X, 350, 44, 220, .55, 'rgba(200,225,245,.35)'); d.txt(c, acid === 'HCl' ? 'dilute HCl' : 'dilute H₂SO₄', X + 80, 300, { size: 11, color: C.dim });
        if (m >= 0) { const r = MT[m][2] * (MT[m][0] === 'Calcium' && acid !== 'HCl' ? Math.max(.08, 1 - gas / 3) : 1); my = Math.min(332, my + 300 * dt); if (my > 240 && r) { size = Math.max(0, size - r * dt * .08); if (size > 0) { gas += r * dt; if (Math.random() < r * 1.2) bub.push({ x: X - 10 + Math.random() * 20, y: 330 }); } } if (size > 0) { c.fillStyle = MT[m][3]; d.rr(c, X - 12 * size, my - 6 * size, 24 * size, 12 * size, 3); c.fill(); } }
        bub = bub.filter(b => { b.y -= 90 * dt; b.x += Math.sin(t * 9 + b.y) * .5; c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 1.2; c.beginPath(); c.arc(b.x, b.y, 3, 0, 7); c.stroke(); return b.y > 232; });
        MT.forEach((x, i) => { const o = ui.things[i]; c.fillStyle = 'rgba(244,250,249,.9)'; if (o.x === o.hx) { c.beginPath(); c.ellipse(o.hx, 368, 24, 7, 0, 0, 7); c.fill(); } c.fillStyle = x[3]; d.rr(c, o.x - 14, o.y - 2, 28, 10, 3); c.fill(); d.txt(c, x[1], o.hx, 396, { size: 12, bold: true }); });
        d.line(c, sp.x - 50, sp.y, sp.x + 60, sp.y + 14, '#E8D2A6', 4); d.flame(c, sp.x - 50, sp.y, 0, t, .2); if (sp.x === sp.hx) d.txt(c, 'Burning splint', sp.x, sp.y + 34, { size: 11, color: C.dim });
        if (pop > 0) { pop -= dt; d.dot(c, X, 124, 60 * (1 - pop), 'rgba(255,220,120,' + pop + ')'); d.txt(c, 'POP!', X, 84, { size: 26, bold: true, color: C.amber }); }
      });
    }
  };

  /* ---------- titration ---------- */
  S.titration = {
    title: 'Neutralising an acid with an alkali (titration)', subject: 'chem',
    aim: 'To find the volume of sodium hydroxide solution that neutralises 25 cm³ of hydrochloric acid, and use it to find the acid’s concentration.',
    steps: ['Choose an indicator. The flask holds 25 cm³ of hydrochloric acid of unknown concentration.', 'Press and hold the burette tap to run in sodium hydroxide (0.1 mol/dm³). The flask is swirled for you.', 'Near the colour change, add one drop at a time until the colour just stays.', 'Read the volume used, then press “Show the working” to check your calculation.'],
    init(ui) {
      const c = ui.ctx, X = 250; let V = 0, Ca = .1, ind = 'php', flow = false, pts = [], show = false;
      const rV = ui.read('Alkali added'), rP = ui.read('pH of the mixture'), rC = ui.read('Colour in the flask'), rW = ui.read('Working');
      const pH = v => { const mol = Ca * 25 - .1 * v, tot = 25 + v; if (Math.abs(mol) < 1e-7) return 7; return mol > 0 ? -Math.log10(mol / tot) : 14 + Math.log10(-mol / tot); };
      const fresh = () => { V = 0; pts = []; show = false; Ca = [.08, .1, .12][Math.floor(Math.random() * 3)]; rW('–'); ui.say('Press and hold the burette tap to add alkali.'); };
      ui.select('Indicator', [['php', 'Phenolphthalein'], ['mo', 'Methyl orange']], v => { ind = v; });
      const add = v => { V = Math.min(50, V + v); pts.push([V, pH(V)]); };
      ui.button('Add one drop', () => add(.05)); ui.button('Show the working', () => { show = true; }); ui.button('New acid sample', fresh);
      ui.thing({ x: X, y: 262, w: 70, h: 44, drag: false, onDown() { flow = true; }, onUp() { flow = false; } });
      fresh();
      ui.loop((dt, t) => {
        d.bg(c, ui.W, ui.H, BY); if (flow) add(dt * 2.5); const p = pH(V);
        d.stand(c, X - 80, BY, 350, 96);
        // burette
        c.fillStyle = 'rgba(200,225,245,.4)'; c.fillRect(X - 7, 40 + V * 4, 14, 200 - V * 4 + 8); c.strokeStyle = C.glass; c.lineWidth = 2; c.strokeRect(X - 8, 30, 16, 218); for (let i = 0; i <= 50; i += 5) { d.line(c, X - 8, 40 + i * 4, X - (i % 10 ? 2 : -2), 40 + i * 4, C.glass, 1); if (i % 10 === 0) d.txt(c, String(i), X + 22, 40 + i * 4, { size: 10, color: C.dim }); }
        d.line(c, X, 248, X, 282, C.glass, 4); c.fillStyle = flow ? C.green : C.amber; d.rr(c, X - 20, 256, 40, 12, 4); c.fill(); d.txt(c, 'Tap: press and hold', X + 84, 262, { size: 11, color: C.dim }); d.txt(c, 'NaOH 0.1 mol/dm³', X + 78, 60, { size: 11, color: C.dim });
        if (flow) d.dot(c, X, 286 + (t * 160) % 36, 3, 'rgba(200,230,255,.9)');
        const col = ind === 'php' ? (p > 8.3 ? 'rgba(240,60,150,' + clamp((p - 8) / 2, .35, .8) + ')' : 'rgba(225,240,245,.3)') : (p < 3.5 ? 'rgba(232,60,60,.8)' : p < 4.5 ? 'rgba(245,150,40,.85)' : 'rgba(250,212,60,.85)');
        d.flask(c, X + (flow ? Math.sin(t * 14) * 3 : 0), BY, 120, 96, .28 + V * .006, col);
        d.graph(c, 500, 70, 210, 200, { xmax: 50, ymax: 14, xl: 'Volume of NaOH added (cm³)', yl: 'pH', pts, color: C.pink }); d.line(c, 500, 170, 710, 170, C.faint, 1, [4, 4]); d.txt(c, 'pH 7', 722, 170, { size: 10, color: C.dim });
        rV(V.toFixed(2) + ' cm³'); rP(p.toFixed(1)); rC(ind === 'php' ? (p > 8.3 ? 'Pink: alkali is now in excess' : 'Colourless: still acidic or neutral') : (p < 3.5 ? 'Red: acidic' : p < 4.5 ? 'Orange: close to the end point' : 'Yellow: the acid is used up'));
        if (show) { const ve = Ca * 250; rW(V < ve - .3 ? 'Not neutralised yet. Keep adding alkali until the colour just changes.' : 'HCl + NaOH → NaCl + H<sub>2</sub>O, so the moles are equal.<br>End point ≈ ' + ve.toFixed(1) + ' cm³.<br>C<sub>acid</sub> = (0.1 × ' + ve.toFixed(1) + ') ÷ 25 = <b>' + Ca.toFixed(2) + ' mol/dm³</b>'); }
      });
    }
  };
})();

/* Herieth-Lab app shell: sign-in, routing, lessons, practicals, quizzes, progress */
(function () {
  const HL = window.HL, $ = s => document.querySelector(s), el = HL.el;
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  /* ---------- session and server ----------
     Accounts live on the server (netlify/functions/api.mjs). The browser keeps only a signed token. */
  const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }, del(k) { try { localStorage.removeItem(k); } catch (e) { } } };
  const sess = {
    get() { try { return JSON.parse(localStorage.getItem('herieth-lab.session') || sessionStorage.getItem('herieth-lab.session')); } catch (e) { return null; } },
    set(v, remember) { try { this.del(); (remember ? localStorage : sessionStorage).setItem('herieth-lab.session', JSON.stringify(v)); } catch (e) { } },
    del() { try { localStorage.removeItem('herieth-lab.session'); sessionStorage.removeItem('herieth-lab.session'); } catch (e) { } }
  };
  let session = sess.get(); if (session && !session.token) { sess.del(); session = null; }
  let user = session && session.user, prog = { done: {}, quiz: {} }, reqCount = null;
  const isAdmin = () => !!user && user.role === 'admin';
  const progKey = () => 'herieth-lab.progress.' + (user ? user.email : '');
  const save = () => store.set(progKey(), prog);
  async function api(path, method, body) {
    let r;
    try { r = await fetch('/api/' + path, { method: method || 'GET', headers: Object.assign({ 'content-type': 'application/json' }, session ? { authorization: 'Bearer ' + session.token } : {}), body: body ? JSON.stringify(body) : undefined }); }
    catch (e) { throw new Error('Could not reach Herieth-Lab. Check your internet connection and try again.'); }
    let d = {}; try { d = await r.json(); } catch (e) { }
    if (r.status === 401 && session && path !== 'login' && path !== 'password') { signOut(d.error || 'Your session has ended. Please sign in again.'); throw new Error('signed-out'); }
    if (!r.ok) throw new Error(d.error || 'Something went wrong. Try again in a moment.');
    return d;
  }
  const record = ev => { if (user && !isAdmin()) api('progress', 'POST', ev).catch(() => { }); };
  function signOut(msg) { session = null; user = null; prog = { done: {}, quiz: {} }; sess.del(); if (location.hash) history.replaceState(null, '', location.pathname); showLogin(msg); }

  /* ---------- icons ---------- */
  const IC = {
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9"/>', beaker: '<path d="M6 3h12M7 3v15a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V3M7 12h10"/>', tube: '<path d="M9 3h6M10 3v14a2 2 0 0 0 4 0V3M10 11h4"/>',
    flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>', atom: '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
    magnet: '<path d="M6 4v8a6 6 0 0 0 12 0V4h-4v8a2 2 0 0 1-4 0V4zM6 8h4M14 8h4"/>', prism: '<path d="M12 4l8 15H4zM1 14h7M16 12l7-2M16.5 14.5l6.5 1.5"/>', pendulum: '<path d="M4 4h16M12 4L7.6 15.6"/><circle cx="7" cy="18" r="2.5"/>',
    spring: '<path d="M12 2v3l-4 1.5 8 2-8 2 8 2-8 2 4 1.5v1M9 18h6v4H9z"/>', bulb: '<path d="M9 17h6M10 20.5h4M8.5 14a6 6 0 1 1 7 0c-.6.6-.9 1.3-.9 2H9.4c0-.7-.3-1.4-.9-2z"/>', lens: '<path d="M12 3c3 3 3 15 0 18c-3-3-3-15 0-18zM2 12h20"/>',
    balance: '<path d="M12 4v16M6 20h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>', ruler: '<path d="M3 15L15 3l6 6L9 21zM7.5 13.5l2 2M10.5 10.5l2 2M13.5 7.5l2 2"/>', drop: '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    boat: '<path d="M3 14h18l-3 5H6zM12 14V4l6 7h-6M2 22c2-1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 5 0"/>', gauge: '<path d="M4 17a8 8 0 1 1 16 0M12 17l4-6M3 20h18"/>', trolley: '<path d="M3 8h18v7H3z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    bolt: '<path d="M13 2L5 13h6l-1 9 8-12h-6z"/>', eye: '<path d="M2 12c3-5 7-7 10-7s7 2 10 7c-3 5-7 7-10 7s-7-2-10-7z"/><circle cx="12" cy="12" r="3"/>', table: '<path d="M3 5h4v4H3zM17 5h4v4h-4zM3 11h4v4H3zM9 11h4v4H9zM15 11h6v4h-6zM3 17h18v3H3z"/>',
    bond: '<circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/><path d="M11 12h2"/>', shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4"/>'
  };
  Object.assign(IC, {
    vector: '<path d="M4 20L18 6M18 6h-7M18 6v7M4 20h12"/>', friction: '<path d="M3 18h18M6 18v-6h9v6M15 15h6M18 12l3 3-3 3"/>', thermo: '<path d="M10 4a2 2 0 0 1 4 0v10a4 4 0 1 1-4 0zM12 9v8"/>',
    wave: '<path d="M2 12c2-5 4-5 6 0s4 5 6 0 4-5 6 0"/>', coil: '<path d="M3 12h3M18 12h3M6 12c0-4 2-4 2 0s2 4 2 0 2-4 2 0 2 4 2 0 2-4 2 0"/>', radio: '<circle cx="12" cy="12" r="2"/><path d="M12 10L8 3h8zM10.3 13l-7 4 4 6.5zM13.7 13l7 4-4 6.5z"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>', planet: '<circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(-20 12 12)"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>', scale: '<path d="M12 4v16M5 20h14M4 8h16M4 8l-2 6h4zM20 8l-2 6h4z"/>', mole: '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><circle cx="12" cy="16" r="3"/>',
    burette: '<path d="M10 2h4v14h-4zM10 6h2M10 10h2M12 16v4M8 22h8"/>', clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>', factory: '<path d="M3 21V11l5 3V11l5 3V5h4v16zM3 21h18"/>',
    hex: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 8l4 2.3v4.4L12 17l-4-2.3v-4.4z"/>', leaf: '<path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15zM5 19l8-8"/>', search: '<circle cx="10" cy="10" r="6"/><path d="M15 15l6 6"/>'
  });
  const icon = n => '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[n] || IC.flask) + '</svg>';

  /* ---------- helpers ---------- */
  const courses = () => !user || isAdmin() ? HL.courses : HL.courses.filter(c => (user.scopes || []).includes(c.id)), course = id => courses().find(c => c.id === id);
  const key = (c, t) => c.id + '/' + t.id, best = (c, t) => prog.quiz[key(c, t)];
  const subjName = s => (s === 'phy' ? 'Physics' : 'Chemistry');
  const formName = n => ['One', 'Two', 'Three', 'Four'][n - 1];
  const NUMW = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  let stopSim = null;
  const bench = '<svg class="bench-art" viewBox="0 0 520 300" aria-hidden="true"><g fill="none" stroke="#CDEEF2" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">' +
    '<rect x="0" y="262" width="520" height="38" fill="#1B4A52" stroke="none"/><path d="M0 262h520" stroke="rgba(234,244,242,.3)"/>' +
    '<path d="M70 262l10-14h36l10 14z" fill="#6F8891" stroke="none"/><rect x="90" y="170" width="16" height="80" fill="#A9BCC3" stroke="none"/><path class="fl" d="M82 170c-6-30 12-46 16-74 4 28 22 44 16 74z" fill="#56AEFF" stroke="none" opacity=".85"/><path class="fl" d="M90 170c-2-14 6-22 8-34 2 12 10 20 8 34z" fill="#BEF0FF" stroke="none"/>' +
    '<path d="M40 150h116" stroke="#A9BCC3" stroke-width="4"/><path d="M48 150l-10 112M148 150l10 112" stroke="#A9BCC3" stroke-width="3"/>' +
    '<path d="M68 148V96l-4-6h68l-4 6v52" /><path d="M70 146V116h56v30z" fill="rgba(86,174,255,.45)" stroke="none"/>' +
    '<circle class="bb b1" cx="84" cy="140" r="3"/><circle class="bb b2" cx="100" cy="140" r="2.5"/><circle class="bb b3" cx="114" cy="140" r="3"/>' +
    '<path d="M236 70h18v70l44 110a8 8 0 0 1-8 12h-90a8 8 0 0 1-8-12l44-110z"/><path d="M216 210h58l22 44a4 4 0 0 1-4 6h-94a4 4 0 0 1-4-6z" fill="rgba(192,138,240,.55)" stroke="none"/>' +
    '<circle class="bb b2" cx="236" cy="246" r="3"/><circle class="bb b3" cx="256" cy="246" r="2.5"/><circle class="bb b1" cx="246" cy="246" r="2"/>' +
    '<path d="M340 262V40h100" stroke="#A9BCC3" stroke-width="4"/><path d="M316 262h60" stroke="#A9BCC3" stroke-width="6"/><g class="pend"><path d="M420 40v150" stroke="#EAF4F2" stroke-width="1.5"/><circle cx="420" cy="204" r="15" fill="#F5A524" stroke="none"/></g>' +
    '<path d="M470 262v-90l-10-8h36l-10 8v90" /><path d="M472 260v-52h12v52z" fill="rgba(255,111,163,.6)" stroke="none"/></g></svg>';

  const LOGO = '<svg class="logo-mark" viewBox="0 0 64 64" aria-hidden="true"> <rect x="1" y="1" width="62" height="62" rx="16" fill="var(--logo-tile)" stroke="var(--logo-edge)" stroke-width="2"/> <path d="M15.5 30h11v13.5a5.5 5.5 0 0 1-11 0z" fill="#56AEFF"/> <path d="M37.5 24h11v19.5a5.5 5.5 0 0 1-11 0z" fill="#C08AF0"/> <rect x="26" y="29" width="12" height="7" rx="1.5" fill="#F5A524"/> <g fill="none" stroke="var(--logo-glass)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"> <path d="M13 13h16M15.5 13v30.5a5.5 5.5 0 0 0 11 0V13"/> <path d="M35 13h16M37.5 13v30.5a5.5 5.5 0 0 0 11 0V13"/> </g> <circle cx="21" cy="38" r="1.8" fill="#FFFFFF" fill-opacity=".85"/> <circle cx="44" cy="30" r="1.5" fill="#FFFFFF" fill-opacity=".85"/> <circle cx="42" cy="40" r="2.1" fill="#FFFFFF" fill-opacity=".85"/> </svg>';
  const brand = '<span class="brand-t">Herieth<b>-Lab</b></span>';

  /* ---------- the teacher (shown on the landing page) ---------- */
  const BIO = '<section class="bio" aria-labelledby="bio-h"><div class="bio-card"><div class="bio-face"><img src="img/herieth.jpg" alt="Herieth Msagati" width="150" height="150" loading="lazy"></div><div class="bio-text"><h2 id="bio-h">Meet your teacher</h2><p class="bio-name">Herieth Msagati</p><p class="bio-role">STEM educator, Physics and Chemistry</p>' +
    '<p>My name is Herieth Msagati, and I am a passionate STEM educator who teaches Physics and Chemistry in government and NGO secondary schools in Tanzania. I believe science is learned best by doing, so I designed Herieth-Lab to support students and educators across Tanzania, with lessons to read, practicals to try with your own hands, and quizzes to check what you have learned.</p>' +
    '<p>Beyond the classroom, I mentor students in innovation and problem-solving through STEM projects, support extracurricular activities, and help students grow as whole people through sports and life-skills programmes.</p>' +
    '<p>I am committed to empowering young people, especially girls, to pursue careers in STEM. I keep building my own skills in data-driven decision-making, educational innovation and leadership.</p>' +
    '<p class="bio-mail"><a href="mailto:sciencewithherieth@gmail.com">sciencewithherieth@gmail.com</a> &nbsp;·&nbsp; <a href="https://www.linkedin.com/in/herieth-msagati-767862419/" rel="noopener" target="_blank">LinkedIn</a></p></div></div></section>';

  /* ---------- sign-in and account request ---------- */
  const SCOPE_ROWS = [['phy', 'Physics'], ['chem', 'Chemistry']];
  const scopeLabel = id => subjName(id.startsWith('phy') ? 'phy' : 'chem') + ' Form ' + formName(+id.slice(-1));
  const scopeText = list => SCOPE_ROWS.map(r => { const f = (list || []).filter(x => x.startsWith(r[0])).map(x => x.slice(-1)).sort(); return f.length ? r[1] + ' ' + f.join(', ') : ''; }).filter(Boolean).join('; ') || 'None';
  const scopePicker = (name, chosen) => '<div class="scope-grid">' + SCOPE_ROWS.map(r => '<span class="scope-sub">' + r[1] + '</span>' + [1, 2, 3, 4].map(f => { const id = r[0] + f; return '<label class="pill-check"><input type="checkbox" name="' + name + '" value="' + id + '"' + ((chosen || []).includes(id) ? ' checked' : '') + '><span>Form ' + f + '</span></label>'; }).join('')).join('') + '</div>';
  const picked = (root, name) => [...root.querySelectorAll('input[name="' + name + '"]:checked')].map(i => i.value);
  const busy = (btn, on, label) => { if (!btn.dataset.label) btn.dataset.label = btn.textContent; btn.disabled = on; btn.textContent = on ? label : btn.dataset.label; };

  function showLogin(msg) {
    if (stopSim) { stopSim(); stopSim = null; }
    document.body.className = 'is-login';
    $('#app').innerHTML = '<main class="login"><section class="login-art">' + bench + '<div class="login-words"><p class="wordmark">' + LOGO + brand + '</p><h1>Physics and chemistry you can pick up and try.</h1><p>Lessons, hands-on practicals and self-marking quizzes for Form One to Form Four.</p></div></section>' +
      '<section class="login-form"><div class="login-card">' +
      '<form id="lf" novalidate><h2>Sign in</h2><p class="muted">Use the email address and password Herieth gave you.</p>' +
      '<label for="em">Email address</label><input id="em" type="email" autocomplete="username" required placeholder="you@example.com">' +
      '<label for="pw">Password</label><div class="pw"><input id="pw" type="password" autocomplete="current-password" required><button type="button" id="pwt" class="btn btn-ghost">Show</button></div>' +
      '<label class="check"><input id="rm" type="checkbox" checked> Keep me signed in on this device</label>' +
      '<p id="le" class="err" role="alert">' + esc(msg || '') + '</p><button class="btn btn-main btn-wide" type="submit">Sign in</button>' +
      '<p class="switch">New to Herieth-Lab? <button type="button" class="linkish" id="toReq">Request an account</button></p></form>' +
      '<form id="rf" novalidate hidden><h2>Request an account</h2><p class="muted">Tell Herieth who you are and what you want to study. When she accepts your request, she will give you your password.</p>' +
      '<label for="rn">Full name</label><input id="rn" autocomplete="name" required maxlength="80">' +
      '<label for="re">Email address</label><input id="re" type="email" autocomplete="email" required>' +
      '<label for="rs">School <span class="opt-l">(optional)</span></label><input id="rs" autocomplete="organization" maxlength="100">' +
      '<fieldset class="scopes"><legend>What do you want to study?</legend>' + scopePicker('rq') + '</fieldset>' +
      '<label for="rmsg">Message to Herieth <span class="opt-l">(optional)</span></label><textarea id="rmsg" rows="3" maxlength="500"></textarea>' +
      '<p id="rerr" class="err" role="alert"></p><button class="btn btn-main btn-wide" type="submit" id="rsend">Send request</button>' +
      '<p class="switch">Already have an account? <button type="button" class="linkish" id="toLogin">Sign in</button></p></form>' +
      '</div></section></main>' + BIO;
    const show = which => { $('#lf').hidden = which !== 'lf'; $('#rf').hidden = which !== 'rf'; $(which === 'lf' ? '#em' : '#rn').focus(); };
    $('#toReq').onclick = () => show('rf'); $('#toLogin').onclick = () => show('lf');
    $('#pwt').onclick = () => { const p = $('#pw'); p.type = p.type === 'password' ? 'text' : 'password'; $('#pwt').textContent = p.type === 'password' ? 'Show' : 'Hide'; };
    $('#lf').onsubmit = async e => {
      e.preventDefault(); const em = $('#em').value.trim().toLowerCase(), pw = $('#pw').value, btn = $('#lf button[type=submit]');
      if (!em || !pw) { $('#le').textContent = 'Enter both your email address and your password.'; return; }
      busy(btn, true, 'Signing in…'); $('#le').textContent = '';
      try { const d = await api('login', 'POST', { email: em, password: pw, remember: $('#rm').checked }); session = { token: d.token, user: d.user }; sess.set(session, $('#rm').checked); user = d.user; boot(); }
      catch (err) { $('#le').textContent = err.message; busy(btn, false); }
    };
    $('#rf').onsubmit = async e => {
      e.preventDefault(); const f = $('#rf'), btn = $('#rsend'), body = { name: $('#rn').value.trim(), email: $('#re').value.trim(), school: $('#rs').value.trim(), note: $('#rmsg').value.trim(), scopes: picked(f, 'rq') };
      if (body.name.length < 2) { $('#rerr').textContent = 'Enter your full name.'; return; }
      if (!/^\S+@\S+\.\S+$/.test(body.email)) { $('#rerr').textContent = 'Enter a valid email address.'; return; }
      if (!body.scopes.length) { $('#rerr').textContent = 'Choose at least one subject and form.'; return; }
      busy(btn, true, 'Sending…'); $('#rerr').textContent = '';
      try { const d = await api('request', 'POST', body); f.innerHTML = '<div class="sent" role="status"><h2>Request sent</h2><p>Thank you, ' + esc(body.name.split(' ')[0]) + '. ' + (d.updated ? 'Your earlier request has been updated. ' : '') + 'Herieth will look at your request and give you your password when she accepts it.</p><p class="muted">You asked for: ' + esc(scopeText(body.scopes)) + '.</p><button type="button" class="btn btn-ghost" id="toLogin2">Back to sign in</button></div>'; $('#toLogin2').onclick = () => showLogin(); }
      catch (err) { $('#rerr').textContent = err.message; busy(btn, false); }
    };
    $('#em').focus();
  }

  /* ---------- frame ---------- */
  function frame(html, active) {
    if (stopSim) { stopSim(); stopSim = null; }
    document.body.className = isAdmin() ? 'is-admin' : '';
    const link = (h, t, k, badge) => '<a href="' + h + '"' + (active === k ? ' aria-current="page"' : '') + '>' + t + (badge ? ' <span class="badge">' + badge + '</span>' : '') + '</a>';
    const has = sj => courses().some(c => c.subject === sj);
    const nav = isAdmin()
      ? link('#/dash', 'Dashboard', 'dash') + link('#/dash/requests', 'Requests', 'req', reqCount) + link('#/dash/students', 'Students', 'stu') + link('#/dash/reports', 'Reports', 'rep') + link('#/lessons', 'Lessons', 'home') + link('#/lab', 'Practicals', 'lab') + link('#/dash/settings', 'Settings', 'set')
      : link('#/', 'Home', 'home') + (has('phy') ? link('#/s/phy', 'Physics', 'phy') : '') + (has('chem') ? link('#/s/chem', 'Chemistry', 'chem') : '') + link('#/lab', 'Practicals', 'lab') + link('#/progress', 'Progress', 'progress');
    $('#app').innerHTML = '<header class="top"><a class="wordmark" href="#/" aria-label="Herieth-Lab home">' + LOGO + brand + '</a><nav aria-label="Main">' + nav + '</nav><button class="btn btn-ghost" id="out">Sign out</button></header><main class="page" id="main">' + html + '</main><footer class="foot">Herieth-Lab follows the chapter order of the Tanzania Institute of Education Form One to Form Four Physics and Chemistry textbooks.</footer>';
    $('#out').onclick = () => signOut();
    window.scrollTo(0, 0);
  }
  const topicCard = (c, t, i) => { const b = best(c, t), dn = prog.done[key(c, t)]; return '<a class="topic ' + c.subject + '" href="#/t/' + c.id + '/' + t.id + '"><span class="topic-ic">' + icon(t.icon) + '</span><span class="topic-n">Chapter ' + (i + 1) + '</span><strong>' + esc(t.title) + '</strong><span class="topic-b">' + esc(t.blurb) + '</span><span class="chips">' + (dn ? '<span class="chip ok">Lesson done</span>' : '') + (b ? '<span class="chip ' + (b.s / b.n >= .5 ? 'ok' : 'low') + '">Quiz ' + b.s + '/' + b.n + '</span>' : '') + (t.sims.length ? '<span class="chip">' + t.sims.length + (t.sims.length > 1 ? ' practicals' : ' practical') + '</span>' : '') + '</span></a>'; };

  function home() {
    const tot = courses().reduce((n, c) => n + c.topics.length, 0), dn = Object.keys(prog.done).length, qz = Object.keys(prog.quiz).length;
    const nc = courses().length;
    frame('<section class="hero"><div><h1>Welcome, ' + esc(user.name.split(' ')[0]) + '.</h1><p>' + (NUMW[nc] || nc).replace(/^./, m => m.toUpperCase()) + ' course' + (nc === 1 ? '' : 's') + ', ' + tot + ' chapters and ' + labIds().length + ' practicals you can run on screen. ' + (isAdmin() ? 'Pick a form to teach from, or go straight to the bench.' : 'Pick a form to study, or go straight to the bench.') + '</p><p class="hero-act"><a class="btn btn-amber" href="#/lab">Open the practicals</a><a class="btn btn-line" href="#/progress">' + dn + ' lessons done, ' + qz + ' quizzes taken</a></p></div>' + bench + '</section>' +
      ['phy', 'chem'].filter(sj => courses().some(c => c.subject === sj)).map(sj => '<section class="shelf ' + sj + '"><h2 class="h-sec"><a href="#/s/' + sj + '">' + subjName(sj) + '</a></h2><div class="courses">' + courses().filter(c => c.subject === sj).sort((a, b) => a.form - b.form).map(c => { const done = c.topics.filter(t => prog.done[key(c, t)]).length; return '<a class="course ' + c.subject + '" href="#/c/' + c.id + '"><span class="course-form">' + subjName(c.subject) + '</span><strong>Form ' + formName(c.form) + '</strong><span>' + c.topics.length + ' chapters' + (done ? ', ' + done + ' done' : '') + '</span><span class="course-list">' + c.topics.map(t => esc(t.title)).join(', ') + '</span></a>'; }).join('') + '</div></section>').join(''), 'home');
  }
  function subject(s) {
    if (!courses().some(c => c.subject === s)) return home();
    frame('<h1 class="h-page">' + subjName(s) + '</h1>' + courses().filter(c => c.subject === s).sort((a, b) => a.form - b.form).map(c => '<h2 class="h-sec">Form ' + formName(c.form) + '</h2><div class="topics">' + c.topics.map((t, i) => topicCard(c, t, i)).join('') + '</div>').join(''), s);
  }
  function coursePage(c) {
    frame('<p class="crumb"><a href="#/s/' + c.subject + '">' + subjName(c.subject) + '</a></p><h1 class="h-page">' + esc(c.title) + '</h1><div class="topics">' + c.topics.map((t, i) => topicCard(c, t, i)).join('') + '</div>', c.subject);
  }

  /* ---------- practical block ---------- */
  function practical(host, ids, pick) {
    const id = ids.includes(pick) ? pick : ids[0], s = HL.sims[id];
    host.innerHTML = (ids.length > 1 ? '<div class="pills" role="tablist">' + ids.map(x => '<button role="tab" aria-selected="' + (x === id) + '" data-sim="' + x + '">' + esc(HL.sims[x].title) + '</button>').join('') + '</div>' : '') +
      '<div class="prac-head"><h2>' + esc(s.title) + '</h2><p><b>Aim:</b> ' + esc(s.aim) + '</p></div><div id="simhost"></div><div class="prac-steps"><h3>What to do</h3><ol>' + s.steps.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol></div>';
    host.querySelectorAll('[data-sim]').forEach(b => (b.onclick = () => { if (stopSim) stopSim(); practical(host, ids, b.dataset.sim); }));
    stopSim = HL.mount(id, host.querySelector('#simhost'));
  }

  /* ---------- quiz ---------- */
  function quiz(host, c, t) {
    const qs = t.quiz.map(q => { const o = q[1].map((x, i) => ({ x, ok: i === q[2] })).sort(() => Math.random() - .5); return { q: q[0], o, why: q[3], pick: -1 }; });
    let marked = false;
    const draw = () => {
      const score = qs.filter(q => q.pick >= 0 && q.o[q.pick].ok).length, left = qs.filter(q => q.pick < 0).length;
      host.innerHTML = (marked ? '<div class="score ' + (score / qs.length >= .5 ? 'ok' : 'low') + '" role="status"><strong>' + score + ' out of ' + qs.length + '</strong><span>' + (score === qs.length ? 'Every answer correct.' : score / qs.length >= .5 ? 'Read the explanations for the ones you missed.' : 'Go back over the lesson, then try again.') + '</span><button class="btn btn-main" id="again">Try again</button></div>' : '') +
        '<ol class="quiz">' + qs.map((q, i) => '<li><p class="q">' + esc(q.q) + '</p><div class="opts">' + q.o.map((o, j) => '<button type="button" class="opt' + (q.pick === j ? ' picked' : '') + (marked ? (o.ok ? ' right' : q.pick === j ? ' wrong' : '') : '') + '" data-q="' + i + '" data-o="' + j + '"' + (marked ? ' disabled' : '') + ' aria-pressed="' + (q.pick === j) + '">' + esc(o.x) + (marked && o.ok ? ' <em>correct</em>' : marked && q.pick === j ? ' <em>your answer</em>' : '') + '</button>').join('') + '</div>' + (marked ? '<p class="why">' + esc(q.why) + '</p>' : '') + '</li>').join('') + '</ol>' +
        (marked ? '' : '<div class="quiz-act"><button class="btn btn-main" id="mark">Mark my answers</button><span class="muted" id="left">' + (left ? left + ' still to answer' : 'All answered') + '</span></div>');
      host.querySelectorAll('.opt').forEach(b => (b.onclick = () => { qs[+b.dataset.q].pick = +b.dataset.o; draw(); }));
      const m = host.querySelector('#mark'); if (m) m.onclick = () => { if (qs.some(q => q.pick < 0) && !confirmSkip(host)) return; marked = true; const s = qs.filter(q => q.pick >= 0 && q.o[q.pick].ok).length, b = best(c, t); if (!b || s > b.s) { prog.quiz[key(c, t)] = { s, n: qs.length }; save(); } record({ type: 'quiz', key: key(c, t), s, n: qs.length }); draw(); host.scrollIntoView({ block: 'start' }); };
      const a = host.querySelector('#again'); if (a) a.onclick = () => quiz(host, c, t);
    };
    draw();
  }
  function confirmSkip(host) { const l = host.querySelector('#left'); if (l.dataset.warned) return true; l.dataset.warned = 1; l.textContent = 'Some questions are unanswered and will be marked wrong. Press “Mark my answers” again to continue.'; l.className = 'err'; return false; }

  function topicPage(c, t, tab, pick) {
    const i = c.topics.indexOf(t), prev = c.topics[i - 1], next = c.topics[i + 1], base = '#/t/' + c.id + '/' + t.id;
    tab = tab || 'lesson';
    const tabs = [['lesson', 'Lesson'], ['practical', 'Practical' + (t.sims.length > 1 ? 's' : '')], ['quiz', 'Quiz']];
    frame('<p class="crumb"><a href="#/s/' + c.subject + '">' + subjName(c.subject) + '</a> / <a href="#/c/' + c.id + '">Form ' + formName(c.form) + '</a></p>' +
      '<div class="topic-head ' + c.subject + '"><span class="topic-ic big">' + icon(t.icon) + '</span><div><p class="topic-n">Chapter ' + (i + 1) + '</p><h1>' + esc(t.title) + '</h1><p>' + esc(t.blurb) + '</p></div></div>' +
      '<div class="tabs" role="tablist">' + tabs.map(x => '<a role="tab" href="' + base + '/' + x[0] + '" aria-selected="' + (tab === x[0]) + '">' + x[1] + '</a>').join('') + '</div><div id="pane" class="pane"></div>' +
      '<nav class="pager" aria-label="Chapters">' + (prev ? '<a href="#/t/' + c.id + '/' + prev.id + '">Previous: ' + esc(prev.title) + '</a>' : '<span></span>') + (next ? '<a href="#/t/' + c.id + '/' + next.id + '">Next: ' + esc(next.title) + '</a>' : '<span></span>') + '</nav>', c.subject);
    const pane = $('#pane');
    if (tab === 'lesson') {
      const dn = prog.done[key(c, t)];
      pane.innerHTML = '<article class="notes">' + t.notes.map(n => '<section><h2>' + esc(n[0]) + '</h2>' + n[1] + '</section>').join('') + '</article><div class="lesson-act"><button class="btn ' + (dn ? 'btn-ghost' : 'btn-main') + '" id="done">' + (dn ? 'Lesson done. Mark as not done' : 'Mark this lesson as done') + '</button>' + (t.sims.length ? '<a class="btn btn-line" href="' + base + '/practical">Do the practical</a>' : '') + '<a class="btn btn-line" href="' + base + '/quiz">Take the quiz</a></div>';
      $('#done').onclick = () => { const was = !!prog.done[key(c, t)]; if (was) delete prog.done[key(c, t)]; else prog.done[key(c, t)] = 1; save(); record({ type: 'lesson', key: key(c, t), done: !was }); topicPage(c, t, 'lesson'); };
    } else if (tab === 'practical') {
      if (t.sims.length) practical(pane, t.sims, pick);
      else pane.innerHTML = '<p class="empty">This chapter has no laboratory practical. Read the lesson, then take the quiz.</p>';
    } else quiz(pane, c, t);
  }

  const labIds = () => isAdmin() ? Object.keys(HL.sims) : Object.keys(HL.sims).filter(id => courses().some(c => c.topics.some(t => t.sims.includes(id))));
  function lab(pick) {
    if (pick && HL.sims[pick] && labIds().includes(pick)) { frame('<p class="crumb"><a href="#/lab">All practicals</a></p><div id="pane" class="pane"></div>', 'lab'); practical($('#pane'), [pick]); return; }
    const card = id => { const s = HL.sims[id]; return '<a class="topic ' + s.subject + '" href="#/lab/' + id + '"><strong>' + esc(s.title) + '</strong><span class="topic-b">' + esc(s.aim) + '</span></a>'; };
    const firstForm = id => { let f = 9; courses().forEach(c => c.topics.forEach(t => { if (t.sims.includes(id)) f = Math.min(f, c.form); })); return f; };
    const ids = labIds();
    frame('<h1 class="h-page">Practicals</h1><p class="lead">Every practical can be run here on its own. Drag, click and pour on the bench just as you would in the laboratory. Each is listed under the form where it first appears.</p>' + ['phy', 'chem'].map(s => (ids.some(i => HL.sims[i].subject === s) ? '<h2 class="h-sec">' + subjName(s) + '</h2>' : '') + [1, 2, 3, 4, 9].map(f => { const list = ids.filter(i => HL.sims[i].subject === s && firstForm(i) === f); return list.length ? '<h3 class="h-sub">' + (f === 9 ? 'Extra' : 'Form ' + formName(f)) + '</h3><div class="topics">' + list.map(card).join('') + '</div>' : ''; }).join('')).join(''), 'lab');
  }
  function progress() {
    frame('<h1 class="h-page">Progress</h1><p class="lead">' + (isAdmin() ? 'You are signed in as the teacher, so nothing here is recorded. See student progress on the Students and Reports pages.' : 'Your progress is saved to your account, so it follows you to any device you sign in on.') + '</p>' + courses().map(c => '<h2 class="h-sec">' + esc(c.title) + '</h2><table class="ptab"><thead><tr><th>Chapter</th><th>Lesson</th><th>Best quiz score</th></tr></thead><tbody>' + c.topics.map((t, i) => { const b = best(c, t); return '<tr><td><a href="#/t/' + c.id + '/' + t.id + '">' + (i + 1) + '. ' + esc(t.title) + '</a></td><td>' + (prog.done[key(c, t)] ? 'Done' : 'Not yet') + '</td><td>' + (b ? b.s + ' / ' + b.n : 'Not taken') + '</td></tr>'; }).join('') + '</tbody></table>').join(''), 'progress');
  }

  /* ---------- Herieth's dashboard ---------- */
  const findTopic = k => { const [cid, tid] = k.split('/'), c = HL.courses.find(x => x.id === cid), t = c && c.topics.find(x => x.id === tid); return c && t ? { c, t, n: c.topics.indexOf(t) + 1 } : null; };
  const topicLabel = k => { const f = findTopic(k); return f ? f.t.title + ' (' + subjName(f.c.subject) + ' Form ' + formName(f.c.form) + ')' : k; };
  const ago = ms => { if (!ms) return 'Never'; const m = (Date.now() - ms) / 60000; return m < 1 ? 'Just now' : m < 60 ? Math.round(m) + ' min ago' : m < 1440 ? Math.round(m / 60) + ' h ago' : m < 2880 ? 'Yesterday' : Math.round(m / 1440) + ' days ago'; };
  const day = ms => ms ? new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '–';
  const pct = x => x == null ? '–' : Math.round(x * 100) + '%';
  const genPw = () => { const a = 'abcdefghjkmnpqrstuvwxyz23456789', r = new Uint32Array(8); crypto.getRandomValues(r); return [...r].map(v => a[v % a.length]).join(''); };
  const avgOf = u => { let t = 0, s2 = 0; Object.values(u.quiz || {}).forEach(q => { t += q.tries; s2 += q.sum; }); return t ? s2 / t : null; };
  const confirmBtn = (btn, label, fn) => { btn.onclick = () => { if (btn.dataset.armed) return fn(); btn.dataset.armed = 1; const old = btn.textContent; btn.textContent = label; btn.classList.add('danger'); setTimeout(() => { if (btn.isConnected) { delete btn.dataset.armed; btn.textContent = old; btn.classList.remove('danger'); } }, 4000); }; };
  const loading = (title, lead, k) => { frame('<h1 class="h-page">' + title + '</h1>' + (lead ? '<p class="lead">' + lead + '</p>' : '') + '<div id="dz" class="dz"><p class="muted">Loading…</p></div>', k); return $('#dz'); };
  const failBox = (host, e) => { if (e.message !== 'signed-out' && host.isConnected) host.innerHTML = '<p class="err">' + esc(e.message) + '</p><button class="btn btn-ghost" onclick="location.reload()">Try again</button>'; };
  const copyBtn = (btn, textToCopy) => { btn.onclick = async () => { try { await navigator.clipboard.writeText(textToCopy); btn.textContent = 'Copied'; } catch (e) { btn.textContent = 'Select the text and copy it'; } }; };

  async function dash() {
    const host = loading('Dashboard', '', 'dash');
    try {
      const s2 = await api('admin/stats'); reqCount = s2.requests || null; frame('<h1 class="h-page">Dashboard</h1><div id="dz" class="dz"></div>', 'dash');
      const ch = Object.entries(s2.chapters).map(([k, v]) => ({ k, avg: v.sum / v.tries, tries: v.tries, students: v.students })).sort((a, b) => a.avg - b.avg);
      $('#dz').innerHTML = '<div class="tiles">' +
        '<a class="tile" href="#/dash/students"><b>' + s2.students + '</b><span>Students</span></a>' +
        '<a class="tile' + (s2.requests ? ' hot' : '') + '" href="#/dash/requests"><b>' + s2.requests + '</b><span>Requests waiting</span></a>' +
        '<div class="tile"><b>' + s2.active + '</b><span>Active in the last 7 days</span></div>' +
        '<div class="tile"><b>' + s2.attempts + '</b><span>Quizzes taken (' + s2.week + ' this week)</span></div>' +
        '<div class="tile"><b>' + pct(s2.avg) + '</b><span>Average quiz score</span></div></div>' +
        '<div class="dash-cols"><section class="panel"><h2>Chapters by average quiz score</h2><p class="muted">Lowest first, so you can see what to revisit.</p>' +
        (ch.length ? '<ol class="bars">' + ch.slice(0, 12).map(x => '<li><span class="bar-l">' + esc(topicLabel(x.k)) + '</span><span class="bar-t"><span class="bar-f' + (x.avg < .5 ? ' low' : '') + '" style="width:' + Math.max(2, x.avg * 100) + '%"></span></span><span class="bar-v">' + pct(x.avg) + ' <small>' + x.tries + ' tries</small></span></li>').join('') + '</ol>' : '<p class="empty">No quizzes taken yet. Scores appear here once students start.</p>') + '</section>' +
        '<section class="panel"><h2>Recent activity</h2>' + (s2.recent.length ? '<ul class="feed">' + s2.recent.map(e => '<li><b>' + esc(e.name) + '</b> ' + (e.t === 'quiz' ? 'scored ' + e.s + '/' + e.n + ' on' : e.done ? 'finished the lesson' : 'unmarked the lesson') + ' ' + esc(topicLabel(e.k)) + '<small>' + ago(e.at) + '</small></li>').join('') + '</ul>' : '<p class="empty">Nothing yet.</p>') + '</section></div>' +
        '<section class="panel"><h2>Teach a lesson</h2><p class="muted">Open any course to teach from it. You see every form and subject.</p><div class="chips big">' + HL.courses.slice().sort((a, b) => a.subject.localeCompare(b.subject) * -1 || a.form - b.form).map(c => '<a class="chip ' + c.subject + '" href="#/c/' + c.id + '">' + subjName(c.subject) + ' Form ' + formName(c.form) + '</a>').join('') + '</div></section>';
    } catch (e) { failBox(host, e); }
  }

  const accountForm = (o) => '<div class="acc-form">' + (o.withEmail ? '<div class="two"><label>Full name<input name="name" value="' + esc(o.name || '') + '" maxlength="80"></label><label>Email address<input name="email" type="email" value="' + esc(o.email || '') + '"></label></div><label>School <span class="opt-l">(optional)</span><input name="school" maxlength="100"></label>' : '<label>Name on the account<input name="name" value="' + esc(o.name || '') + '" maxlength="80"></label>') +
    '<fieldset class="scopes"><legend>Access</legend>' + scopePicker('sc', o.scopes) + '</fieldset>' +
    '<label>Password for the student</label><div class="pw"><input name="password" value="' + genPw() + '" autocomplete="off" spellcheck="false"><button type="button" class="btn btn-ghost gen">New password</button></div>' +
    '<p class="err"></p><div class="row-act"><button type="button" class="btn btn-main go">' + o.go + '</button><button type="button" class="btn btn-ghost cancel">Cancel</button></div></div>';
  const wireForm = (box, onGo, onCancel) => { box.querySelector('.gen').onclick = () => { box.querySelector('[name=password]').value = genPw(); }; box.querySelector('.cancel').onclick = onCancel; const go = box.querySelector('.go'); go.onclick = async () => { const v = n => (box.querySelector('[name=' + n + ']') || {}).value, data = { name: (v('name') || '').trim(), email: (v('email') || '').trim(), school: (v('school') || '').trim(), password: (v('password') || '').trim(), scopes: picked(box, 'sc') }; busy(go, true, 'Saving…'); box.querySelector('.err').textContent = ''; try { await onGo(data); } catch (e) { box.querySelector('.err').textContent = e.message; busy(go, false); } }; };
  const credentials = (name, email, pw) => '<div class="creds" role="status"><h3>Account ready for ' + esc(name) + '</h3><p>Give these sign-in details to the student. The password is shown only now; you can set a new one later from the Students page.</p><dl><dt>Email</dt><dd>' + esc(email) + '</dd><dt>Password</dt><dd><code>' + esc(pw) + '</code></dd></dl><button type="button" class="btn btn-main copy">Copy details</button></div>';

  async function requestsPage() {
    const host = loading('Account requests', 'Students ask for an account on the sign-in page. Accept a request to create the account and choose its password, then give the password to the student.', 'req');
    try {
      const { requests } = await api('admin/requests'); reqCount = requests.length || null;
      frame('<h1 class="h-page">Account requests</h1><p class="lead">Students ask for an account on the sign-in page. Accept a request to create the account and choose its password, then give the password to the student.</p><p><button class="btn btn-line" id="addStu">Add a student without a request</button></p><div id="addBox"></div><div id="dz" class="dz"></div>', 'req');
      const dz = $('#dz');
      $('#addStu').onclick = () => { const b = $('#addBox'); b.innerHTML = '<section class="card-req open"><h2>Add a student</h2>' + accountForm({ withEmail: true, scopes: [], go: 'Create account' }) + '</section>'; wireForm(b, async d => { await api('admin/users', 'POST', d); b.innerHTML = credentials(d.name, d.email.toLowerCase(), d.password); copyBtn(b.querySelector('.copy'), 'Herieth-Lab sign-in\nEmail: ' + d.email.toLowerCase() + '\nPassword: ' + d.password); }, () => { b.innerHTML = ''; }); };
      if (!requests.length) { dz.innerHTML = '<p class="empty">No requests waiting. New requests from the sign-in page will appear here.</p>'; return; }
      dz.innerHTML = requests.map((r, i) => '<section class="card-req" data-i="' + i + '"><div class="req-top"><div><h2>' + esc(r.name) + '</h2><p class="muted">' + esc(r.email) + (r.school ? ' · ' + esc(r.school) : '') + '</p></div><p class="muted">' + day(r.updated || r.at) + '</p></div><p><b>Wants:</b> ' + esc(scopeText(r.scopes)) + '</p>' + (r.note ? '<blockquote>' + esc(r.note) + '</blockquote>' : '') + '<div class="row-act"><button class="btn btn-main acc">Accept…</button><button class="btn btn-ghost del">Delete request</button></div><div class="box"></div></section>').join('');
      dz.querySelectorAll('.card-req').forEach(card => {
        const r = requests[+card.dataset.i], box = card.querySelector('.box'), acts = card.querySelector('.row-act');
        card.querySelector('.acc').onclick = () => { acts.hidden = true; box.innerHTML = accountForm({ name: r.name, scopes: r.scopes, go: 'Create account' }); wireForm(box, async d => { await api('admin/requests/' + encodeURIComponent(r.id) + '/accept', 'POST', d); card.classList.add('done'); card.innerHTML = credentials(d.name || r.name, r.email, d.password); copyBtn(card.querySelector('.copy'), 'Herieth-Lab sign-in\nEmail: ' + r.email + '\nPassword: ' + d.password); reqCount = Math.max(0, (reqCount || 1) - 1) || null; }, () => { box.innerHTML = ''; acts.hidden = false; }); };
        confirmBtn(card.querySelector('.del'), 'Press again to delete', async () => { try { await api('admin/requests/' + encodeURIComponent(r.id), 'DELETE'); card.remove(); reqCount = Math.max(0, (reqCount || 1) - 1) || null; if (!dz.querySelector('.card-req')) dz.innerHTML = '<p class="empty">No requests waiting.</p>'; } catch (e) { box.innerHTML = '<p class="err">' + esc(e.message) + '</p>'; } });
      });
    } catch (e) { failBox(host, e); }
  }

  async function studentsPage() {
    const host = loading('Students', '', 'stu');
    try {
      const { users } = await api('admin/users');
      frame('<h1 class="h-page">Students</h1><p class="lead">' + users.length + ' student account' + (users.length === 1 ? '' : 's') + '. Open “Manage” to change a student’s access, give them a new password or delete the account.</p><div class="tools"><input id="q" type="search" placeholder="Search by name, email or school" aria-label="Search students"><a class="btn btn-line" href="#/dash/requests">Add a student</a></div><div id="dz" class="dz"></div>', 'stu');
      const draw = () => {
        const q = $('#q').value.trim().toLowerCase(), list = users.filter(u => !q || (u.name + ' ' + u.email + ' ' + u.school).toLowerCase().includes(q));
        $('#dz').innerHTML = !users.length ? '<p class="empty">No students yet. Accept a request to create the first account.</p>' : !list.length ? '<p class="empty">No student matches “' + esc(q) + '”.</p>' :
          '<div class="table-wrap"><table class="ptab stu"><thead><tr><th>Student</th><th>Access</th><th>Lessons done</th><th>Quizzes</th><th>Average</th><th>Last active</th><th></th></tr></thead><tbody>' + list.map(u => '<tr data-e="' + esc(u.email) + '"><td><b>' + esc(u.name) + '</b><br><small>' + esc(u.email) + (u.school ? '<br>' + esc(u.school) : '') + '</small></td><td>' + esc(scopeText(u.scopes)) + '</td><td>' + Object.keys(u.done).length + '</td><td>' + Object.keys(u.quiz).length + '</td><td>' + pct(avgOf(u)) + '</td><td>' + ago(u.last) + '</td><td><button class="btn btn-ghost man">Manage</button></td></tr><tr class="mrow" hidden><td colspan="7"></td></tr>').join('') + '</tbody></table></div>';
        $('#dz').querySelectorAll('.man').forEach(b => b.onclick = () => {
          const tr = b.closest('tr'), u = users.find(x => x.email === tr.dataset.e), cell = tr.nextElementSibling.firstElementChild; tr.nextElementSibling.hidden = !tr.nextElementSibling.hidden; if (tr.nextElementSibling.hidden) return;
          cell.innerHTML = '<div class="manage"><section><h3>Access</h3>' + scopePicker('sc', u.scopes) + '<button class="btn btn-main sv">Save access</button><p class="msg1 muted"></p></section><section><h3>New password</h3><div class="pw"><input class="np" value="' + genPw() + '" autocomplete="off" spellcheck="false"><button class="btn btn-ghost gen">New</button></div><button class="btn btn-main sp">Set this password</button><div class="msg2"></div></section><section><h3>Other</h3><a class="btn btn-line" href="#/dash/reports/' + encodeURIComponent(u.email) + '">View report</a><button class="btn btn-ghost dl">Delete student</button><p class="msg3 err"></p></section></div>';
          cell.querySelector('.gen').onclick = () => { cell.querySelector('.np').value = genPw(); };
          cell.querySelector('.sv').onclick = async () => { const m = cell.querySelector('.msg1'); try { const sc = picked(cell, 'sc'); await api('admin/users/' + encodeURIComponent(u.email), 'PATCH', { scopes: sc }); u.scopes = sc; m.textContent = 'Access saved: ' + scopeText(sc) + '. It applies next time the student opens Herieth-Lab.'; tr.children[1].textContent = scopeText(sc); } catch (e) { m.textContent = e.message; } };
          cell.querySelector('.sp').onclick = async () => { const m = cell.querySelector('.msg2'), pw = cell.querySelector('.np').value.trim(); try { await api('admin/users/' + encodeURIComponent(u.email), 'PATCH', { password: pw }); m.innerHTML = credentials(u.name, u.email, pw); copyBtn(m.querySelector('.copy'), 'Herieth-Lab sign-in\nEmail: ' + u.email + '\nPassword: ' + pw); } catch (e) { m.innerHTML = '<p class="err">' + esc(e.message) + '</p>'; } };
          confirmBtn(cell.querySelector('.dl'), 'Press again: delete ' + u.name.split(' ')[0] + ' and all their progress', async () => { try { await api('admin/users/' + encodeURIComponent(u.email), 'DELETE'); users.splice(users.indexOf(u), 1); draw(); } catch (e) { cell.querySelector('.msg3').textContent = e.message; } });
        });
      };
      $('#q').oninput = draw; draw();
    } catch (e) { failBox(host, e); }
  }

  async function reportsPage(who) {
    const host = loading('Reports', '', 'rep');
    try {
      const { users } = await api('admin/users'); const u = who && users.find(x => x.email === decodeURIComponent(who));
      const rows = [], cols = u ? ['Course', 'Chapter', 'Lesson', 'Quiz attempts', 'Best score', 'Average score'] : ['Course', 'Chapter', 'Students with access', 'Finished the lesson', 'Took the quiz', 'Average score'];
      const cs = HL.courses.filter(c => u ? u.scopes.includes(c.id) : users.some(x => x.scopes.includes(c.id)));
      let html = '';
      cs.forEach(c => {
        const trs = c.topics.map((t, i) => { const k = c.id + '/' + t.id, ch = (i + 1) + '. ' + t.title; let r;
          if (u) { const q = u.quiz[k]; r = [c.title, ch, u.done[k] ? 'Done' : 'Not yet', q ? q.tries : 0, q ? q.best + '/' + q.n : '–', q ? pct(q.sum / q.tries) : '–']; }
          else { const acc = users.filter(x => x.scopes.includes(c.id)), dn = acc.filter(x => x.done[k]).length, qz = acc.filter(x => x.quiz[k]), av = qz.length ? qz.reduce((a, x) => a + x.quiz[k].sum / x.quiz[k].tries, 0) / qz.length : null; r = [c.title, ch, acc.length, dn, qz.length, pct(av)]; }
          rows.push(r); return '<tr>' + r.slice(1).map(v => '<td>' + esc(v) + '</td>').join('') + '</tr>'; }).join('');
        html += '<h2 class="h-sec">' + esc(c.title) + '</h2><div class="table-wrap"><table class="ptab"><thead><tr>' + cols.slice(1).map(x => '<th>' + x + '</th>').join('') + '</tr></thead><tbody>' + trs + '</tbody></table></div>';
      });
      const head = u ? '<div class="rep-head"><p><b>' + esc(u.name) + '</b> · ' + esc(u.email) + (u.school ? ' · ' + esc(u.school) : '') + '</p><p>Access: ' + esc(scopeText(u.scopes)) + ' · Account since ' + day(u.createdAt) + ' · Last active ' + ago(u.last).toLowerCase() + '</p><p>Lessons done: <b>' + Object.keys(u.done).length + '</b> · Quizzes taken: <b>' + Object.keys(u.quiz).length + '</b> · Average quiz score: <b>' + pct(avgOf(u)) + '</b></p></div>'
        : '<div class="rep-head"><p><b>Whole class</b> · ' + users.length + ' students · Report date ' + day(Date.now()) + '</p></div>';
      frame('<h1 class="h-page">Reports</h1><div class="tools no-print"><label class="inline">Report for <select id="who"><option value="">Whole class</option>' + users.map(x => '<option value="' + esc(x.email) + '"' + (u && u.email === x.email ? ' selected' : '') + '>' + esc(x.name) + '</option>').join('') + '</select></label><button class="btn btn-main" id="pr">Print or save as PDF</button><button class="btn btn-line" id="csv">Download spreadsheet (CSV)</button></div>' +
        '<div class="report"><p class="print-only wordmark">' + LOGO + brand + '<span class="rep-word">report</span></p>' + head + (cs.length ? html : '<p class="empty">' + (users.length ? 'This student has no courses yet.' : 'No students yet. Reports appear once you accept requests.') + '</p>') + '</div>', 'rep');
      $('#who').onchange = e => { location.hash = '#/dash/reports' + (e.target.value ? '/' + encodeURIComponent(e.target.value) : ''); };
      $('#pr').onclick = () => window.print();
      $('#csv').onclick = () => { const q = v => '"' + String(v).replace(/"/g, '""') + '"', csv = [cols, ...rows].map(r => r.map(q).join(',')).join('\r\n'), a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv' })); a.download = 'herieth-lab-report-' + (u ? u.name.replace(/\W+/g, '-').toLowerCase() : 'class') + '-' + new Date().toISOString().slice(0, 10) + '.csv'; document.body.append(a); a.click(); a.remove(); };
    } catch (e) { failBox(host, e); }
  }

  function settingsPage() {
    frame('<h1 class="h-page">Settings</h1><section class="panel narrow"><h2>Change your password</h2><form id="cp" novalidate><label for="c0">Current password</label><input id="c0" type="password" autocomplete="current-password"><label for="c1">New password</label><input id="c1" type="password" autocomplete="new-password"><label for="c2">Type the new password again</label><input id="c2" type="password" autocomplete="new-password"><p class="err" id="cpe" role="alert"></p><button class="btn btn-main">Change password</button></form></section>' +
      '<section class="panel narrow"><h2>Your account</h2><p>' + esc(user.name) + ' · ' + esc(user.email) + '</p><p class="muted">Signed in as the teacher. You can see every course, and nothing you do in lessons or quizzes is recorded as student progress.</p></section>', 'set');
    $('#cp').onsubmit = async e => { e.preventDefault(); const a = $('#c0').value, b = $('#c1').value, c = $('#c2').value, m = $('#cpe'), btn = $('#cp button'); m.className = 'err';
      if (b.length < 6) { m.textContent = 'The new password must have at least 6 characters.'; return; } if (b !== c) { m.textContent = 'The two new passwords are different. Type them again.'; return; }
      busy(btn, true, 'Saving…'); try { const d = await api('password', 'POST', { current: a, next: b }); session.token = d.token; sess.set(session, !!localStorage.getItem('herieth-lab.session')); m.className = 'ok-msg'; m.textContent = 'Password changed. Use the new one next time you sign in.'; $('#cp').reset(); } catch (err) { m.textContent = err.message; } busy(btn, false); };
  }

  function route() {
    if (!user) return showLogin();
    const p = location.hash.replace(/^#\/?/, '').split('/');
    if (p[0] === 'dash' && isAdmin()) { if (p[1] === 'requests') return requestsPage(); if (p[1] === 'students') return studentsPage(); if (p[1] === 'reports') return reportsPage(p[2]); if (p[1] === 'settings') return settingsPage(); return dash(); }
    if (p[0] === 's' && (p[1] === 'phy' || p[1] === 'chem')) return subject(p[1]);
    if (p[0] === 'c' && course(p[1])) return coursePage(course(p[1]));
    if (p[0] === 't' && course(p[1])) { const c = course(p[1]), t = c.topics.find(x => x.id === p[2]); if (t) return topicPage(c, t, p[3], p[4]); }
    if (p[0] === 'lab') return lab(p[1]);
    if (p[0] === 'progress') return progress();
    if (p[0] === 'lessons' || !isAdmin()) return home();
    dash();
  }

  async function boot() {
    if (!session) return showLogin();
    $('#app').innerHTML = '<p class="booting">Opening Herieth-Lab…</p>';
    try { const d = await api('me'); user = session.user = d.user; } catch (e) { if (!session) return; }
    prog = store.get(progKey(), { done: {}, quiz: {} });
    if (!isAdmin()) { try { const p2 = await api('progress'); prog = { done: Object.fromEntries(Object.keys(p2.done).map(k => [k, 1])), quiz: Object.fromEntries(Object.entries(p2.quiz).map(([k, q]) => [k, { s: q.best, n: q.n }])) }; save(); } catch (e) { if (!session) return; } }
    else api('admin/stats').then(s2 => { reqCount = s2.requests || null; const a = document.querySelector('.top nav a[href="#/dash/requests"]'); if (a && reqCount && !a.querySelector('.badge')) a.insertAdjacentHTML('beforeend', ' <span class="badge">' + reqCount + '</span>'); }).catch(() => { });
    route();
  }
  window.addEventListener('hashchange', () => { if (session) route(); });
  boot();
})();

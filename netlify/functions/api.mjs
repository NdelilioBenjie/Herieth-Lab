/* Herieth-Lab API: account requests, sign-in, student progress and Herieth's dashboard.
   Runs as one Netlify Function at /api/*. Data is kept in a Netlify Blobs store called "herieth-lab". */
import crypto from 'node:crypto';

const ADMIN_EMAIL = 'sciencewithherieth@gmail.com';
// Starting password for Herieth's account, stored only as a salted scrypt hash.
// After she changes it in Settings, the new hash lives in the data store instead.
const ADMIN_SEED = { salt: '72f6169bcf78a2b44a59ccdb7f70f8bd', hash: '89c1732dd7d7e7bcfcbeb8ae33f49280d4e27f193d5d7398895b54252e8cc904' };
const SCOPES = ['phy1', 'phy2', 'phy3', 'phy4', 'chem1', 'chem2', 'chem3', 'chem4'];
const DAY = 864e5;

/* ---------- storage ---------- */
let storeCache;
async function db() {
  if (globalThis.__HERIETH_LAB_STORE__) return globalThis.__HERIETH_LAB_STORE__; // local testing
  if (!storeCache) { const { getStore } = await import('@netlify/blobs'); storeCache = getStore({ name: 'herieth-lab', consistency: 'strong' }); }
  return storeCache;
}
const getJ = async k => (await db()).get(k, { type: 'json' });
const setJ = async (k, v) => (await db()).setJSON(k, v);
const del = async k => (await db()).delete(k);
const keys = async prefix => ((await (await db()).list({ prefix })).blobs || []).map(b => b.key);

/* ---------- helpers ---------- */
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
const fail = (message, status = 400) => json({ error: message }, status);
const cleanEmail = e => String(e || '').trim().toLowerCase();
const okEmail = e => /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(e);
const text = (s, n) => String(s || '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);
const cleanScopes = a => [...new Set((Array.isArray(a) ? a : []).filter(s => SCOPES.includes(s)))];
const hashPw = (pw, salt) => crypto.scryptSync(String(pw), salt, 32).toString('hex');
const samePw = (pw, rec) => { const a = Buffer.from(hashPw(pw, rec.salt), 'hex'), b = Buffer.from(rec.hash, 'hex'); return a.length === b.length && crypto.timingSafeEqual(a, b); };
const newPw = pw => { const salt = crypto.randomBytes(16).toString('hex'); return { salt, hash: hashPw(pw, salt) }; };
const b64 = s => Buffer.from(s).toString('base64url');

async function secret() {
  if (process.env.HERIETH_LAB_SECRET) return process.env.HERIETH_LAB_SECRET;
  let s = await getJ('config/secret');
  if (!s) { s = { v: crypto.randomBytes(32).toString('hex') }; await setJ('config/secret', s); }
  return s.v;
}
async function sign(payload) { const body = b64(JSON.stringify(payload)); const mac = crypto.createHmac('sha256', await secret()).update(body).digest('base64url'); return body + '.' + mac; }
async function verify(token) {
  const [body, mac] = String(token || '').split('.'); if (!body || !mac) return null;
  const good = crypto.createHmac('sha256', await secret()).update(body).digest('base64url');
  if (good.length !== mac.length || !crypto.timingSafeEqual(Buffer.from(good), Buffer.from(mac))) return null;
  try { const p = JSON.parse(Buffer.from(body, 'base64url').toString()); return p.x > Date.now() ? p : null; } catch { return null; }
}

async function getUser(email) {
  const u = await getJ('user/' + email);
  if (u) return u;
  if (email === ADMIN_EMAIL) return { email, name: 'Herieth Msagati', role: 'admin', scopes: SCOPES, ...ADMIN_SEED, v: 1, createdAt: 0 };
  return null;
}
const pub = u => ({ email: u.email, name: u.name, role: u.role, scopes: u.role === 'admin' ? SCOPES : u.scopes });

async function auth(req) {
  const p = await verify((req.headers.get('authorization') || '').replace(/^Bearer\s+/i, ''));
  if (!p) return null;
  const u = await getUser(p.e);
  if (!u || u.v !== p.v) return null; // deleted, or password changed since this sign-in
  return u;
}

/* ---------- progress ---------- */
const emptyProg = () => ({ done: {}, quiz: {}, events: [], last: 0 });
async function getProg(email) { return (await getJ('prog/' + email)) || emptyProg(); }

/* ---------- routes ---------- */
async function route(req, path) {
  const m = req.method;
  const body = m === 'POST' || m === 'PATCH' ? await req.json().catch(() => ({})) : {};

  if (path === 'request' && m === 'POST') {
    const email = cleanEmail(body.email), name = text(body.name, 80), scopes = cleanScopes(body.scopes);
    if (name.length < 2) return fail('Enter your full name.');
    if (!okEmail(email)) return fail('Enter a valid email address.');
    if (!scopes.length) return fail('Choose at least one subject and form.');
    if (email === ADMIN_EMAIL || await getJ('user/' + email)) return fail('This email address already has an account. Sign in instead, or ask Herieth to reset your password.');
    const existing = await getJ('req/' + email);
    await setJ('req/' + email, { id: email, name, email, scopes, school: text(body.school, 100), note: text(body.note, 500), at: existing ? existing.at : Date.now(), updated: existing ? Date.now() : 0 });
    return json({ ok: true, updated: !!existing });
  }

  if (path === 'login' && m === 'POST') {
    const email = cleanEmail(body.email), lockKey = 'lock/' + email;
    const lock = (await getJ(lockKey)) || { n: 0, until: 0 };
    if (lock.until > Date.now()) return fail('Too many wrong attempts. Wait ' + Math.ceil((lock.until - Date.now()) / 60000) + ' minutes and try again.', 429);
    const u = email && await getUser(email);
    if (!u || !samePw(body.password || '', u)) {
      lock.n += 1; if (lock.n >= 5) { lock.until = Date.now() + 10 * 60000; lock.n = 0; } await setJ(lockKey, lock);
      if (!u && await getJ('req/' + email)) return fail('Your account request has not been accepted yet. Herieth will give you your password when it is.', 401);
      return fail('That email address and password do not match. Check for typing mistakes and try again.', 401);
    }
    if (lock.n) await del(lockKey);
    const token = await sign({ e: u.email, v: u.v, x: Date.now() + (body.remember ? 30 : 1) * DAY });
    return json({ token, user: pub(u) });
  }

  const me = await auth(req);
  if (!me) return fail('Your session has ended. Please sign in again.', 401);

  if (path === 'me' && m === 'GET') return json({ user: pub(me) });

  if (path === 'progress' && m === 'GET') { const p = await getProg(me.email); return json({ done: p.done, quiz: p.quiz }); }
  if (path === 'progress' && m === 'POST') {
    if (me.role === 'admin') return json({ ok: true });
    const k = text(body.key, 60); if (!/^[a-z0-9]+\/[a-z0-9]+$/.test(k)) return fail('Bad chapter.');
    const p = await getProg(me.email), now = Date.now();
    if (body.type === 'lesson') { if (body.done) p.done[k] = now; else delete p.done[k]; p.events.push({ t: 'lesson', k, done: !!body.done, at: now }); }
    else if (body.type === 'quiz') {
      const s = Math.max(0, Math.min(50, body.s | 0)), n = Math.max(1, Math.min(50, body.n | 0)), q = p.quiz[k] || { best: 0, n, tries: 0, sum: 0, last: 0 };
      q.tries += 1; q.sum += s / n; q.n = n; q.best = Math.max(q.best, s); q.last = s; q.at = now; p.quiz[k] = q; p.events.push({ t: 'quiz', k, s, n, at: now });
    } else return fail('Unknown progress type.');
    p.events = p.events.slice(-200); p.last = now; await setJ('prog/' + me.email, p);
    return json({ ok: true });
  }

  if (path === 'password' && m === 'POST') {
    if (!samePw(body.current || '', me)) return fail('Your current password is not correct.');
    if (String(body.next || '').length < 6) return fail('The new password must have at least 6 characters.');
    const u = { ...me, ...newPw(body.next), v: (me.v || 1) + 1 }; await setJ('user/' + me.email, u);
    return json({ token: await sign({ e: u.email, v: u.v, x: Date.now() + 30 * DAY }), user: pub(u) });
  }

  /* ----- Herieth only ----- */
  if (!path.startsWith('admin/')) return fail('Not found.', 404);
  if (me.role !== 'admin') return fail('Only Herieth can do this.', 403);
  const seg = path.split('/');

  if (path === 'admin/requests' && m === 'GET') {
    const list = await Promise.all((await keys('req/')).map(getJ));
    return json({ requests: list.filter(Boolean).sort((a, b) => b.at - a.at) });
  }
  if (seg[1] === 'requests' && seg[2]) {
    const id = decodeURIComponent(seg[2]), r = await getJ('req/' + id);
    if (!r) return fail('That request no longer exists.', 404);
    if (m === 'DELETE') { await del('req/' + id); return json({ ok: true }); }
    if (seg[3] === 'accept' && m === 'POST') {
      const pw = String(body.password || ''); if (pw.length < 6) return fail('The password must have at least 6 characters.');
      const scopes = cleanScopes(body.scopes); if (!scopes.length) return fail('Give the student at least one subject and form.');
      if (await getJ('user/' + r.email)) return fail('This email already has an account.');
      const u = { email: r.email, name: text(body.name, 80) || r.name, role: 'student', scopes, school: r.school, ...newPw(pw), v: 1, createdAt: Date.now() };
      await setJ('user/' + r.email, u); await del('req/' + id);
      return json({ ok: true, user: pub(u) });
    }
  }

  if (path === 'admin/users' && m === 'GET') {
    const us = (await Promise.all((await keys('user/')).map(getJ))).filter(u => u && u.role === 'student');
    const out = await Promise.all(us.map(async u => { const p = await getProg(u.email); return { email: u.email, name: u.name, school: u.school || '', scopes: u.scopes, createdAt: u.createdAt, last: p.last, done: p.done, quiz: p.quiz }; }));
    return json({ users: out.sort((a, b) => a.name.localeCompare(b.name)) });
  }
  if (path === 'admin/users' && m === 'POST') { // add a student directly, without a request
    const email = cleanEmail(body.email), name = text(body.name, 80), scopes = cleanScopes(body.scopes), pw = String(body.password || '');
    if (name.length < 2 || !okEmail(email)) return fail('Enter the student’s full name and a valid email address.');
    if (!scopes.length) return fail('Give the student at least one subject and form.');
    if (pw.length < 6) return fail('The password must have at least 6 characters.');
    if (email === ADMIN_EMAIL || await getJ('user/' + email)) return fail('This email already has an account.');
    await setJ('user/' + email, { email, name, role: 'student', scopes, school: text(body.school, 100), ...newPw(pw), v: 1, createdAt: Date.now() }); await del('req/' + email);
    return json({ ok: true });
  }
  if (seg[1] === 'users' && seg[2]) {
    const email = cleanEmail(decodeURIComponent(seg[2])), u = await getJ('user/' + email);
    if (!u || u.role !== 'student') return fail('That student no longer exists.', 404);
    if (m === 'DELETE') { await del('user/' + email); await del('prog/' + email); return json({ ok: true }); }
    if (m === 'PATCH') {
      if (body.scopes) { const s = cleanScopes(body.scopes); if (!s.length) return fail('Give the student at least one subject and form.'); u.scopes = s; }
      if (body.name) u.name = text(body.name, 80);
      if (body.password) { if (String(body.password).length < 6) return fail('The password must have at least 6 characters.'); Object.assign(u, newPw(body.password)); u.v = (u.v || 1) + 1; }
      await setJ('user/' + email, u); return json({ ok: true });
    }
  }

  if (path === 'admin/stats' && m === 'GET') {
    const emails = (await keys('user/')).map(k => k.slice(5)).filter(e => e !== ADMIN_EMAIL);
    const reqs = (await keys('req/')).length, now = Date.now(), ch = {}, recent = [];
    let attempts = 0, week = 0, sum = 0, active = 0, lessons = 0;
    for (const e of emails) {
      const u = await getJ('user/' + e), p = await getProg(e); if (!u) continue;
      if (p.last > now - 7 * DAY) active++;
      lessons += Object.keys(p.done).length;
      for (const [k, q] of Object.entries(p.quiz)) { const c = ch[k] || (ch[k] = { tries: 0, sum: 0, students: 0 }); c.tries += q.tries; c.sum += q.sum; c.students++; attempts += q.tries; sum += q.sum; }
      for (const ev of p.events) { if (ev.t === 'quiz' && ev.at > now - 7 * DAY) week++; recent.push({ ...ev, name: u.name }); }
    }
    recent.sort((a, b) => b.at - a.at);
    return json({ students: emails.length, requests: reqs, active, lessons, attempts, week, avg: attempts ? sum / attempts : null, chapters: ch, recent: recent.slice(0, 12) });
  }

  return fail('Not found.', 404);
}

export default async (req) => {
  const path = new URL(req.url).pathname.replace(/^\/api\/?/, '').replace(/\/+$/, '');
  try { return await route(req, path); }
  catch (e) { console.error(e); return fail('Something went wrong on the server. Try again in a moment.', 500); }
};

export const config = { path: '/api/*' };

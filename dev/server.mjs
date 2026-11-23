/* Local test server: serves public/ and runs the API with a file-backed store (dev/data.json).
   Not used on Netlify. Run with: node dev/server.mjs  then open http://localhost:8888 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url)), pub = path.join(root, '..', 'public'), dataFile = path.join(root, 'data.json');
const data = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf8')) : {};
const persist = () => fs.writeFileSync(dataFile, JSON.stringify(data, null, 1));
globalThis.__HERIETH_LAB_STORE__ = {
  async get(k) { return k in data ? JSON.parse(JSON.stringify(data[k])) : null; },
  async setJSON(k, v) { data[k] = v; persist(); },
  async delete(k) { delete data[k]; persist(); },
  async list({ prefix = '' } = {}) { return { blobs: Object.keys(data).filter(k => k.startsWith(prefix)).map(key => ({ key })) }; }
};
const api = (await import('../netlify/functions/api.mjs')).default;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/api/')) {
    const chunks = []; for await (const c of req) chunks.push(c);
    const r = await api(new Request(url, { method: req.method, headers: req.headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks) }));
    res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(await r.text()); return;
  }
  const f = path.join(pub, url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname));
  if (!f.startsWith(pub) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(process.env.PORT || 8888, () => console.log('Herieth-Lab running at http://localhost:' + (process.env.PORT || 8888)));

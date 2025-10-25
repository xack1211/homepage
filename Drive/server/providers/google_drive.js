const path = require('path');
const fs = require('fs').promises;
const { google } = require('googleapis');

const TOKENS_PATH = path.resolve(__dirname, '..', 'gdrive-tokens.json');

async function readTokenStore() {
  try {
    const raw = await fs.readFile(TOKENS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

async function writeTokenStore(obj) {
  await fs.writeFile(TOKENS_PATH, JSON.stringify(obj, null, 2), 'utf8');
}

function createOAuthClient(options) {
  const clientId = options.clientId;
  const clientSecret = options.clientSecret;
  const redirectUri = options.redirectUri;
  const o = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  return o;
}

async function getAuthUrl(options, providerId) {
  const oAuth2Client = createOAuthClient(options);
  const scopes = ['https://www.googleapis.com/auth/drive.readonly'];
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
  return url;
}

async function handleCallback(options, providerId, code) {
  const oAuth2Client = createOAuthClient(options);
  const { tokens } = await oAuth2Client.getToken(code);
  const store = await readTokenStore();
  store[providerId] = tokens;
  await writeTokenStore(store);
}

async function ensureClientWithTokens(options, providerId) {
  const oAuth2Client = createOAuthClient(options);
  const store = await readTokenStore();
  const tokens = store[providerId];
  if (!tokens) throw new Error('No tokens for provider; authorize first via /api/' + providerId + '/auth');
  oAuth2Client.setCredentials(tokens);
  // save refreshed tokens when oauth2client emits new tokens
  oAuth2Client.on('tokens', async (newTokens) => {
    const s = await readTokenStore();
    s[providerId] = Object.assign({}, s[providerId] || {}, newTokens);
    await writeTokenStore(s);
  });
  return oAuth2Client;
}

async function resolvePathToId(drive, rootId, targetPath) {
  // targetPath like '/' or '/a/b/c'
  if (!targetPath || targetPath === '/') return rootId;
  const parts = targetPath.split('/').filter(Boolean);
  let parent = rootId;
  for (const part of parts) {
    // search for child with this name under parent
    const res = await drive.files.list({
      q: `'${parent}' in parents and name = '${part.replace("'","\\'")}' and trashed = false`,
      fields: 'files(id, name, mimeType)'
    });
    const files = res.data.files || [];
    if (files.length === 0) throw new Error('Path segment not found: ' + part);
    parent = files[0].id; // pick first match
  }
  return parent;
}

async function list(options, targetPath = '/') {
  const providerId = options._providerId || options.providerId || 'gdrive';
  const client = await ensureClientWithTokens(options, providerId);
  const drive = google.drive({ version: 'v3', auth: client });
  // root is 'root'
  const parentId = await resolvePathToId(drive, 'root', targetPath);
  const res = await drive.files.list({
    q: `'${parentId}' in parents and trashed = false`,
    fields: 'files(id, name, mimeType, size, modifiedTime)'
  });
  const files = res.data.files || [];
  return files.map(f => ({
    name: f.name,
    path: path.posix.join(targetPath === '/' ? '' : targetPath, f.name),
    isDir: f.mimeType === 'application/vnd.google-apps.folder',
    size: f.size || 0,
    mtime: f.modifiedTime || null,
    id: f.id
  }));
}

async function streamFile(options, targetPath, res) {
  const providerId = options._providerId || options.providerId || 'gdrive';
  const client = await ensureClientWithTokens(options, providerId);
  const drive = google.drive({ version: 'v3', auth: client });
  const fileId = await resolvePathToId(drive, 'root', targetPath);
  // get metadata to know name and size
  const meta = await drive.files.get({ fileId, fields: 'id, name, mimeType, size' });
  if (meta.data.mimeType === 'application/vnd.google-apps.folder') throw new Error('Path is a folder');
  res.setHeader('Content-Type', meta.data.mimeType || 'application/octet-stream');
  if (meta.data.size) res.setHeader('Content-Length', meta.data.size);
  res.setHeader('Content-Disposition', `attachment; filename="${meta.data.name}"`);
  const r = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
  r.data.pipe(res);
}

module.exports = { getAuthUrl, handleCallback, list, streamFile };

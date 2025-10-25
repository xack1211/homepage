const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const mime = require('mime-types');

const app = express();
app.use(cors());
app.use(express.json());

// Load config (allow user to create config.json from example)
const CONFIG_PATH = path.resolve(__dirname, 'config.json');
const EXAMPLE_PATH = path.resolve(__dirname, 'config.example.json');
let config;
if (fs.existsSync(CONFIG_PATH)) {
  config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
} else {
  config = JSON.parse(fs.readFileSync(EXAMPLE_PATH, 'utf8'));
}

// Providers registry
const providers = {};

// Local provider
const localProvider = require('./providers/local');
providers['local'] = localProvider;

// Raspi SFTP provider
const raspiProvider = require('./providers/raspi');
providers['raspi'] = raspiProvider;

// Google Drive (stub)
const gdriveProvider = require('./providers/google_drive');
providers['gdrive'] = gdriveProvider;

function findProviderById(id) {
  const p = config.providers.find(p => p.id === id);
  return p || null;
}

app.get('/api/providers', (req, res) => {
  const list = config.providers.map(p => ({ id: p.id, name: p.name, type: p.type }));
  res.json(list);
});

app.get('/api/:provider/list', async (req, res) => {
  const providerId = req.params.provider;
  const providerConfig = findProviderById(providerId);
  if (!providerConfig) return res.status(404).json({ error: 'Provider not found' });
  const provider = providers[providerConfig.type];
  if (!provider) return res.status(500).json({ error: 'Provider implementation missing' });
  const q = req.query.path || '/';
  try {
  // pass provider id into options for providers that need to persist tokens
  const opts = Object.assign({}, providerConfig.options, { providerId: providerConfig.id });
  const items = await provider.list(opts, q);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

app.get('/api/:provider/download', async (req, res) => {
  const providerId = req.params.provider;
  const providerConfig = findProviderById(providerId);
  if (!providerConfig) return res.status(404).json({ error: 'Provider not found' });
  const provider = providers[providerConfig.type];
  if (!provider) return res.status(500).json({ error: 'Provider implementation missing' });
  const filePath = req.query.path;
  if (!filePath) return res.status(400).json({ error: 'path is required' });
  try {
    // provider.download should stream to res or return a readable
  const opts2 = Object.assign({}, providerConfig.options, { providerId: providerConfig.id });
  await provider.streamFile(opts2, filePath, res);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) res.status(500).json({ error: String(err) });
  }
});

// Google Drive OAuth flow endpoints (delegates to provider helpers)
app.get('/api/:provider/auth', async (req, res) => {
  const providerId = req.params.provider;
  const providerConfig = findProviderById(providerId);
  if (!providerConfig) return res.status(404).json({ error: 'Provider not found' });
  const provider = providers[providerConfig.type];
  if (!provider || !provider.getAuthUrl) return res.status(400).json({ error: 'Auth not supported for this provider' });
  try {
    const url = await provider.getAuthUrl(providerConfig.options, providerId);
    // return the url so client can redirect
    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

app.get('/api/:provider/callback', async (req, res) => {
  const providerId = req.params.provider;
  const providerConfig = findProviderById(providerId);
  if (!providerConfig) return res.status(404).json({ error: 'Provider not found' });
  const provider = providers[providerConfig.type];
  if (!provider || !provider.handleCallback) return res.status(400).json({ error: 'Callback not supported for this provider' });
  const code = req.query.code;
  try {
    await provider.handleCallback(providerConfig.options, providerId, code);
    res.send('<h2>Google Drive connected successfully. You can close this window.</h2>');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error handling callback: ${err.message}`);
  }
});

// simple health
app.get('/api/ping', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

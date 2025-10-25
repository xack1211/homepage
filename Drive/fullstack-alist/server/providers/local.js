const fs = require('fs').promises;
const path = require('path');
const mime = require('mime-types');

function safeJoin(root, target) {
  const resolved = path.resolve(root, '.' + path.sep + target);
  if (!resolved.startsWith(path.resolve(root))) {
    throw new Error('Path traversal detected');
  }
  return resolved;
}

async function list(options, targetPath = '/') {
  const root = options.root || '.';
  const real = safeJoin(root, targetPath);
  const entries = await fs.readdir(real, { withFileTypes: true });
  const result = await Promise.all(entries.map(async e => {
    const full = path.join(real, e.name);
    const stat = await fs.stat(full);
    return {
      name: e.name,
      path: path.posix.join(targetPath === '/' ? '' : targetPath, e.name),
      isDir: e.isDirectory(),
      size: stat.size,
      mtime: stat.mtime
    };
  }));
  return result;
}

async function streamFile(options, targetPath, res) {
  const root = options.root || '.';
  const real = safeJoin(root, targetPath);
  const stat = await fs.stat(real);
  if (stat.isDirectory()) throw new Error('Path is a directory');
  const stream = require('fs').createReadStream(real);
  const contentType = mime.lookup(real) || 'application/octet-stream';
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Disposition', `attachment; filename="${path.basename(real)}"`);
  stream.pipe(res);
}

module.exports = { list, streamFile };

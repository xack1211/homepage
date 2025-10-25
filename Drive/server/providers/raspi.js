const Client = require('ssh2-sftp-client');
const path = require('path');

async function withSftpConn(options, fn) {
  const sftp = new Client();
  const conn = {
    host: options.host,
    port: options.port || 22,
    username: options.username
  };
  if (options.privateKeyPath) {
    const fs = require('fs');
    conn.privateKey = fs.readFileSync(options.privateKeyPath);
  } else if (options.password) {
    conn.password = options.password;
  }
  await sftp.connect(conn);
  try {
    return await fn(sftp);
  } finally {
    try { await sftp.end(); } catch (e) {}
  }
}

async function list(options, targetPath = '/') {
  const root = options.root || '/';
  const remotePath = path.posix.join(root, targetPath);
  return withSftpConn(options, async sftp => {
    const list = await sftp.list(remotePath);
    return list.map(item => ({
      name: item.name,
      path: path.posix.join(targetPath === '/' ? '' : targetPath, item.name),
      isDir: item.type === 'd',
      size: item.size,
      mtime: item.modifyTime
    }));
  });
}

async function streamFile(options, targetPath, res) {
  const root = options.root || '/';
  const remotePath = path.posix.join(root, targetPath);
  return withSftpConn(options, async sftp => {
    const stat = await sftp.stat(remotePath);
    if (stat.isDirectory) throw new Error('Path is a directory');
    res.setHeader('Content-Length', stat.size);
    // try to infer content-type from name
    const mime = require('mime-types');
    res.setHeader('Content-Type', mime.lookup(remotePath) || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${path.posix.basename(remotePath)}"`);
    const stream = await sftp.get(remotePath);
    // stream may be a Buffer or a stream
    if (Buffer.isBuffer(stream)) {
      res.end(stream);
    } else {
      stream.pipe(res);
    }
  });
}

module.exports = { list, streamFile };

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 3050;
const HOST = '127.0.0.1';
const PUBLIC_DIR = path.join(__dirname, 'public');

// Importer la logique de chat partagée
const chatHandler = require('./api/chat.js');
const ttsHandler = require('./api/tts.js');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, xi-api-key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // Route API : POST /api/chat
  if (url.pathname === '/api/chat' && req.method === 'POST') {
    return chatHandler(req, res);
  }

  // Route API : POST /api/tts
  if (url.pathname === '/api/tts' && req.method === 'POST') {
    return ttsHandler(req, res);
  }

  // Route API : GET /api/health
  if (url.pathname === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      status: 'online',
      assistant: 'Aura',
      brand: 'Richie Rich Event',
      languages: ['fr', 'en', 'hi'],
      timestamp: new Date().toISOString()
    }));
  }

  // Fichiers statiques
  let targetPath = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\//, '');
  let filePath = path.join(__dirname, targetPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, targetPath);
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(__dirname, 'index.html');
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Fichier non trouvé');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

function startServer(port) {
  server.listen(port, HOST, () => {
    console.log(`✨ Aura Voice App active sur http://${HOST}:${port}`);
  });

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} occupé, tentative sur le port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Erreur serveur:', err);
    }
  });
}

startServer(PORT);

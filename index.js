// 1. memanggil library untuk server
const http = require('http');
const fs = require('fs');
const path = require('path');

// 2. bikin server ()
const server = http.createServer(function (req, res) {
  // menjelaskan jenis isi datanya dan status koneksinya
  const { method, url } = req;
  console.log('method: ', method);
  console.log('url ', url);
  if (url === '/') {
    // halaman utama
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // isi datanya
    res.end('<div><h1>Ini halaman utama</h1></div>');
  } else if (url === '/profile') {
    fs.readFile(
      path.join(__dirname, 'profile.html'),
      'utf8',
      function (err, data) {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<div><h1>Server Error</h1></div>');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data); // res.end hanya boleh dijalankan 1x
        }
      }
    );
  } else if (url === '/api/hello') {
    if (method !== 'POST') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ name: 'Hello' }));
    } else {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method tidak sesuai' }));
    }
  } else {
    // halaman tidak ditemukan
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // isi datanya
    res.end('Halaman Tidak ditemukan url:' + url + ', method:' + method);
  }
});

// 3. menhidupkan server
server.listen(5000, () => {
  console.log('hidupkan: node index.js');
  console.log('buka di browser: http://localhost:5000');
  console.log('matikan server: diterminal tekan ctrl+c');
});

const http = require('http');

let data = [{ name: 'hafidz', usia: 16 }];

const server = http.createServer(function (req, res) {
  const { url, method } = req;
  console.log(method);

  if (url === '/api/user') {
    // create/insert data

    if (method.toLowerCase() === 'post') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        let { name, usia } = JSON.parse(body);

        data.push({ name, usia });

        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ msg: 'Menambahkan data' }));
      });
    } else if (method.toLowerCase() === 'put') {
      // update data
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ msg: 'update data' }));
    } else if (method.toLowerCase() === 'get') {
      // lihat data
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ msg: 'lihat  data', data }));
    } else if (method.toLowerCase() === 'delete') {
      // hapus data
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ msg: 'hapus data' }));
    } else {
      // jika method tidak dikenali
      res.writeHead(405, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify({ msg: 'Method tidak dikenali' }));
    }
  } else {
    // jika url/alamat tidak dikenali
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ error: 'Alamat tidak ditemukan' }));
  }
});

server.listen(3000, () => {
  console.log('server run on http://localhost:3000');
});

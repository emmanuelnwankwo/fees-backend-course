
// // server.mjs
// const http = require('node:http');

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!\n');
// });

// // starts a simple http server locally on port 3000
// server.listen(3000, '127.0.0.1', () => {
//   console.log('Listening on 127.0.0.1:3000');
// });

// run with `node server.mjs`


// Express
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Express!\n');
})

const port = 3000;
app.listen(port, () => console.log('Listing on PORT: ' + port))
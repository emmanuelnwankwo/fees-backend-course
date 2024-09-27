const express = require('express');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/convert', (req, res) => {
    const url = req.body.url;

    if (url) {
        qrcode.toDataURL(url, (err, base64) => {
            if (err) res.status(500).json(err);

            const data = base64.split(',')[1];
            const decodedData = Buffer.from(data, 'base64');
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(decodedData);
        });
    } else {
        res.status(400).json('URL missing!');
    }
});



const port = 3000;
app.listen(port, () => console.log('Listing on PORT: ' + port))



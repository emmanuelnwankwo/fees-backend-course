const express = require('express');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', async function (req, res) {
    console.log('Hit here')
    // res.send('URL Not Set!');
    // res.status(200).json('Test');
    // res.render('index',{QR_code:''});

    const url = 'https://google.com';
    console.log(url);

    qrcode.toDataURL('I am a pony!', function (err, url) {
        console.log('url::: ' + url)
        console.log(err);
    })

    const qrCodeImage = qrcode.toDataURL(url, { type: 'png' });
    console.log(qrCodeImage)
    // res.setHeader('content-type', 'image/png');
    // res.type('png').send(qrCodeImage);
    // res.send(qrCodeImage.split(',')[1]);

    const data = qrCodeImage.split(',')[1];
    // console.log('Data::: ' + data)
    // res.writeHead(200, {
    //     'Content-Type': 'image/png',
    //     'Content-Length': data.length
    // });

    const decodedData = Buffer.from(data, 'base64');
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(decodedData);
    // res.end(data);
});


// app.listen(3000,function(){
// 	console.log('Server listing on 3000');
// });
app.post('/', async function (req, res) {
    console.log(req.body)
    const url = req.body.url;
    const qrcode.toDataURL(url)
    if (url) {
        qrcode.toDataURL(url, (err, url) => {
            if (err) {
                res.status(500).json(err);
            }
            const data = url.split(',')[1];
            const decodedData = Buffer.from(data, 'base64');
            console.log(decodedData)
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(decodedData);
        });
    } else {
        res.json('URL missing!');
    }

});

app.listen(3000, () => {
    console.log('Listening on PORT 3000');
});
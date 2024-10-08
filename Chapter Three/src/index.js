const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const product = require('./routes/product');
const auth = require('./routes/auth');

require('dotenv').config();


const app = express();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '') ?? null;
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        req.userRole = decoded.role;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Unauthorized' });
    }
};


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', authenticate, product);
app.use('/auth', auth);



const port = 3000;
app.listen(port, () => console.log('Listening on PORT: ' + port));

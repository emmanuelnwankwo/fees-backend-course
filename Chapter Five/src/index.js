const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const { env } = require('./config/envConfig');
const connectDB = require('./config/database');
const helmet = require('helmet');

require('dotenv').config();


const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use('/', routes);

if(env.NODE_ENV === 'production') {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    })
}


if (require.main === module) {
    app.listen(env.PORT, () => console.log('Listening on PORT: ' + env.PORT));
}

module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const { env } = require('./config/envConfig');
const connectDB = require('./config/database');

require('dotenv').config();


const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);


app.listen(env.PORT, () => console.log('Listening on PORT: ' + env.PORT));

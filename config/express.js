const express = require('express');

const app = express();
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const config = require('./config');


app.set('config', config);

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


for (const k in config.versions) {
    app.use(config.versions[k], require(`../server${config.versions[k]}/index.route`));
}

module.exports = app;
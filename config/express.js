const express = require('express');

const app = express();
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
const httpStatus = require('http-status');






const mongoDB = config.mongo_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = {
    mongo: {},
};

db.mongo.read = mongoose.connection;
db.mongo.write = mongoose.connection;




app.set('db', db);
app.set('config', config);

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


for (const k in config.versions) {
    app.use(config.versions[k], require(`../server${config.versions[k]}/index.route`));
}


app.use((_req, _res, next) => next({ message: httpStatus[httpStatus.NOT_FOUND], status: httpStatus.NOT_FOUND }));

app.use((err, _req, res, _next) => { 
    const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({
        code: status,
        message: config.env === 'production' ? httpStatus[status] : err.message,
    });
});



module.exports = app;
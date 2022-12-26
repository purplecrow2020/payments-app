const config = require('../config/config');
const UserModel = require('../models/mongo/user');
const jsonwebtoken = require('jsonwebtoken');


const responseData = {
    meta: {
        code: 401,
        success: false,
        message: 'Unauthorized',
    },
    data: 'Unauthorized',
};

function authGaurd(req, res, next) {
    try {
        const xAuthToken = req.headers['x-auth-token'];
        if (typeof xAuthToken === 'undefined') {
            throw new Error(" not defined");
        }

        const details = jsonwebtoken.verify(xAuthToken, config.jwtSecret);
        const {
            id,
        } = details;
        req.user = {};
        req.user.id = id;
        next();
    } catch (e) {
        console.log(e);
        return res.status(responseData.meta.code).json(responseData);
    }
}

module.exports = authGaurd;
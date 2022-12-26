const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

const Usermodel = require('../../../models/mongo/user');

async function doesEmailIdExists(emailId) {
    const users = await Usermodel._get({ email_id: emailId, is_deleted: false, });
    return !!(users.length);
}

function createToken(userDetails) {
    const token = jwt.sign(userDetails, config.jwtSecret, { algorithm: 'HS256' , expiresIn: '365d' });
    return token;
}

module.exports = {
    doesEmailIdExists,
    createToken,
};
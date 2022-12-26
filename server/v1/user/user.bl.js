const Usermodel = require('../../../models/mongo/user');

async function doesEmailIdExists(emailId) {
    const users = await Usermodel._get({ email_id: emailId, is_deleted: false,});
    return !!(users.length)
}

module.exports = {
    doesEmailIdExists,
};
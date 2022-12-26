const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, },
    email_id: { type: String, required: true, index: true, },
    password: { type: String, required: true, },
    is_deleted: { type: Boolean, default: false, index: true, },
}, {
    timestamps: true,
});

const UserModel = mongoose.model("users", UserSchema);


async function _create(userObj) {
    const userInst = new UserModel(userObj);
    return userInst.save();
}

function _update(id, updatedFeildsObject) {
    return UserModel.findByIdAndUpdate(id, { ... updatedFeildsObject });
}

function _get(filter) {
    return UserModel.find({ ...filter });
}


function _getUserByEmailAndPassword(emailId, password) {
    return UserModel.find({
        email_id: emailId,
        password,
        is_deleted: false,
    });
}


module.exports = {
    _create,
    _update,
    _get,
    _getUserByEmailAndPassword,
};
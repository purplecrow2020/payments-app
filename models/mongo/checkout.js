const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
    user_id: { type: String, required: true, },
    session_id: { type: String, required: true, },
    session_key: { type: String, required: true, },
    details: { type: Object, },
    amount: { type: Number, },
    status: { type: String, enum: ['idle', 'progress', 'success', 'failure'], required: true, default: 'idle', },
}, {
    timestamps: true,
});

const CheckoutModel = mongoose.model("checkout", CheckoutSchema);


async function _create(obj) {
    const checkoutInst = new CheckoutModel(obj);
    return checkoutInst.save();
}

function _updateBySessionKey(key, updatedFeildsObject) {
    return CheckoutModel.findOneAndUpdate({ session_key: key, }, { ... updatedFeildsObject });
}


function _update(id, updatedFeildsObject) {
    return CheckoutModel.findByIdAndUpdate(id, { ... updatedFeildsObject });
}




module.exports = {
    _create,
    _update,
    _updateBySessionKey,
};
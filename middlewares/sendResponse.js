const { ValidationError } = require('express-validation');

function sendResponse(result, _req, res, next) {
    const responseData = {
        meta: {
            code: 200,
            success: true,
            message: 'Success',
        },
        data: null,
    };
    try {
        if (result instanceof (ValidationError)) {
            throw result;
        }
        if (result.err) {
            throw result.err;
        }
        responseData.data = result.data;
        return res.status(responseData.meta.code).json(responseData);
    } catch (e) {
        next(e);
    }
}

module.exports = sendResponse;

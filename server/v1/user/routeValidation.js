const Joi = require('joi');

module.exports = {
    user: {
        register: {
            body: {
                email: Joi.string().email().required(),
                username: Joi.string().required(),
                password: Joi.string().required(),
            },
        },
        update: {
            body: {
                id: Joi.string().email().required(),
            },
        },
        delete: {
            body: {
                id: Joi.string().email().required(),
            },
        },
        get: {
            body: {
                id: Joi.string().email().required(),
            },
        },
        login: {
            body: {
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            },
        },
    },
};
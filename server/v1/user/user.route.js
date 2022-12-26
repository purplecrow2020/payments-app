const express = require('express');
const validate = require('express-validator');
const paramValidation = require('./routeValidation');

const userCtrl = require('./user.controller');

const router = express.Router();

router.route('/register').post(validate(paramValidation.user.signup), userCtrl.register);
// router.route('/login').post(validate(paramValidation.user.login), userCtrl.login);

module.exports = router;
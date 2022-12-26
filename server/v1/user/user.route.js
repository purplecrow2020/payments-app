const express = require('express');
const validate = require('express-validator');
const paramValidation = require('./routeValidation');
const AuthGaurd = require('../../../middlewares/auth');

const userCtrl = require('./user.controller');
const router = express.Router();

router.route('/register').post(validate(paramValidation.user.signup), userCtrl.register);
router.route('/get').get(validate(paramValidation.user.get), userCtrl.getUser);
router.route('/delete').delete(AuthGaurd, validate(paramValidation.user.delete), userCtrl.deleteUser);
router.route('/update').put(AuthGaurd, validate(paramValidation.user.update), userCtrl.updateUser);

module.exports = router;
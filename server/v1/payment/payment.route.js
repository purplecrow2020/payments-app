const express = require('express');
const validate = require('express-validator');
const paramValidation = require('./routeValidation');
const AuthGaurd = require('../../../middlewares/auth');

const paymentCtrl = require('./payment.controller');
const router = express.Router();

router.route('/checkout').post(AuthGaurd, paymentCtrl.checkout);
router.route('/session-by-id').get(paymentCtrl.getSessionDetailsById);
router.route('/update-session').put(paymentCtrl.updateCheckoutSessionStatus);



module.exports = router;
const express = require('express');
const sendResponse = require('../../middlewares/sendResponse');

const router = express.Router();

// route requiremets
const userRoutes = require('./user/user.route');

// router usages
router.get('/health-check', (req, res) => res.send('OK2'));
router.use('/user', userRoutes, sendResponse);

module.exports = router;
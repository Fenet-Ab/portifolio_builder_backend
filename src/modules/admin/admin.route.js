const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');

router.post('/register',adminController.registerAdmin);

module.exports = router;
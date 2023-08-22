const express = require('express');
const authController = require('../controllers/auth.controller');
//const auth = require('../../middlewares/v2/auth');

const router = express.Router();

router.post('/signup', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

// router.post('/login', authController.login);

module.exports = router;


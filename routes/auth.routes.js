const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register a new user
router.post('/register', authController.register);

// Login with username and password to obtain JWT token
router.post('/login', authController.login);

// // Logout the currently authenticated user 
 router.post('/logout', authController.logout);

module.exports = router;

const { body } = require('express-validator');
const User = require('../models/User');

exports.validateRegistration = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),

  body('username').custom(async (value) => {
    const user = await User.findOne({ username: value.toLowerCase() });
    if (user) {
      return Promise.reject('Username already exists');
    }
  })
];


exports.validateLogin = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  
  ];
  

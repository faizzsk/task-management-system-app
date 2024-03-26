const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

// Middleware function to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded; // Add decoded user information to request object
    next();
  });
};

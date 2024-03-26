const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

// Middleware function to verify JWT token
exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    console.log("im ");
    const decoded =  jwt.verify(token.replace("Bearer ",""), authConfig.secret);
    console.log("dec",decoded);
    req.user = decoded; // Add decoded user information to request object
    next();
  } catch (err) {
    console.log(err,"err");
    return res.status(401).json({ error: 'Invalid token' });
  }
};

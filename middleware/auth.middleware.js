const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const BlacklistedToken = require("../models/Token");

exports.verifyToken = async (req, res, next) => {
  console.log("--Middleware--Verify Token");
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorize" });
  }
  

  try {
    console.log("here ");
    const isTokenBlacklisted = await BlacklistedToken.exists({
      token: token.replace("Bearer ",""),
    });
    if(isTokenBlacklisted){
      res.status(403).json({error:"Forbidden"}); // Forbidden
    }else{
      const decoded = jwt.verify(token.replace("Bearer ", ""), authConfig.secret);
      console.log("dec", decoded);
      req.user = decoded;
      next();
    }
    
  } catch (err) {
    console.log(err, "err");
    return res.status(401).json({ error: "Session Expired" });
  }
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authConfig = require("../config/auth");


// Register User
exports.registerUser = async (username, password) => {
  console.log("-- Auth Service --registerUser ");
  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};

// Login User
exports.loginUser = async (username, password) => {
  console.log("-- Auth Service --loginUser ");

  const user = await User.findOne({ username:username.toLowerCase() });
  if (!user) {
    throw new Error("Invalid username ");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }
  
  const token = jwt.sign({ userId: user._id }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
  return token;
};

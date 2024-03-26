
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authConfig = require("../config/auth");

exports.registerUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
};

exports.loginUser = async (username, password) => {
  const user = await User.findOne({ username });
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


const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    await authService.registerUser(username, password);

    // const hashPassword = await bcrypt.hash(password, 10);
    // const user = new User({ username, password: hashPassword });
    // await user.save();

    res.status(201).json({ message: "User registered Succesfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.loginUser(username, password);

    // const user = await User.findOne({ username });
    // if (!user) {
    //   return res.status(401).json({ error: "Invalid username" });
    // }

    // const validPassword = await bcrypt.compare(password, user?.password);

    // if (!validPassword) {
    //   return res.status(401).json({ error: "Invalid  password" });
    // }

    // const token = jwt.sign({ userId: user._id }, authConfig.secret, {
    //   expiresIn: authConfig.expiresIn,
    // });

    res.cookie("jwtToken", token, { httpOnly: true, secure: true });

    res.status(200).json({ token });
  } catch (error) {
    console.log("error",error);
    res.status(500).json({ error: "Failed to login",msg:error });
  }
};

exports.logout = async (req, res) => {
  try {

    res.clearCookie("jwtToken");
    res.status(200).json({ message: "Logout successful" });
    
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

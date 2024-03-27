const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const authService = require("../services/auth.service");
const {
  validateRegistration,
  validateLogin,
} = require("../validation/auth.validation");
const { validationResult } = require("express-validator");
const BlacklistedToken = require("../models/Token");

exports.register = async (req, res) => {
  console.log("--AuthController--Register--");

  //Validation
  await Promise.all(
    validateRegistration.map((validation) => validation.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;
    await authService.registerUser(username, password);
    res.status(201).json({ message: "User registered Succesfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

exports.login = async (req, res) => {
  console.log("--AuthController--Login--");

  await Promise.all(validateLogin.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

    res.cookie("jwtToken", token, { httpOnly: false, secure: false });

    res.status(200).json({ token });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Failed to login", msg: error.message });
  }
};

exports.logout = async (req, res) => {
  console.log("--AuthController--Logout--");

  try {
    // const token = req?.headers?.authorization;
    const token = req?.cookies?.jwtToken;
    console.log("token", token);
    const blacklistedToken = new BlacklistedToken({
      token: token, // Assuming you have the token available in req.token
    });

    await blacklistedToken.save();

    res.clearCookie("jwtToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

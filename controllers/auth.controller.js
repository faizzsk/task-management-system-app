const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashPassword });
    await user.save();

    res.status(201).json({ message: "User registered Succesfully" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });

  }
};

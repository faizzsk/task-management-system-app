const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Regular"], default: "Regular" },
  },
  {
    timestamps: true // created At, deleted At

  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User disabled" });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        permission: user.permission,
      },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        mobile: user.mobile,
        role: user.role,
        permission: user.permission,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
const User = require("../models/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signToken = (email) => {
  return jwt.sign(
    {
      email,
    },
    process.env.SECRET_KEY
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validation
    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: "Email & Password cannot be empty" });
    } else if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email format" });
    }
    // Finding the user from the database
    const user = await User.findOne({ email });
    // If user is not found, return 401
    if (!user) {
      return res.status(404).json({ message: "Email not found !" });
    }
    // Compare passwords using bcrypt
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      // Returning the token
      const token = signToken(user.email);
      return res.status(200).json({
        message: "Login Successful",
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      // Invalid password
      return res.status(403).json({ message: "Invalid password" });
    }
  } catch (error) {
    // Handling internal server error
    res.status(500).json({ message: `Internal Server Error ${error}` });
  }
};

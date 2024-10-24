const User = require("../models/userModal");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    // req from client
    const { name, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // validation
    if (!name && !email && !password) {
      return res
        .status(400)
        .json({ message: "Please provide name,email and password" });
    } else if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(403)
        .json({ message: "User already exists , Please Login" });
    }
    // Hash pass and store
    const hashPassword = await bcrypt.hash(password, 10);
    // creating a new user object and saving in DB
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error ${error}` });
  }
};

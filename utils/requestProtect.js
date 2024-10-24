const User = require("../models/userModal");
const util = require("util");

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let jwtToken;
    // no token is provided
    if (!token) {
      return res.status(401).json({ message: "No Token Found" });
    }
    if (token && token.startsWith("Bearer ")) {
      jwtToken = token.split(" ")[1];
    }
    // Validate and decode the token
    const decodedToken = await util.promisify(jwt.verify)(
      jwtToken,
      process.env.SECRET_KEY
    );
    // Check if user exists
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "The user with the given token does not exist" });
    }
    // user information to the request  for later use
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

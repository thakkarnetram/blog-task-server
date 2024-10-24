const mongoose = require("mongoose");
const shortid = require("shortid");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

const UserSchema = mongoose.model("users", userSchema);
module.exports = UserSchema;

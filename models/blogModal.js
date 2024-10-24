const mongoose = require("mongoose");
const shortid = require("shortid");

const blogSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  user: {
    type: String,
    ref: "users",
  },
  blogTitle: {
    type: String,
    required: true,
  },
  blogDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BlogSchema = mongoose.model("blogs", blogSchema);
module.exports = BlogSchema;

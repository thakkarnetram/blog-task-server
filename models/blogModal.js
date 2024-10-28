const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
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

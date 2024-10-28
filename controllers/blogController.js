const User = require("../models/userModal");
const Blog = require("../models/blogModal");

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.find();
    if (!blog) {
      return res.status(404).json({ message: "No blogs found" });
    } else {
      return res.status(200).json(blog);
    }
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error ${error}` });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const _id = req.params._id;
    const blog = await Blog.findById({ _id });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    } else {
      return res.status(200).json(blog);
    }
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error ${error}` });
  }
};

exports.addBlog = async (req, res) => {
  try {
    const { blogTitle, blogDescription } = req.body;
    if (!blogTitle) {
      return res.status(400).json({ message: "Blog title cannot be empty" });
    }
    const name = req.user.name;
    const newBlog = new Blog({
      blogTitle,
      blogDescription,
      user: name,
    });
    if (newBlog) {
      newBlog.save().then(() => res.status(200).json({ newBlog }));
    }
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error ${error}` });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const _id = req.params._id;
    const name = req.user.name;
    const updatedBlog = req.body;
    const blog = await Blog.findOne({ _id, name });
    if (!blog) {
      return res.status(401).json({ message: "Unauthorized to update this" });
    }
    const options = { new: true };
    const result = await Blog.findByIdAndUpdate(_id, updatedBlog, options);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error ${error}` });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const _id = req.params._id;
    const name = req.user.name;
    const blog = await Blog.findOne({ _id, name });
    if (!blog) {
      return res.status(404).json({ message: "No blog found" });
    }
    const deleteBlog = await Blog.findByIdAndDelete(_id);
    return res
      .status(200)
      .json({ message: `Blog deleted for ${name}`, deleteBlog });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error ${error}` });
  }
};

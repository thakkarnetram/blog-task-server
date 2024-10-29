const express = require("express");
const blogController = require("../controllers/blogController");
const jwtMiddleware = require("../utils/requestProtect");

const router = express.Router();

router.route("/blogs").get(jwtMiddleware.protect, blogController.getAllBlog);
router
  .route("/blogs/user")
  .get(jwtMiddleware.protect, blogController.getUserBlogs);
router
  .route("/blogs/:_id")
  .get(jwtMiddleware.protect, blogController.getBlogById);
router.route("/blogs/add").post(jwtMiddleware.protect, blogController.addBlog);
router
  .route("/blogs/update/:_id")
  .put(jwtMiddleware.protect, blogController.updateBlog);
router
  .route("/blogs/delete/:_id")
  .delete(jwtMiddleware.protect, blogController.deleteBlog);

module.exports = router;

const express = require("express");
const blog = require("../controllers/blog-controller");
const blogController = require("../controllers/blog-controller");
const authenticateMiddleware = require("../middlewears/authenticate");

const router = express.Router();

router.post("/", authenticateMiddleware, blogController.createBlog);
router.get("/all", authenticateMiddleware, blogController.getAllBlogs);
router.delete("/:blogId", authenticateMiddleware, blogController.deleteBlog);
router.put("/:blogId", authenticateMiddleware, blogController.editBlog);

module.exports = router;

const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

const router = express.Router();

// Get all posts
router.get("/", getPosts);

// Get single post
router.get("/:id", getPost);

// Post a post
router.post("/", createPost);

// Delete a post
router.delete("/:id", deletePost);

// Update a post
router.patch("/:id", updatePost);

module.exports = router;

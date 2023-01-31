const Post = require("../models/postModel");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const { title, author, body } = req.body;

  try {
    const post = await Post.create({ title, author, body });
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  const post = await Post.findOneAndDelete({ _id: id });
  if (!post) {
    return res.status(404).json({ error: "No such post" });
  }
  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  const post = await Post.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!post) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(post);
};

module.exports = { getPosts, getPost, createPost, deletePost, updatePost };

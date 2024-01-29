const Post = require("../models/post");

// GET ALL
const getPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find().populate('user')
    return res.status(200).json(allPosts);

  } catch (error) {
    return res.status(404).json(error.mesage);
  }
};

// CREATE POST
const createPost = async (req, res, next) => {
  try {
    const addPost = new Post(req.body);
    const savePost = await addPost.save();
    return res.status(201).json(savePost._id)

  } catch (error) {
    return res.status(404).json(error.mesage);
  }
};

module.exports = { getPosts, createPost };
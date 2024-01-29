const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    collection: "posts"
  });

const Post = mongoose.model("Post", postSchema, "posts");
module.exports = Post;
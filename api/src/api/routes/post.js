const { isUser } = require("../../middlewares/auth");
const { getPosts, createPost } = require("../controllers/post");

const postsRoutes = require("express").Router();

postsRoutes.get('/', [isUser], getPosts);
postsRoutes.post('/', [isUser], createPost);

module.exports = postsRoutes;
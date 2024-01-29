const { getUsers, registerUser, loginUser, deleteUser, updateUser, getUser, addAlbum, deleteAlbumUser, addPost } = require("../controllers/user");
const { isUser } = require("../../middlewares/auth");
const { upUserImg } = require("../../middlewares/uploadImg");

const usersRoutes = require("express").Router();

usersRoutes.get('/', [isUser], getUsers);
usersRoutes.get('/:id', getUser);
usersRoutes.post('/register', upUserImg.single("img"), registerUser);
usersRoutes.post('/login', loginUser);
usersRoutes.post('/:id/albums', [isUser], addAlbum);
usersRoutes.post('/:id/posts', [isUser], addPost);
usersRoutes.delete('/:id/albums/:albumId', [isUser], deleteAlbumUser);
usersRoutes.delete('/:id', [isUser, upUserImg.single("img")], deleteUser);
usersRoutes.put('/:id', [isUser, upUserImg.single("img")], updateUser);

module.exports = usersRoutes;
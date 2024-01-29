const { isUser } = require("../../middlewares/auth");
const { getAlbums, createAlbum, getOneAlbum, deleteAlbum } = require("../controllers/album");

const albumsRoutes = require("express").Router();

albumsRoutes.get('/', getAlbums);
albumsRoutes.get('/:id', getOneAlbum);
albumsRoutes.post('/', [isUser], createAlbum);
albumsRoutes.delete('/:id', [isUser], deleteAlbum);

module.exports = albumsRoutes;
const Album = require("../models/album");

// GET ALL
const getAlbums = async (req, res, next) => {
  try {
    const allAlbums = await Album.find().populate('users')
    return res.status(200).json(allAlbums);

  } catch (error) {
    return res.status(404).json(error.mesage);
  }
};

// GET ALBUM
const getOneAlbum = async (req, res, next) => {
  try {
    const oneAlbum = await Album.findById(req.params.id)
    return res.status(200).json(oneAlbum);

  } catch (error) {
    return res.status(404).json(error.mesage);
  }
};

// CREATE ALBUM
const createAlbum = async (req, res, next) => {
  try {
    const addAlbum = new Album(req.body);
    const saveAlbum = await addAlbum.save();
    return res.status(201).json(saveAlbum._id);
    console.log(res)

  } catch (error) {
    return res.status(404).json(error.mesage);
  }
};

// DELETE USER
const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const album = await Album.findById(id)
    const albumDeleted = await Album.findByIdAndDelete(id);
    return res.status(200).json(`El album ${album.album} ha sido eliminado`);
  } catch (error) {
    return res.status(400).json("No ha podido eliminarse el album");
  }
};

module.exports = { getAlbums, createAlbum, getOneAlbum, deleteAlbum };
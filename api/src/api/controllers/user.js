const { generateSign } = require("../../config/jwt");
const { deleteImg } = require("../../utils/deleteImg");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// GET ALL
const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate("albums").populate("posts");
    return res.status(200).json(allUsers);

  } catch (error) {
    return res.status(404).json(error.mesage);
  }
};

// GET USER
const getUser = async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.params.id)
    return res.status(200).json(oneUser);

  } catch (error) {
    return res.status(404).json(error.mesage);
  }
};

// REGISTER USER
const registerUser = async (req, res, next) => {
  try {
    const addUser = new User(req.body);
    if (req.file) {
      addUser.img = req.file.path;
    }
    const userDuplicated = await User.findOne({ username: req.body.username });
    const emailDuplicated = await User.findOne({ email: req.body.email });

    if (userDuplicated) {
      return res.status(400).json({ error: 'Este usuario ya existe' });
    } else if (emailDuplicated) {
      return res.status(400).json({ error: 'El email que has introducido ya existe' });
    } else {
      const saveUser = await addUser.save();
      return res.status(201).json('Usuario registrado');
    }

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

// LOGIN USER
const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id);
        return res.status(200).json({ user, token });
      } else {
        return res.status(400).json({ error: 'El usuario o contraseña no existen'});
      }
    } else {
      return res.status(400).json({ error: 'El usuario o contraseña no existen' });
    };

  } catch (error) {
    return res.status(400).json(error.mesage);
  }

};

// DELETE USER
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    const userDeleted = await User.findByIdAndDelete(id);
    deleteImg(userDeleted.img);
    return res.status(200).json(`El usuario ${user.username} ha sido eliminado`);
  } catch (error) {
    return res.status(400).json("No ha podido eliminarse el usuario");
  }
};

// DELETE ALBUM USER
const deleteAlbumUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { albumId } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    const albumIndex = user.albums.findIndex(album => album._id.toString() === albumId);
    if (albumIndex === -1) {
      return res.status(404).json("Álbum no encontrado en la colección del usuario");
    }
    user.albums.splice(albumIndex, 1);
    await user.save();

    return res.status(200).json(`El album ha sido eliminado`);
  } catch (error) {
    return res.status(500).json("No ha podido eliminarse el album");
  }
};

// UPDATE USERS
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const newUser = new User(req.body)
    newUser._id = id

    if (req.file) {
      const OldUserImg = await User.findById(id);
      deleteImg(OldUserImg.img);
      newUser.img = req.file.path;
    }

    const userUpdate = await User.findByIdAndUpdate(id, newUser, { new: true })

    return res.status(200).json(userUpdate)

  } catch (err) {

    return res.status(400).json('El usuario no ha podido actualizarse');
  }
}

//ADD ALBUMS
const addAlbum = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    user.albums.push(req.body.albums);

    const updateUser2 = await User.findByIdAndUpdate(req.params.id, user, { new: true });

    return res.status(200).json(updateUser2);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//ADD POSTS
const addPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    user.posts.push(req.body.posts);

    const updateUser2 = await User.findByIdAndUpdate(req.params.id, user, { new: true });

    return res.status(200).json(updateUser2);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

module.exports = { getUsers, registerUser, loginUser, deleteUser, updateUser, getUser, addAlbum, deleteAlbumUser, addPost };
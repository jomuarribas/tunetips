const User = require("../api/models/user");
const { verifyToken } = require("../config/jwt");

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).json("No estás autorizado");
    };

    const parsedToken = token.replace("Bearer ", "");
    const { id } = verifyToken(parsedToken);
    const user = await User.findById(id);

    if (user.rol === "user") {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res.status(400).json('Tienes que ser usuario para acceder a este contenido');
    }


  } catch (error) {
    return res.status(400).json("No estás autorizado");
  }
};

module.exports = { isUser };
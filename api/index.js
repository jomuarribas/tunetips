require("dotenv").config();

const express = require("express");
const cloudinary = require("cloudinary").v2;
const { tuneTipsDb } = require("./src/config/tuneTipsDb");
const albumsRoutes = require("./src/api/routes/album");
const circlesRoutes = require("./src/api/routes/circle");
const postsRoutes = require("./src/api/routes/post");
const usersRoutes = require("./src/api/routes/user");
const cors = require('cors');
const { musicScraper } = require("./src/utils/musicScraper");

const app = express();

tuneTipsDb()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json());
app.use(cors());

app.use("/api/albums", albumsRoutes);
app.use("/api/circles", circlesRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/scrape", musicScraper);

app.use("*/", (req, res, next) => {
  return res.status(404).json("Route not found")
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
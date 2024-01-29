const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    artist: { type: String, required: true },
    album: { type: String, required: true },
    img: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  {
    collection: "albums"
  });

const Album = mongoose.model("Album", albumSchema, "albums");
module.exports = Album;
const mongoose = require('mongoose');

const circleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String },
    users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    collection: "circles"
  });

const Circle = mongoose.model("circle", circleSchema, "circles");
module.exports = Circle;
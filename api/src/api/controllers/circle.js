const Circle = require("../models/circle");

// GET ALL
const getCircles = async (req, res, next) => {
  try {
    const allCircles = await Circle.find()
    return res.status(200).json(allCircles);

  } catch (error) {
    return res.status(404).json(error.mesage);
  }
};

// CREATE CIRCLE
const createCircle = async (req, res, next) => {
  try {
    const addCircle = new Circle(req.body);
    const saveCircle = await addCircle.save();
    return res.status(201).json("Circle has been added")

  } catch (error) {
    return res.status(404).json(error.mesage);
  }
};

module.exports = { getCircles, createCircle };
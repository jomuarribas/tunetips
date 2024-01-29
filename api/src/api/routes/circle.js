const { getCircles, createCircle } = require("../controllers/circle");

const circlesRoutes = require("express").Router();

circlesRoutes.get('/', getCircles);
circlesRoutes.post('/', createCircle);

module.exports = circlesRoutes;
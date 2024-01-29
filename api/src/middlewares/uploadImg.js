const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const userImg = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "TuneTips/userImg",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
    transformation: [{ width: 200, height: 200, crop: 'fill' }]
  }
});

const upUserImg = multer({ storage: userImg });

module.exports = { upUserImg };
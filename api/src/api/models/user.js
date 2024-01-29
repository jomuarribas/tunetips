const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    img: { type: String },
    circle: { type: mongoose.Schema.Types.ObjectId, ref: "Circle" },
    rol: { type: String, enum: ["superadmin", "admin", "user"], trim: true, default: "user", required: true },
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
  },
  {
    collection: "users"
  }
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
});

userSchema.pre('findByIdAndUpdate', function () {
  console.log(this.rol)
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
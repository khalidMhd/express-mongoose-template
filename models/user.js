const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  imageURL: { type: String },
  accStatus: { type: Boolean, required: true, default: true },
  isVerified: { type: Boolean, required: true, default: false },
  resetToken: { type: String, default: "" },
  expireToken: { type: Date },
  updatedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

exports.userModel = mongoose.model("User", userSchema);

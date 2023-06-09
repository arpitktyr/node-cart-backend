const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  pincode: {
    type: String,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  catId: {
    type: String,
    required: true,
  },
  catImage: {
    type: String,
  },
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;

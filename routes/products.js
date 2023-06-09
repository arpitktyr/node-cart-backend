const express = require("express");

const { getAll, getAllCategory } = require("../data/product");
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const router = express.Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    next(error);
  }
});

router.get("/category", async (req, res, next) => {
  try {
    const category = await Category.find();
    res.json({ category });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

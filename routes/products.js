const express = require("express");

const { getAll, getAllCategory } = require("../data/product");

const router = express.Router();

router.get("/products", async (req, res, next) => {
  try {
    const products = await getAll();
    res.json({ products: products });
  } catch (error) {
    next(error);
  }
});

router.get("/category", async (req, res, next) => {
  try {
    const category = await getAllCategory();
    res.json({ category: category });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

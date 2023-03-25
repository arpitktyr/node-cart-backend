const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.products) {
    throw new NotFoundError("Could not find any products.");
  }
  return storedData.products;
}

async function getAllCategory() {
  const storedData = await readData();
  if (!storedData.category) {
    throw new NotFoundError("Could not find any categories.");
  }
  return storedData.category;
}

exports.getAll = getAll;
exports.getAllCategory = getAllCategory;

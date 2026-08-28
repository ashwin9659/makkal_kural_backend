const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const parentCategory = await Category.findById(category);
  if (!parentCategory) {
    res.status(400);
    throw new Error("Parent category is invalid");
  }

  const exists = await SubCategory.findOne({ name: name.trim(), category });
  if (exists) {
    res.status(400);
    throw new Error("This sub-category already exists under the selected category");
  }

  const subCategory = await SubCategory.create({ name: name.trim(), category });
  res.status(201).json({ success: true, data: subCategory });
});

const getSubCategories = asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  if (req.query.category) filter.category = req.query.category;

  const subCategories = await SubCategory.find(filter)
    .populate("category", "name")
    .sort({ name: 1 });

  res.json({ success: true, data: subCategories });
});

const getSubCategoryById = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id).populate("category", "name");
  if (!subCategory) {
    res.status(404);
    throw new Error("Sub-category not found");
  }
  res.json({ success: true, data: subCategory });
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const { name, category, isActive } = req.body;

  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory) {
    res.status(404);
    throw new Error("Sub-category not found");
  }

  if (category) {
    const parentCategory = await Category.findById(category);
    if (!parentCategory) {
      res.status(400);
      throw new Error("Parent category is invalid");
    }
    subCategory.category = category;
  }

  if (name) subCategory.name = name.trim();
  if (typeof isActive === "boolean") subCategory.isActive = isActive;

  await subCategory.save();
  res.json({ success: true, data: subCategory });
});

const deleteSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id);
  if (!subCategory) {
    res.status(404);
    throw new Error("Sub-category not found");
  }

  await subCategory.deleteOne();
  res.json({ success: true, message: "Sub-category deleted" });
});

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
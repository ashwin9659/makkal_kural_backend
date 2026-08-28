const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const exists = await Category.findOne({ name: name.trim() });
  if (exists) {
    res.status(400);
    throw new Error("A category with this name already exists");
  }

  const category = await Category.create({ name: name.trim() });
  res.status(201).json({ success: true, data: category });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });

  if (req.query.includeSubCategories === "true") {
    const categoriesWithSubs = await Promise.all(
      categories.map(async (cat) => {
        const subCategories = await SubCategory.find({ category: cat._id, isActive: true }).sort({
          name: 1,
        });
        return { ...cat.toObject(), subCategories };
      })
    );
    return res.json({ success: true, data: categoriesWithSubs });
  }

  res.json({ success: true, data: categories });
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.json({ success: true, data: category });
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (name) category.name = name.trim();
  if (typeof isActive === "boolean") category.isActive = isActive;

  await category.save();
  res.json({ success: true, data: category });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const subCount = await SubCategory.countDocuments({ category: category._id });
  if (subCount > 0) {
    res.status(400);
    throw new Error(
      `Cannot delete - ${subCount} sub-categor${subCount === 1 ? "y" : "ies"} still linked to this category. Delete those first.`
    );
  }

  await category.deleteOne();
  res.json({ success: true, message: "Category deleted" });
});

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
const express = require("express");
const { body } = require("express-validator");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);

router.post(
  "/",
  protect,
  authorize("admin"),
  [body("name").trim().notEmpty().withMessage("Category name is required")],
  createCategory
);

router.put("/:id", protect, authorize("admin"), updateCategory);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

module.exports = router;
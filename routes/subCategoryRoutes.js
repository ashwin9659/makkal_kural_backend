const express = require("express");
const { body } = require("express-validator");
const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSubCategories);
router.get("/:id", getSubCategoryById);

router.post(
  "/",
  protect,
  authorize("admin"),
  [
    body("name").trim().notEmpty().withMessage("Sub-category name is required"),
    body("category").notEmpty().withMessage("Parent category is required"),
  ],
  createSubCategory
);

router.put("/:id", protect, authorize("admin"), updateSubCategory);
router.delete("/:id", protect, authorize("admin"), deleteSubCategory);

module.exports = router;
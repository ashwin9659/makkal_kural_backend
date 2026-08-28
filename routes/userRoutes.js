const express = require("express");
const { body } = require("express-validator");
const { getAllUsers, updateSettings } = require("../controllers/userContoller");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, authorize("admin"), getAllUsers);

router.patch(
  "/me/settings",
  protect,
  [body("preferredLanguage").isIn(["en", "ta"]).withMessage("preferredLanguage must be 'en' or 'ta'")],
  updateSettings
);

module.exports = router;
const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phone")
      .matches(/^[6-9]\d{9}$/)
      .withMessage("Enter a valid 10-digit Indian mobile number"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("address").trim().notEmpty().withMessage("Address is required"),
    body("role").optional().isIn(["citizen", "admin"]).withMessage("Role must be citizen or admin"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("phone")
      .matches(/^[6-9]\d{9}$/)
      .withMessage("Enter a valid 10-digit Indian mobile number"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

router.get("/me", protect, getMe);

module.exports = router;

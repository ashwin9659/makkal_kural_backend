const express = require("express");
const {
  createTvkEnrollment,
  getMyTvkEnrollment,
  getAllTvkEnrollments,
} = require("../controllers/tvkEnrollmentController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("citizen"), createTvkEnrollment);
router.get("/my", protect, authorize("citizen"), getMyTvkEnrollment);
router.get("/", protect, authorize("admin"), getAllTvkEnrollments);

module.exports = router;

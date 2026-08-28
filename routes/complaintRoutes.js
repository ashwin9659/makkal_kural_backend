const express = require("express");
const { body } = require("express-validator");
const {
  createComplaint,
  getMyComplaints,
  getComplaintStats,
  getAllComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("citizen"),
  [
    body("category").notEmpty().withMessage("Category is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
  ],
  createComplaint
);

router.get("/my", protect, authorize("citizen"), getMyComplaints);
router.get("/stats", protect, authorize("citizen", "admin"), getComplaintStats);
router.get("/", protect, authorize("admin"), getAllComplaints);
router.patch("/:id/status", protect, authorize("admin"), updateComplaintStatus);

module.exports = router;
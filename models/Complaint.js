const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ward: { type: mongoose.Schema.Types.ObjectId, ref: "Ward", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: [true, "Category is required"] },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    description: { type: String, required: [true, "Description is required"], trim: true },
    photos: { type: [String], default: [] }, // URLs - upload handled separately
status: {
  type: String,
  enum: ["Pending", "Received", "In Progress", "Completed", "Rejected"],
  default: "Pending",
},    adminRemarks: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
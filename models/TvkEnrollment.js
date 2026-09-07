const mongoose = require("mongoose");

const tvkEnrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    aadhaarNumber: {
      type: String,
      required: [true, "Aadhaar number is required"],
      trim: true,
    },
    aadhaarPhoto: {
      type: String,
      required: [true, "Aadhaar photo is required"],
      trim: true,
    },
    voterIdNumber: {
      type: String,
      required: [true, "Voter ID number is required"],
      trim: true,
      uppercase: true,
    },
    voterIdPhoto: {
      type: String,
      required: [true, "Voter ID photo is required"],
      trim: true,
    },
    userPhoto: {
      type: String,
      required: [true, "User photo is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("TvkEnrollment", tvkEnrollmentSchema);

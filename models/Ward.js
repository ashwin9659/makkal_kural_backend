const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Optional: group wards under a constituency if the app expands beyond one area
    constituency: {
      type: String,
      trim: true,
      default: "Kotagaram Perur",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ward", wardSchema);

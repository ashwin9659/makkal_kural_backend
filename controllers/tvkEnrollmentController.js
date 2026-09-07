const asyncHandler = require("express-async-handler");
const TvkEnrollment = require("../models/TvkEnrollment");
const User = require("../models/User");

const createTvkEnrollment = asyncHandler(async (req, res) => {
  const {
    aadhaarNumber,
    aadhaarPhoto,
    aadharNumber,
    aadharPhoto,
    voterIdNumber,
    voterIdPhoto,
    userPhoto,
  } = req.body;
  const finalAadhaarNumber = aadhaarNumber || aadharNumber;
  const finalAadhaarPhoto = aadhaarPhoto || aadharPhoto;

  if (!/^\d{12}$/.test(String(finalAadhaarNumber || ""))) {
    res.status(400);
    throw new Error("Aadhaar number must contain exactly 12 digits");
  }

  const requiredFields = [
    [finalAadhaarPhoto, "Aadhaar photo"],
    [voterIdNumber, "Voter ID number"],
    [voterIdPhoto, "Voter ID photo"],
    [userPhoto, "User photo"],
  ];
  const missingField = requiredFields.find(
    ([value]) => !String(value || "").trim(),
  );
  if (missingField) {
    res.status(400);
    throw new Error(`${missingField[1]} is required`);
  }

  const existingEnrollment = await TvkEnrollment.findOne({
    user: req.user._id,
  });
  if (existingEnrollment) {
    res.status(400);
    throw new Error("TVK enrollment already exists for this user");
  }

  const enrollment = await TvkEnrollment.create({
    user: req.user._id,
    aadhaarNumber: finalAadhaarNumber,
    aadhaarPhoto: finalAadhaarPhoto,
    voterIdNumber,
    voterIdPhoto,
    userPhoto,
  });

  await User.findByIdAndUpdate(req.user._id, { tvkian: true });

  const populatedEnrollment = await enrollment.populate([
    {
      path: "user",
      select: "name phone tvkian",
      populate: { path: "ward", select: "name number" },
    },
  ]);

  res.status(201).json({ success: true, data: populatedEnrollment });
});

const getMyTvkEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await TvkEnrollment.findOne({ user: req.user._id })
    .populate("user", "name phone tvkian")
    .populate("user.ward", "name number");

  if (!enrollment) {
    res.status(404);
    throw new Error("TVK enrollment not found");
  }

  res.json({ success: true, data: enrollment });
});

const getAllTvkEnrollments = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
  const filter = {};

  const total = await TvkEnrollment.countDocuments(filter);
  const enrollments = await TvkEnrollment.find(filter)
    .populate("user", "name phone tvkian")
    .populate("user.ward", "name number")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    data: enrollments,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
});

module.exports = {
  createTvkEnrollment,
  getMyTvkEnrollment,
  getAllTvkEnrollments,
};

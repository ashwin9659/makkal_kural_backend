const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Ward = require("../models/Ward");
const generateToken = require("../utils/generateToken");

// @desc    Register a new citizen
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { name, phone, password, address, ward, role } = req.body;

  const finalRole = role === "admin" ? "admin" : "citizen";

  const userExists = await User.findOne({ phone });
  if (userExists) {
    res.status(400);
    throw new Error("An account with this phone number already exists");
  }

  let wardDoc = null;
  if (finalRole === "citizen") {
    if (!ward) {
      res.status(400);
      throw new Error("Ward is required");
    }
    wardDoc = await Ward.findById(ward);
    if (!wardDoc) {
      res.status(400);
      throw new Error("Selected ward is invalid");
    }
  }

  const user = await User.create({
    name,
    phone,
    password,
    address,
    role: finalRole,
    ...(wardDoc ? { ward: wardDoc._id } : {}),
  });

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      address: user.address,
      ward: wardDoc ? wardDoc.name : null,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

// @desc    Login with phone + password
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { phone, password } = req.body;

  // include password field explicitly since schema has select:false
  const user = await User.findOne({ phone }).select("+password").populate("ward", "name number");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid phone number or password");
  }

  if (!user.isActive) {
    res.status(403);
    throw new Error("This account has been deactivated");
  }

  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      address: user.address,
      ward: user.ward,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

// @desc    Get current logged-in user's profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("ward", "name number");
  res.json({ success: true, data: user });
});

module.exports = { registerUser, loginUser, getMe };

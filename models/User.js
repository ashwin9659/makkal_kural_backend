const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password by default
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    ward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ward",
      required: function () {
        return this.role === "citizen";
      },
    },
    role: {
      type: String,
      enum: ["citizen", "admin"],
      default: "citizen",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    preferredLanguage: {
  type: String,
  enum: ["en", "ta"],
  default: "en",
},
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

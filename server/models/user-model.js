const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Hashing password before saving user
userSchema.pre("save", async function (next) {
  const user = this;

  // If the password is not modified, move on to the next middleware
  if (!user.isModified("password")) return next();

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Set the hashed password
    user.password = hashedPassword;

    // Call next middleware
    next();
  } catch (error) {
    // Handle any error
    next(error);
  }
});

// Comparing password (should be async)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generation JWT token
userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin }, // Added more details in the token
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10d" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

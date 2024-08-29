const User = require("../models/user-model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "Please Input all the fields" });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
    }
    const user = new User({
      username: username,
      email: email,
      password: password,
    });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      token: user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please Input all the fields" });
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      res.status(400).json({ message: "User Does not exist" });
    }
    const isMatch = await existingUser.comparePassword(password);

    if (!isMatch) {
      res.status(400).json({ message: "Incorrect Password" });
    }

    res.json({
      message: "Login Successful",
      token: await existingUser.generateToken(),
      userId: existingUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Logging In" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found with this email." });
    }

    // Generate a token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set the token and expiration on the user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email with reset link
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             ${resetUrl}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent, please check your inbox." });
  } catch (error) {
    res.status(500).json({ message: "Error sending email." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password has been reset." }); // Return a valid JSON response
  } catch (error) {
    console.error("Error in resetPassword controller:", error);
    res.status(500).json({ message: "Error resetting password." }); // Return a valid JSON response in case of an error
  }
};

module.exports = { Register, Login, forgotPassword, resetPassword };

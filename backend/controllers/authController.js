const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Register User
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Send verification email
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const verificationLink = `http://localhost:3000/verify?token=${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verify your email",
      text: `Click the link to verify your email: ${verificationLink}`,
    });

    res.status(200).json({ message: "User registered! Verify your email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOneAndUpdate({ email }, { isVerified: true });
    if (!user) return res.status(400).send("Invalid token!");
    res.send("Email verified! You can now log in.");
  } catch (err) {
    res.status(400).send("Invalid or expired token!");
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: "admin" });
    if (!user) return res.status(403).send("You are not allowed to login from here!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials!");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true }).send("Admin logged in!");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

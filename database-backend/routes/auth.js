const express = require('express');
const User = require('../models/User');
const { sendVerificationEmail, generateOTP } = require('../utils/email');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OTPVerification = require('../models/OTPVerification');

const router = express.Router();

// Admin Registration
router.post('/admin/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({success:false, message: 'User already exists' });

  const otp = generateOTP();
  const newUser = new User({ firstName, lastName, email, password, role: 'admin' });

  await newUser.save();
  await sendVerificationEmail(email, otp);

  // Save OTP to verify
  // You would store OTP in DB, but for simplicity, it's just sent here.
  res.status(200).json({ success:true,message: 'Verification OTP sent to email' });
});

// Customer Registration
router.post('/customer/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({success:false, message: 'User already exists' });

  const otp = generateOTP();
  const newUser = new User({ firstName, lastName, email, password, role: 'customer' });

  await newUser.save();
  await sendVerificationEmail(email, otp);

  res.status(200).json({success:true, message: 'Verification OTP sent to email' });
});


// OTP Verification
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
  
    const otpRecord =  OTPVerification.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({success:false, message: 'Invalid OTP or OTP expired' });
    }
  
    await OTPVerification.deleteOne({ email });
  
    res.status(200).json({success:true, message: 'OTP verified successfully' });
  });

// Admin Login
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ success: false, message: 'User not found' });

  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'You are not allowed to login from here' });
  }

  if (!user.isVerified) {
    return res.status(400).json({ success: false, message: 'Admin not verified. Please check your email for verification.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ success: true, message: 'Login successful', token });
});


module.exports = router;

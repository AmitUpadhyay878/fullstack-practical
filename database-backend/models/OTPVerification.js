const mongoose = require('mongoose');

const OTPVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // after 5 minutes OTP expire
});

const OTPVerification = mongoose.model('OTPVerification', OTPVerificationSchema);

module.exports = OTPVerification;

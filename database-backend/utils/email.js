const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Your OTP for verification is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

module.exports = { sendVerificationEmail, generateOTP };

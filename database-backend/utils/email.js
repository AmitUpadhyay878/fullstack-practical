const nodemailer = require('nodemailer');
const crypto = require('crypto');


const sendVerificationEmail = (email, otp) => {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Your OTP for verification is: ${otp}`,
  };

  return transporter.sendMail(mailOptions,(error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

module.exports = { sendVerificationEmail, generateOTP };
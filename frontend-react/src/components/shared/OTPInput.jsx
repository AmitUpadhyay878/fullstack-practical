import React, { useState } from "react";
import "./OTPInput.css";

const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  
  // Handle individual input change
  const handleChange = (element, index) => {
    if (!/^[0-9]*$/.test(element.value)) return; // Allow only numeric input

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Call the parent onChange handler with the full OTP
    onChange(newOtp.join(""));

    // Focus the next input if current is filled
    if (element.value && index < length - 1) {
      element.nextSibling?.focus();
    }
  };

  // Handle backspace to move to the previous input
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      event.preventDefault();
      const prevInput = event.target.previousSibling;
      prevInput?.focus();
    }
  };

  // Handle paste event for OTP
  const handlePaste = (event) => {
    const pastedData = event.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");
    const newOtp = [...otp];
    pastedData.forEach((char, idx) => {
      if (/^[0-9]$/.test(char) && idx < length) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join(""));
  };

  return (
    <div className="otp-input-container">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OTPInput;

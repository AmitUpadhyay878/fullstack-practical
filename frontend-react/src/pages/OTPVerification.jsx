import React, { useEffect, useState } from "react";
import OTPInput from "../components/shared/OTPInput";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";


const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [otp, setOtp] = useState("");

  const email = location?.state?.email; 

  useEffect(() => {
    if (!email) {
      navigate(-1)
    }
  }, [email]);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async () => {
    if (otp.length === 6) {
      try {
        const response = await API.post("/verify-otp", { email, otp });
        if (response.data.success) {
          alert("OTP verified successfully!");
          navigate("/admin-dashboard");
        } else {
          alert("Invalid OTP, please try again.");
        }
      } catch (error) {
        alert(`${error?.response.data.message}`);
        console.error(error);
      }
    } else {
      alert("Please enter a valid OTP");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <OTPInput length={6} onChange={handleOtpChange} />
      <button onClick={handleSubmit}>Verify</button>
    </div>
  );
};

export default OTPVerification;

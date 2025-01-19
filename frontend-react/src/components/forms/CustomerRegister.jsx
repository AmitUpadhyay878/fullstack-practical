import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const CustomerRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await API.post("/customer/register", data);
      alert("Registration successful! Check your email for OTP.");
      navigate("/otp-verification", { state: { email: data.email } });
    } catch (error) {
      alert(error.message || "Registration failed");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Customer Registration</h2>

      <input
        type="text"
        placeholder="First Name"
        {...register("firstName", { required: "First Name is required" })}
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input
        type="text"
        placeholder="Last Name"
        {...register("lastName", { required: "Last Name is required" })}
      />
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default CustomerRegister;

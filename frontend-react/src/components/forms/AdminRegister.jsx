import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import API from "../../api/api"; 

const AdminRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await API.post("/admin/register", data);
      alert("Registration successful! Check your email for OTP.");
      navigate("/otp-verification", { state: { email: data?.email } });
    } catch (error) {
      alert(error.message || "Registration failed");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Admin Registration</h2>

      <input
        type="text"
        placeholder="First Name"
        {...register("firstName", { required: "First Name is required" })}
      />
      {errors?.firstName && <p>{errors?.firstName?.message}</p>}

      <input
        type="text"
        placeholder="Last Name"
        {...register("lastName", { required: "Last Name is required" })}
      />
      {errors?.lastName && <p>{errors?.lastName?.message}</p>}

      <input
        type="text"
        placeholder="Email"
        {...register("email", { required: "Email is required"
            ,pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
         })}
      />
      {errors?.email && <p>{errors?.email?.message}</p>}

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
      {errors?.password && <p>{errors?.password?.message}</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default AdminRegister;

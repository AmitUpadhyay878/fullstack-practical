import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../../api/api';
import useAuthStore from '../../store/useAuthStore'; 

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuthStore(); 

  const onSubmit = async (data) => {
    try {
      const response = await API.post('/admin/login', data);
      login(response.data.token);
      alert('Login successful!');
    } catch (error) {
      console.log(error,"error");

      if(error.response.data.message){
        alert(error.response.data.message || 'Login failed')
      }
      else{
        alert(error.message || 'Login failed');
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Admin Login</h2>
      <input type="text" placeholder="Email" {...register('email', { required: true,
       pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid email address",
          }, })} />
      {errors?.email && <p>Email is required</p>}

      <input type="password" placeholder="Password" {...register('password', { required: true })} />
      {errors?.password && <p>Password is required</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;

// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRegister from './components/forms/AdminRegister';
import CustomerRegister from './components/forms/CustomerRegister';
import AdminLogin from './components/forms/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import Home from './pages/Home';
import Header from './components/Header';
import useAuthStore from './store/useAuthStore'; 
import OTPVerification from './pages/OTPVerification';

const App = () => {
  const { initializeUser } = useAuthStore();

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

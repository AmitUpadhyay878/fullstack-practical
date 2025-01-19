
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuthStore(); 

  if (!user) return <Navigate to="/admin/login" />;

  try {
    const decodedToken = JSON.parse(atob(user.token.split('.')[1])); 
    if (decodedToken.role !== role) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;



// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import {jwtDecode} from "jwt-decode"; 

// const ProtectedRoute = ({ children, role }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/admin/login" />;

//   try {
//     const decodedToken = jwtDecode(user.token);
//     if (decodedToken.role !== role) {
//       return <Navigate to="/" />;
//     }
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return <Navigate to="/admin/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

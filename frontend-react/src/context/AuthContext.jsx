
import React, { createContext, useState } from 'react';
import { setAuthToken } from '../api/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
   
    const token = localStorage.getItem('token') || null;
    return token ? { token } : null;
  });

  const login = (token) => {
    localStorage.setItem('token', token); 
    setAuthToken(token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token'); 
    setAuthToken(null);
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



// import React, { createContext, useState } from 'react';
// import { setAuthToken } from '../api/api';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setAuthToken(token);
//     setUser({ token });
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuthToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

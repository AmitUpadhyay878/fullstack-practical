// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuthStore(); 

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/admin-register">Admin Register</Link>
              </li>
              <li>
                <Link to="/customer-register">Customer Register</Link>
              </li>
              <li>
                <Link to="/admin-login">Admin Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

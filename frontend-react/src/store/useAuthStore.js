
import { create } from 'zustand';
import setAuthToken from '../api/api';

const useAuthStore = create((set) => ({
  user: null,


  login: (token) => {
    localStorage.setItem('token', token); 
    setAuthToken(token);          
    set({ user: { token } });
  },


  logout: () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    set({ user: null });
  },


  initializeUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ user: { token } });
      setAuthToken(token);
    }
  }
}));

export default useAuthStore;

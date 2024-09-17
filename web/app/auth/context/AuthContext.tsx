'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'client';
  phone?: string;
}

interface AuthContextProps {
  user: User | null;  
  login: (email: string, password: string) => Promise<void>;
  signup: (first_name: string, last_name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        email,
        password,
      });
      Cookies.set('access', response.data.access);
      Cookies.set('refresh', response.data.refresh);
      await fetchUser();
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string, phone: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone,
      });
      await login(email, password);
      console.log('Signup and login successful:', response.data);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    setUser(null);
    router.push('/');
  };

  const fetchUser = async () => {
    const accessToken = Cookies.get('access');
    if (accessToken) {
      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Fetched user data:', response.data); // Add this line for debugging
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
        logout();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
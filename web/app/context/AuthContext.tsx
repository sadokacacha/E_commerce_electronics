'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (first_name: string, last_name: string, email: string, password: string) => Promise<void>;
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
    }
  };

  const signup = async (first_name: string, last_name: string, email: string, password: string) => {
    try {
      await axios.post('http://localhost:8000/api/register/', {
        first_name,
        last_name,
        email,
        password,
      });
      await login(email, password);
    } catch (error) {
      console.error('Signup failed', error);
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
    const refreshToken = Cookies.get('refresh');

    if (!accessToken && refreshToken) {
      try {
        const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        });
        Cookies.set('access', refreshResponse.data.access); // Update access token
      } catch (refreshError) {
        console.error('Refresh token expired or invalid', refreshError);
        logout();
        return;
      }
    }

    try {
      const updatedAccessToken = Cookies.get('access');
      if (updatedAccessToken) {
        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${updatedAccessToken}`,
          },
        });
        setUser(response.data);
      } else {
        throw new Error('Access token missing after refresh');
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
      setUser(null);
      logout();
    } finally {
      setLoading(false);
    }
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

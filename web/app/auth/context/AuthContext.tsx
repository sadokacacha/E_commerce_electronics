'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios , { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Define User and AuthContext types
interface User {
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'client';
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

  // Function to log in
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        email,
        password,
      });
      Cookies.set('access', response.data.access);
      Cookies.set('refresh', response.data.refresh);
      await fetchUser();  // Fetch user data after login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Function to sign up
  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8000/api/register/', {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        });

        // After successful signup, automatically log in the user
        await login(email, password); 
        console.log('Signup and login successful:', response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Signup failed:', error.response?.data || error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
};
  // Function to log out
  const logout = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    setUser(null);
    router.push('/');  // Redirect to home page after logout
  };

  // Function to fetch user data
  const fetchUser = async () => {
    const refreshToken = Cookies.get('refresh');

    if (refreshToken) {
      try {
        const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        });
        Cookies.set('access', refreshResponse.data.access);  // Update access token
      } catch (error) {
        console.error('Refresh token expired or invalid', error);
        logout();  // Logout if refresh token fails
        return;
      }
    }

    const accessToken = Cookies.get('access');

    if (accessToken) {
      try {
        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
        logout();  // Logout if fetch user fails
      }
    } else {
      logout();  // If access token is missing, logout
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUser();  // Fetch user on component mount
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

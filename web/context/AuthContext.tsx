// context/AuthContext.tsx
'use client';

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Define AuthContextType
type AuthContextType = {
  user: any; // Replace 'any' with a specific user type if you have one
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

// Initialize AuthContext with the correct type
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null); // Replace 'any' with the specific user type if you have one
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get('access');
        if (accessToken) {
          const res = await axios.get('http://localhost:8000/api/user/', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUser(res.data);
        }
      } catch (error) {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await axios.post('http://localhost:8000/api/token/', { username, password });
    Cookies.set('access', res.data.access, { secure: true, sameSite: 'Strict' });
    Cookies.set('refresh', res.data.refresh, { secure: true, sameSite: 'Strict' });
    setUser(res.data.user);
    router.push('/');
  };

  const logout = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    setUser(null); 
    router.push('/login'); 
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;

"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "client";
  phone?: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string
  ) => Promise<void>;
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
      const response = await axios.post("http://localhost:8000/api/token/", {
        email,
        password,
      });
      Cookies.set("access", response.data.access);
      Cookies.set("refresh", response.data.refresh);
      await fetchUser(); // Fetch user after successful login
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string
  ) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone,
      });
      await login(email, password); // Automatically log in after signup
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    setUser(null);
    router.push('/');
    window.location.reload(); // Force a reload to clear user state in the frontend
  };
  
  const fetchUser = async () => {
    const accessToken = Cookies.get("access");
    if (accessToken) {
      try {
        const response = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        console.log("Raw response from API:", response.data); // Log the raw response
  
        const fetchedUser = response.data;  // Directly set the user data from the response
        setUser(fetchedUser);  // Set the user in the state, including the user ID
      } catch (error) {
        console.error("Failed to fetch user", error);
        logout(); // Logout if token fetch fails
      }
    } else {
      setUser(null);
    }
    setLoading(false); // Loading finished after user fetch
  };
  useEffect(() => {
    fetchUser();
  }, []);

  // Add this useEffect to log when the user state changes
  useEffect(() => {
    if (user) {
      console.log("User has been set", user); // Log when user state is updated
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

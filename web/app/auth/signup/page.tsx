"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Signup() {
  const { signup, login } = useAuth();
  const [firstName, setFirstName] = useState<string>(""); 
  const [lastName, setLastName] = useState<string>(""); 
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 
  const [repeatPassword, setRepeatPassword] = useState<string>(""); // New field for repeat password
  const [error, setError] = useState<string>(""); // Error state for mismatched passwords
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    
    // Sign up user
    await signup(firstName, lastName, email, password);
    
    // Log in automatically or redirect to login
    await login(email, password); // Automatically login the user
    router.push("/"); // Redirect to dashboard after login
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Repeat Password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        required
      />
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
    </form>
  );
}

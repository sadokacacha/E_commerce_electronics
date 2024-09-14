'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState<string>('');  // First name input
  const [lastName, setLastName] = useState<string>('');    // Last name input
  const [email, setEmail] = useState<string>('');          // Email input
  const [password, setPassword] = useState<string>('');    // Password input
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(firstName, lastName, email, password);  // Pass all four arguments
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}

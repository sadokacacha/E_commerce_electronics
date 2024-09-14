// app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
      });

      // Automatically log the user in after successful signup
      const loginRes = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      // Store tokens in secure cookies
      Cookies.set('access', loginRes.data.access, { secure: true, sameSite: 'Strict' });
      Cookies.set('refresh', loginRes.data.refresh, { secure: true, sameSite: 'Strict' });

      router.push('/'); // Redirect to the homepage after signup and login
    } catch (error) {
      setError('Error during signup, please try again.');
      console.error('Error during signup', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        <button className="p-2 bg-blue-500 text-white w-full">Sign Up</button>
      </form>
    </div>
  );
}

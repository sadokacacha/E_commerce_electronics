// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', {
        username,
        password
      });
      // Store tokens in secure cookies
      Cookies.set('access', res.data.access, { secure: true, sameSite: 'Strict' });
      Cookies.set('refresh', res.data.refresh, { secure: true, sameSite: 'Strict' });

      alert('Login successful');
      router.push('/'); // Redirect to the home page after login
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-2 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}

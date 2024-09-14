// Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

export default function Navbar() {
  const { user, logout, loading } = useAuth(); // Use AuthContext to get the user and logout function

  if (loading) return <p>Loading...</p>; // Display loading state

  return (
    <nav className="bg-gray-900 p-4 text-white">
      <ul className="flex space-x-4">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/cart">Cart</Link></li>
        {!user ? (
          <>
            <li><Link href="/auth/login">Login</Link></li>
            <li><Link href="/auth/signup">Sign Up</Link></li>
          </>
        ) : (
          <li>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

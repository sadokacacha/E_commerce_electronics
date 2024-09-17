"use client";

import Link from "next/link";
import { useAuth } from "../app/auth/context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <nav className="bg-gray-900 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/signup">Sign Up</Link>
            </li>
          </>
        ) : user.role === "client" ? (
          <>
            <li>
              <Link href="/orders">Your Orders</Link>
            </li>
            <li>
              <Link href="/cart">Your Cart</Link>
            </li>
            {/* Add other admin-specific links here */}
          </>
        ) : user.role === "admin" ? (
          <>
            <li>
              <Link href="/admin">Admin Dashboard</Link>
            </li>
            {/* Add other client-specific links here */}
          </>
        ) : null}

        {user && (
          <li>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

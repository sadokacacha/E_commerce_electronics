// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 text-white">
    <ul className="flex space-x-4">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/products">Products</Link></li>
      <li><Link href="/cart">Cart</Link></li>
      <li><Link href="/auth/login">Login</Link></li>
    </ul>
  </nav>
  );
}

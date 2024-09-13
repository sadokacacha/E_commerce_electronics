import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-commerce Site',
  description: 'An Electronics E-commerce Website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <a href="/" className="text-2xl font-bold">E-commerce</a>
            <div>
              <a href="/cart" className="ml-4">Cart</a>
              <a href="/signup" className="ml-4">Sign Up</a>
              <a href="/login" className="ml-4">Login</a>
            </div>
          </nav>
        </header>
        <main className="container mx-auto mt-8">{children}</main>
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
          © 2024 E-commerce, All Rights Reserved.
        </footer>
      </body>
    </html>
  );
}

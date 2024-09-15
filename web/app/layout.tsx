import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./auth/context/AuthContext";
import Navbar from "@/components/Navbar"; // Import Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-commerce Site",
  description: "An Electronics E-commerce Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <header>
            <Navbar />
          </header>
          <main className="container mx-auto mt-8">{children}</main>
          <footer className="bg-gray-800 text-white text-center p-4 mt-8">
            © 2024 E-commerce, All Rights Reserved SADOK ACACHA MUHAHAHAH.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

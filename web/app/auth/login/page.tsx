"use client";

import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
    router.push("/"); // Redirect after successful login
  };

  useEffect(() => {
    if (user) {
      router.push("/"); // Redirect if already logged in
    }
  }, [user, router]);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] bg-gray-50">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-bold text-blue-600">Login</h1>
            <p className="text-gray-500">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto text-sm text-blue-600 underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 w-full"
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="border border-orange-500 text-orange-500 hover:bg-orange-100 w-full"
            >
              Login with Google
            </Button>
            <Button
              variant="outline"
              className="border border-blue-500 text-blue-500 hover:bg-blue-100 w-full"
            >
              Login with facebook
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-700">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      {/* Replace the src attribute with an actual image URL */}
      <div className="hidden bg-gray-200 lg:block">
        <div

          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        >
         image here

          </div>
      </div>
    </div>
  );
}

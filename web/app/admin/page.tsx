'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Package, Tag } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(true); // Set to true for design testing
  const [loading, setLoading] = useState(false); // Set to false for design testing
  const [topProducts, setTopProducts] = useState([
    { name: 'Product A', sales: 400 },
    { name: 'Product B', sales: 300 },
    { name: 'Product C', sales: 200 },
    { name: 'Product D', sales: 100 },
  ]);
  const router = useRouter();

  // Simulate loading for design testing
  useEffect(() => {
    const accessToken = Cookies.get('access');
    if (!accessToken) {
      router.push('/auth/login');
      return;
    }

    // Mock admin check
    setIsAdmin(true); // Assuming the user is an admin
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null; // This could be an error message or redirect
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
            <CardDescription>Add, edit, or remove products from your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/admin/products')}>
              <Package className="mr-2 h-4 w-4" /> Manage Products
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Categories</CardTitle>
            <CardDescription>Organize your products with categories</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => router.push('/admin/categories')}>
              <Tag className="mr-2 h-4 w-4" /> Manage Categories
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Most Bought Products</CardTitle>
          <CardDescription>Top selling products in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Alert className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Remember to regularly update your product inventory and check for new orders.
        </AlertDescription>
      </Alert>
    </div>
  );
}

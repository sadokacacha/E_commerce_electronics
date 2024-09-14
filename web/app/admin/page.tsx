'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AdminLayout from './layout';
import Link from 'next/link';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('access');
    if (!accessToken) {
      router.push('/auth/login');
      return;
    }

    axios
      .get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data.role !== 'admin') {
          router.push('/');
        } else {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        console.error('Error verifying admin role', error);
        router.push('/');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div>
        <Link href="/admin/products">Manage Products</Link>
      </div>
      <div>
        <Link href="/admin/categories">Manage Categories</Link>
      </div>
    </AdminLayout>
  );
}

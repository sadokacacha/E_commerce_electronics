'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
};

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      setProducts((products) =>
        products.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Manage Products</h1>
      <Link href="/admin/products/form">Add New Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            <Link href={`/admin/products/form?id=${product.id}`}>Edit</Link>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

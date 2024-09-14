'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Category = {
  id: number;
  name: string;
};

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      setCategories((categories) =>
        categories.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      <Link href="/admin/categories/form">Add New Category</Link>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <Link href={`/admin/categories/form?id=${category.id}`}>Edit</Link>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

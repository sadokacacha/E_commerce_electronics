'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import ProductForm from './form';  // Import the form component

type Product = {
  id: number;
  name: string;
};

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // To toggle between list and form
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null); // For editing

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

  const handleAddNewProduct = () => {
    setSelectedProductId(null); // Clear selected product for a new form
    setIsFormVisible(true); // Show the form
  };

  const handleEditProduct = (id: number) => {
    setSelectedProductId(id); // Set the product to be edited
    setIsFormVisible(true); // Show the form
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Manage Products</h1>

      {isFormVisible ? (
        // Render the form when isFormVisible is true
        <ProductForm productId={selectedProductId} onClose={() => setIsFormVisible(false)} />
      ) : (
        <>
          <button onClick={handleAddNewProduct}>Add New Product</button>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name}
                <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

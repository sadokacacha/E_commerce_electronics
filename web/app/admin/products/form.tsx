'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  price: string;
  description: string;
  stock: string;
  image: File | null;
}

interface ProductFormProps {
  productId: number | null;
  onClose: () => void;
}

export default function ProductForm({ productId, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    description: '',
    stock: '',
    image: null,
  });

  const router = useRouter();

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((error) => console.error(error));
    }
  }, [productId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const method = productId ? 'PUT' : 'POST';
    const url = productId ? `/api/products/${productId}` : '/api/products';

    const formDataToSend = new FormData();
    for (const key in formData) {
      const value = formData[key as keyof FormData];
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    }

    try {
      await fetch(url, {
        method,
        body: formDataToSend,
      });
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFormData({ ...formData, image: e.target.files[0] });
            }
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Product
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
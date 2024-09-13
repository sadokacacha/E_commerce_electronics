 "use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const res = await axios.get<CartItem[]>('http://localhost:8000/api/cart');
      setCartItems(res.data);
    };

    fetchCartItems();
  }, []);

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between p-4 bg-gray-100 mb-2">
            <span>{item.product.name}</span>
            <span>{item.quantity}</span>
            <span>${item.product.price}</span>
          </li>
        ))}
      </ul>
      <button className="mt-4 p-2 bg-blue-500 text-white">Proceed to Checkout</button>
    </div>
  );
}

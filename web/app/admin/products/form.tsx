import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProductForm() {
    const [formData, setFormData] = useState({ name: '', price: '', description: '' });
    const router = useRouter();
    const { id } = router.query;  // Check if editing or adding a new product

    useEffect(() => {
        if (id) {
            // Fetch product data for editing
            fetch(`/api/products/${id}`)
                .then(res => res.json())
                .then(data => setFormData(data))
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/products/${id}` : '/api/products';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            router.push('/admin/product');  // Redirect to product list
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
            <button type="submit">Save Product</button>
        </form>
    );
}

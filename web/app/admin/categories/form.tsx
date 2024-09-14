import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CategoryForm() {
    const [formData, setFormData] = useState({ name: '' });
    const router = useRouter();
    const { id } = router.query;  // Check if editing or adding a new category

    useEffect(() => {
        if (id) {
            // Fetch category data for editing
            fetch(`/api/categories/${id}`)
                .then(res => res.json())
                .then(data => setFormData(data))
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/categories/${id}` : '/api/categories';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            router.push('/admin/category');  // Redirect to category list
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Category Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <button type="submit">Save Category</button>
        </form>
    );
}

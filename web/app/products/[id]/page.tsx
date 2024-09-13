// app/products/[id]/page.tsx
import axios from 'axios';

async function getProduct(id: string) {
  const res = await axios.get(`http://localhost:8000/api/products/${id}`);
  return res.data;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p className="font-bold">${product.price}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
}

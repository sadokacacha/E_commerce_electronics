// app/products/page.tsx
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

async function getProducts() {
  const res = await axios.get('http://localhost:8000/api/products/');
  return res.data;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

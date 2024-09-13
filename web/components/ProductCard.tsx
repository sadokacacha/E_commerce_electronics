// components/ProductCard.tsx
import Link from 'next/link';

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="border rounded p-4">
      <Link href={`/products/${product.id}`}>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p>{product.description}</p>
        <p className="font-bold">${product.price}</p>
      </Link>
    </div>
  );
}

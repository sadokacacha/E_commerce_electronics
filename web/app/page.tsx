import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Our Electronics Store
      </h1>
      <p className="mb-4">
        Find the best electronics at affordable prices. Browse our categories
        and check out our amazing products!
      </p>
      <Link href="/products" className="p-4 bg-blue-500 text-white rounded">
        Shop Now
      </Link>
    </div>
  );
}

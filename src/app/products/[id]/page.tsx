// src/app/products/[id]/page.tsx

import { notFound } from "next/navigation";

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
};

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`, {
    cache: "no-store", // so it doesn’t cache the product data
  });

  if (!res.ok) return notFound();

  const product: Product = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-auto mb-4" />
      <p className="mb-2">{product.description}</p>
      <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
      <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
    </div>
  );
}

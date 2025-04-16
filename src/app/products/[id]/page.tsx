// src/app/products/[id]/page.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) {
            throw new Error("Product not found");
          }
          const data = await response.json();
          setProduct(data);
        } catch (error: any) {
          setError(error.message || "An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-auto" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
    </div>
  );
}


//ecommerce-store\src\app\api\products\[id]\page.tsx

"use client"; // This tells Next.js to treat this as a client component

import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard"; // Adjust the path based on your structure

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

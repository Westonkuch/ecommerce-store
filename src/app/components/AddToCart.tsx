// C:\Users\TC Panther\ecommerce-store\ecommerce-store\src\app\components\AddToCart.tsx

'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types/Products';





export function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors"
    >
      Add to Cart - ${product.price.toFixed(2)}
    </button>
  );
}
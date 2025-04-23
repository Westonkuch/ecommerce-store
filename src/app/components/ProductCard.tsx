// components/ProductCard.tsx
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

// This should match exactly with your CartContext's Product type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function ProductCard({ 
  product,
  showDescriptionOnHover = false 
}: {
  product: Product;
  showDescriptionOnHover?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Just pass the product - the context will handle adding quantity
    addToCart(product);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        
        {showDescriptionOnHover && isHovered && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
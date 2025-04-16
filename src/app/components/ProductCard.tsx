// src/components/ProductCard.tsx
export default function ProductCard({ product }: { product: any }) {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto mb-4"
        />
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-lg font-bold">${product.price}</p>
      </div>
    );
  }
  
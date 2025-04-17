'use client';

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function DiscGolfStore() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error("Expected JSON but received something else");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    
    let priceMatch = true;
    if (selectedPriceRange) {
      switch (selectedPriceRange) {
        case '10-20':
          priceMatch = product.price >= 10 && product.price <= 20;
          break;
        case '20-50':
          priceMatch = product.price > 20 && product.price <= 50;
          break;
        case '50+':
          priceMatch = product.price > 50;
          break;
        default:
          priceMatch = true;
      }
    }
    
    return categoryMatch && priceMatch;
  });

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img 
          src="/images/background.png" 
          alt="Disc golf background"
          className="w-full h-full object-cover opacity-20" // Adjust opacity as needed
        />
        <div className="absolute inset-0 bg-white/30"></div> {/* Light overlay for better readability */}
      </div>
      
      {/* Content */}
      <div className="relative"> {/* This ensures content stays above background */}
        <Header />
        <main className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
          <div className="flex">
            <Sidebar 
              onCategorySelect={setSelectedCategory} 
              onPriceSelect={setSelectedPriceRange} 
            />
            <section className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.length === 0 ? (
                <div className="bg-white p-4 rounded-lg shadow">
                  No products found matching your filters
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
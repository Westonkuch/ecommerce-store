// app/products/[id]/page.tsx
'use client';
import { notFound } from 'next/navigation';
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";
import {AddToCart} from "@/app/components/AddToCart";
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`, {
          next: { revalidate: 3600 }
        });
        
        if (!res.ok) {
          throw new Error('Product not found');
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return notFound();
  if (!product) return notFound();

  return (
    <div className="relative min-h-screen">
      {/* Background Image - Matches home page */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/background.png"
          alt="Disc golf background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-white/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative">
        <Header />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            <Sidebar 
              onCategorySelect={() => {}} 
              onPriceSelect={() => {}} 
            />
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  {/* Product Image */}
                  <div className="md:w-1/2 p-6">
                    <div className="relative aspect-square bg-gray-50 rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="md:w-1/2 p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h1>
                    
                    <div className="flex items-center mb-4">
                      <span className="text-2xl font-semibold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-3 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded capitalize">
                        {product.category}
                      </span>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-2">
                        Description
                      </h2>
                      <p className="text-gray-600">{product.description}</p>
                    </div>

                    <AddToCart product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
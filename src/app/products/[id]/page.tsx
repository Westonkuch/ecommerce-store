// app/products/[id]/page.tsx

import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { AddToCart } from '@/app/components/AddToCart';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return notFound();

    const product: Product = await res.json();

    return (
      <div className="relative min-h-screen">
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

        <div className="relative">
          <Header />
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
                <div className="md:flex">
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
                  <div className="md:w-1/2 p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <div className="flex items-center mb-4">
                      <span className="text-2xl font-semibold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-3 text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded capitalize">
                        {product.category}
                      </span>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                    <AddToCart product={product} />
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}

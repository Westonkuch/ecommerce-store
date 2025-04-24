// app/cart/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      
      <Header />

      
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Your cart is empty</p>
            <Link
              href="/disc-golf-store"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-b last:border-b-0 flex flex-col sm:flex-row"
                  >
                    <div className="p-4 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-3 py-1 bg-gray-200 rounded-l"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="px-3 py-1 bg-gray-200 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col items-end">
                      <p className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 mt-2 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">AEROSPIN</h3>
              <p className="text-gray-400">
                Premium disc golf equipment and accessories.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-400">support@aerospin.com</p>
              <p className="text-gray-400">(123) 456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AEROSPIN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
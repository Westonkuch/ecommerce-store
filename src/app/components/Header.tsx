'use client';

import Image from "next/image";
import Link from "next/link";
import { Orbitron } from 'next/font/google';
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from 'react';
import Search from './Search';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

const NAV_LINKS = [
  { href: '/drivers', label: 'Drivers' },
  { href: '/midranges', label: 'Midranges' },
  { href: '/putters', label: 'Putters' },
  { href: '/accessories', label: 'Accessories' },
];

export default function Header() {
  const { cart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch products when search opens
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchOpen && products.length === 0) {
        try {
          const res = await fetch('/api/products');
          const data = await res.json();
          setProducts(data);
        } catch (err) {
          console.error('Failed to fetch products:', err);
        }
      }
    };

    fetchProducts();
  }, [searchOpen]);

  return (
    <header className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/header.jpg"
          alt="Header background"
          fill
          className="object-cover"
          quality={85}
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 relative">
        {/* Logo and Branding */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/disc-golf-store" 
            className="flex items-center space-x-4 hover:opacity-90 transition-opacity"
            onClick={() => {
              setSearchOpen(false);
              setMobileMenuOpen(false);
            }}
          >
            <div className="rounded-full overflow-hidden border-2 border-white hover:border-green-300 transition-all w-20 h-20 md:w-24 md:h-24">
              <Image 
                src="/images/logo2.png" 
                alt="Disc Golf Store" 
                width={96}
                height={96}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <h1 className={`${orbitron.className} text-2xl md:text-3xl text-white tracking-wider`}>
              <span className="text-green-300">AERO</span>
              <span className="text-white">SPIN</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="space-x-6 hidden md:flex">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="text-white hover:text-green-300 transition-colors font-medium"
              onClick={() => setSearchOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-green-300 transition-colors"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setSearchOpen(false);
            }}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Search Toggle */}
          <button 
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMobileMenuOpen(false);
            }}
            className="text-white hover:text-green-300 transition-colors"
            aria-label={searchOpen ? "Close search" : "Search products"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart Link */}
          <Link 
            href="/cart" 
            className="text-white hover:text-green-300 transition-colors flex items-center relative"
            onClick={() => {
              setSearchOpen(false);
              setMobileMenuOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 z-50 p-4">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-white hover:text-green-300 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search Component */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50">
          <Search 
            onClose={() => setSearchOpen(false)}
            className="max-w-7xl mx-auto p-4"
          />
        </div>
      )}
    </header>
  );
}
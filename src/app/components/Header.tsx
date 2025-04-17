// src/app/components/Header.tsx
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative">
      {/* Original header image without color alteration */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/header.jpg"
          alt="Header background"
          fill
          className="object-cover"
          quality={85}
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div> {/* Subtle overlay for text readability */}
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 relative">
        <div className="flex items-center">
          <Link href="/disc-golf-store">
            <Image 
              src="/images/logo2.png" 
              alt="Disc Golf Store" 
              width={150} 
              height={40}
              className="hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
        
        <nav className="space-x-6 hidden md:flex">
          <Link 
            href="/drivers" 
            className="text-white hover:text-gray-200 transition-colors font-medium"
          >
            Drivers
          </Link>
          <Link 
            href="/midranges" 
            className="text-white hover:text-gray-200 transition-colors font-medium"
          >
            Midranges
          </Link>
          <Link 
            href="/putters" 
            className="text-white hover:text-gray-200 transition-colors font-medium"
          >
            Putters
          </Link>
          <Link 
            href="/accessories" 
            className="text-white hover:text-gray-200 transition-colors font-medium"
          >
            Accessories
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-white hover:text-gray-200 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="ml-1">(0)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
// src/app/components/Header.tsx
import Image from "next/image";
import Link from "next/link"; // Import Link from next.js

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo Link to Home */}
          <Link href="/disc-golf-store">
            <Image src="/images/logo.jpg" alt="Disc Golf Store" width={150} height={40} />
          </Link>
        </div>
        <nav className="space-x-6">
          {/* Navigation Links */}
          <Link href="/drivers" className="hover:text-gray-400">
            Drivers
          </Link>
          <Link href="/midranges" className="hover:text-gray-400">
            Midranges
          </Link>
          <Link href="/putters" className="hover:text-gray-400">
            Putters
          </Link>
          <Link href="/accessories" className="hover:text-gray-400">
            Accessories
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {/* Buttons */}
          <button className="text-white">Search</button>
          <button className="text-white">Cart (0)</button>
        </div>
      </div>
    </header>
  );
}

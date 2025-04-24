// src/app/drivers/page.tsx
import Header from "../components/Header"; 
import Link from "next/link"; 

export default function Drivers() {
  return (
    <div>
      <Header /> 
      <h1>Disc Golf Drivers</h1>
      <p>Explore our selection of high-quality drivers for all levels of play.</p>
      
      {/* "Back to Home" Link */}
      <div className="text-center my-4">
        <Link href="/disc-golf-store" className="text-blue-500 hover:text-blue-700">
          &larr; Back to Home
        </Link>
      </div>
      
      
    </div>
  );
}

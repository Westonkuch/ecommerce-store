// src/app/components/Footer.tsx

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 Disc Golf Store. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
          </div>
        </div>
      </footer>
    );
  }
  
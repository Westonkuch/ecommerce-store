'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { debounce } from 'lodash';

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
};

export default function Search({
  onClose,
  className = '',
  maxResults = 5,
  debounceTime = 300
}: {
  onClose: () => void;
  className?: string;
  maxResults?: number;
  debounceTime?: number;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Enhanced search with debugging and error handling
  const performSearch = useCallback(
    debounce(async (searchQuery: string) => {
      console.log('[Search] Initiating search for:', searchQuery);
      
      if (searchQuery.length < 2) {
        console.log('[Search] Query too short, skipping');
        setResults([]);
        setIsOpen(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        console.log('[Search] Making API request...');
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        
        console.log(`[Search] Response status: ${res.status}`);
        
        // Enhanced error handling for API responses
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error('[Search] API Error:', errorData.error || res.statusText);
          throw new Error(errorData.error || 'Search failed');
        }

        const data: Product[] = await res.json();
        console.log('[Search] Received results:', data);
        
        setResults(data.slice(0, maxResults));
        setIsOpen(true);
        setError(null); // Clear any previous errors on success
      } catch (err) {
        console.error('[Search] Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to search products');
        setResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    }, debounceTime),
    [maxResults, debounceTime]
  );

  // Focus management
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Event listeners for closing search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeSearch();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      performSearch.cancel();
    };
  }, [performSearch]);

  // Trigger search when query changes
  useEffect(() => {
    performSearch(query);
    return () => performSearch.cancel();
  }, [query, performSearch]);

  const closeSearch = useCallback(() => {
    console.log('[Search] Closing search');
    setIsOpen(false);
    setQuery('');
    setError(null);
    onClose();
  }, [onClose]);

  const handleSelect = useCallback(
    (product: Product) => {
      console.log('[Search] Selected product:', product.id);
      router.push(`/products/${product.id}`); // Fixed: Changed from '/product' to '/products'
      closeSearch();
    },
    [router, closeSearch]
  );

  const highlightMatch = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search drivers, putters..."
          value={query}
          onChange={(e) => {
            console.log('[Search] Input changed:', e.target.value);
            setQuery(e.target.value);
          }}
          className="w-full px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10 border border-gray-300 transition-all"
          aria-label="Search products"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />
        <div className="absolute right-3 text-gray-500">
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-green-500 rounded-full" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden" role="listbox">
          {error ? (
            <div className="p-4 text-center text-red-500">
              {error} - Please try again
            </div>
          ) : results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                className="flex items-center p-3 hover:bg-gray-50 transition cursor-pointer border-b border-gray-100 last:border-0"
                onClick={() => handleSelect(product)}
                role="option"
                aria-selected="false"
              >
                <div className="relative w-10 h-10 mr-3 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                    sizes="40px"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">
                    {highlightMatch(product.name)}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm font-semibold text-green-600">
                      ${product.price.toFixed(2)}
                    </p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded capitalize">
                      {product.category}
                    </span>
                  </div>
                  {product.description && (
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {highlightMatch(product.description)}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              {query.length > 1 ? 'No products found' : 'Type to search...'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
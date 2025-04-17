type SidebarProps = {
  onCategorySelect: (category: string | null) => void;
  onPriceSelect: (priceRange: string | null) => void;
};

export default function Sidebar({ onCategorySelect, onPriceSelect }: SidebarProps) {
  return (
    <aside className="w-1/4 pr-6 space-y-4">
      <h3 className="text-xl font-semibold">Filters</h3>
      
      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="font-medium">Category</h4>
        <ul className="space-y-1">
          <li>
            <button 
              onClick={() => onCategorySelect(null)} 
              className="text-blue-600 hover:underline"
            >
              All
            </button>
          </li>
          <li>
            <button 
              onClick={() => onCategorySelect("drivers")} 
              className="text-blue-600 hover:underline"
            >
              Drivers
            </button>
          </li>
          <li>
            <button 
              onClick={() => onCategorySelect("midranges")} 
              className="text-blue-600 hover:underline"
            >
              Midranges
            </button>
          </li>
          <li>
            <button 
              onClick={() => onCategorySelect("putters")} 
              className="text-blue-600 hover:underline"
            >
              Putters
            </button>
          </li>
          <li>
            <button 
              onClick={() => onCategorySelect("accessories")} 
              className="text-blue-600 hover:underline"
            >
              Accessories
            </button>
          </li>
        </ul>
      </div>

      {/* Price Filter */}
      <div className="space-y-2">
        <h4 className="font-medium">Price</h4>
        <ul className="space-y-1">
          <li>
            <button 
              onClick={() => onPriceSelect(null)} 
              className="text-blue-600 hover:underline"
            >
              All Prices
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPriceSelect("10-20")} 
              className="text-blue-600 hover:underline"
            >
              $10 - $20
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPriceSelect("20-50")} 
              className="text-blue-600 hover:underline"
            >
              $20 - $50
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPriceSelect("50+")} 
              className="text-blue-600 hover:underline"
            >
              $50+
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
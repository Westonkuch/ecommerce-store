type SidebarProps = {
  onCategorySelect: (category: string | null) => void;
};

export default function Sidebar({ onCategorySelect }: SidebarProps) {
  return (
    <aside className="w-1/4 pr-6 space-y-4">
      <h3 className="text-xl font-semibold">Filters</h3>
      <div className="space-y-2">
        <h4 className="font-medium">Category</h4>
        <ul className="space-y-1">
          <li>
            <button onClick={() => onCategorySelect(null)} className="text-blue-600 hover:underline">
              All
            </button>
          </li>
          <li>
            <button onClick={() => onCategorySelect("drivers")} className="text-blue-600 hover:underline">
              Drivers
            </button>
          </li>
          <li>
            <button onClick={() => onCategorySelect("midranges")} className="text-blue-600 hover:underline">
              Midranges
            </button>
          </li>
          <li>
            <button onClick={() => onCategorySelect("putters")} className="text-blue-600 hover:underline">
              Putters
            </button>
          </li>
          <li>
            <button onClick={() => onCategorySelect("accessories")} className="text-blue-600 hover:underline">
              Accessories
            </button>
          </li>
        </ul>
      </div>

      {/* Optional: keep your price filters too */}
      <div className="space-y-2">
        <h4 className="font-medium">Price</h4>
        <ul className="space-y-1">
          <li><a href="#">$10 - $20</a></li>
          <li><a href="#">$20 - $50</a></li>
          <li><a href="#">$50+</a></li>
        </ul>
      </div>
    </aside>
  );
}

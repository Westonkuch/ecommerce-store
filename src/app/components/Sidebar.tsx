// src/app/components/Sidebar.tsx

export default function Sidebar() {
    return (
      <aside className="w-1/4 pr-6 space-y-4">
        <h3 className="text-xl font-semibold">Filters</h3>
        <div className="space-y-2">
          <h4 className="font-medium">Category</h4>
          <ul className="space-y-1">
            <li><a href="#">Drivers</a></li>
            <li><a href="#">Midranges</a></li>
            <li><a href="#">Putters</a></li>
          </ul>
        </div>
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
  
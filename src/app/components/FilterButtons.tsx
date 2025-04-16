// src/app/components/FilterButtons.tsx

interface FilterButtonsProps {
    onFilter: (category: string) => void;
  }
  
  const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilter }) => {
    const categories = ["Drivers", "Midranges", "Putters", "Accessories"];
  
    return (
      <div className="flex space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => onFilter("")}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => onFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default FilterButtons;
  
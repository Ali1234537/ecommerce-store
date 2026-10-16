
"use client";

type FilterBarProps = {
  category: string;
  setCategory: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  categories: string[];
};

function FilterBar({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  categories,
}: FilterBarProps) {
  const min = Number(minPrice || 0);
  const max = Number(maxPrice || 100000);

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-gray-200 bg-red-200 p-6 shadow-sm">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="min-w-52 cursor-pointer rounded-xl border border-gray-200 bg-gray-200 px-4 py-3 text-sm font-medium text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="All">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="w-96 rounded-xl border border-gray-200 bg-gray-200 p-5 text-gray-800">
        <div className="mb-5 flex justify-between">
          <span className="font-semibold">Price Range</span>
          <span className="text-sm font-medium text-blue-700">
            ${min.toLocaleString()} - ${max.toLocaleString()}
          </span>
        </div>

        <div className="flex gap-5">

          <div className="min-w-0 flex-1">
            <label className="mb-2 block text-sm">
              Minimum Price
            </label>

            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={min}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMinPrice(String(Math.min(value, max)));
              }}
              className="mb-3 w-full cursor-pointer accent-blue-800"
            />

            <p className="text-sm font-medium">
              ${min.toLocaleString()}
            </p>
          </div>


          <div className="min-w-0 flex-1">
            <label className="mb-2 block text-sm">
              Maximum Price
            </label>

            <input
              type="range"
              min={min}
              max="100000"
              step="1000"
              value={max}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mb-3 w-full cursor-pointer accent-blue-800"
            />

            <p className="text-sm font-medium">
              ${max.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;

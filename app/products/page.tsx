"use client";

import { useAppSelector } from "@/redux/hooks";
import ProductCard from "@/components/ProductCards";

import FilterBar from "@/components/FilterBar";

import { useState } from "react";


function ProductsPage() {

  const products = useAppSelector(
    (state) => state.product.Products
  );

  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const filteredProducts = products.filter((product) => {
    return (
      (category === "All" || product.category === category) &&
      (minPrice === "" || product.price >= Number(minPrice)) &&
      (maxPrice === "" || product.price <= Number(maxPrice))
    );
  });

  return (
    <main className="min-h-screen bg-red-100 px-4 py-6 sm:p-6 lg:p-8">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
        Products
      </h1>

      <FilterBar
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        categories={categories}
      />

      <p className="mb-4 text-sm text-gray-700 sm:text-base">
        Showing {filteredProducts.length} products
      </p>

      <div className="grid grid-cols-1 justify-items-center gap-4 rounded-2xl border border-gray-200 bg-red-200 p-3 shadow-sm sm:grid-cols-2 sm:gap-5 sm:p-4 lg:grid-cols-3 lg:gap-6">

        {filteredProducts.map((product) => (
          <ProductCard key={product.id}
            product={product} />
        ))}
        
      </div>
      {filteredProducts.length === 0 && (
        <p className="mt-6 px-2 text-center text-sm text-gray-600 sm:mt-8 sm:text-base">
          No Products Found!
        </p>
      )}
    </main>
  )
}

export default ProductsPage;

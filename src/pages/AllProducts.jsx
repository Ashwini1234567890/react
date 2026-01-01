import { useState } from "react";
import productsData from "../data/productsData";

const categories = ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"];

export default function AllProducts() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? productsData
      : productsData.filter((p) => p.category === active);

  return (
    <section className="bg-black min-h-screen py-16">
      <h2 className="text-center text-white text-2xl mb-8">
        All Products
      </h2>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-6 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 text-sm rounded ${
              active === cat
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
        
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#111] p-4 rounded border border-gray-800 hover:border-red-600 transition"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="h-40 mx-auto object-contain"
            />

            <h3 className="text-white mt-3 text-sm">
              {item.title}
            </h3>

            <p className="text-gray-400 text-xs">
              {item.info}
            </p>

            <div className="flex gap-2 mt-2">
              <span className="text-white font-semibold">
                ₹{item.finalPrice}
              </span>
              <span className="line-through text-gray-500 text-sm">
                ₹{item.originalPrice}
              </span>
            </div>

            <button className="bg-red-600 w-full mt-3 py-2 text-sm rounded">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
    
  );
  
}

import { useState } from "react";
import productsData from "../data/productsData";

const categories = ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"];

export default function TopProducts() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? productsData
      : productsData.filter((p) => p.category === active);

  return (
    <section className="bg-black py-16">
      <h2 className="text-center text-gray-300 mb-6">
        Top Products
      </h2>

      {/* CATEGORY TABS */}
      <div className="flex justify-center gap-6 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 text-sm ${
              active === cat
                ? "bg-red-600 text-white"
                : "text-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-6">

        {filtered.map((item) => (
          <div key={item.id} className="bg-[#111] p-4 rounded">
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

            <button className="bg-red-600 w-full mt-3 py-2 text-sm">
              Add to cart
            </button>
          </div>
        ))}

        {/* BROWSE ALL PRODUCTS CARD (ONLY ONCE) */}
        <div className="border border-gray-700 flex items-center justify-center
                        text-gray-400 hover:text-white cursor-pointer rounded">
          <span className="text-sm">
            Browse All Products →
          </span>
        </div>

      </div>
    </section>
  );
}

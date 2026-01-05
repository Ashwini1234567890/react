import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData";
import { brandsMenu, categoryMenu } from "../data/filterBarData";
import { useCart } from "../context/CartContext";

export default function AllProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const MAX_PRICE = Math.max(...productsData.map(p => p.finalPrice));

  // STATES
  const [sort, setSort] = useState("Latest");
  const [brandFilter, setBrandFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [price, setPrice] = useState(MAX_PRICE);

  // TOGGLE CHECKBOX
  const toggle = (value, setState) => {
    setState(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setSort("Latest");
    setBrandFilter([]);
    setCategoryFilter([]);
    setPrice(MAX_PRICE);
  };

  // FILTER
  let filtered = productsData.filter(item => {
    const brandOk =
      brandFilter.length === 0 ||
      brandFilter.some(
        b => b.toLowerCase() === item.brand.toLowerCase()
      );

    const categoryOk =
      categoryFilter.length === 0 ||
      categoryFilter.includes(item.category);

    const priceOk = item.finalPrice <= price;

    return brandOk && categoryOk && priceOk;
  });

  // SORT
  if (sort === "Price(Lowest First)") {
    filtered.sort((a, b) => a.finalPrice - b.finalPrice);
  }
  if (sort === "Price(Highest First)") {
    filtered.sort((a, b) => b.finalPrice - a.finalPrice);
  }
  if (sort === "Top Rated") {
    filtered.sort((a, b) => b.rateCount - a.rateCount);
  }
  if (sort === "Featured") {
    filtered = filtered.filter(p => p.tag === "featured-product");
  }

  return (
    <section className="bg-black min-h-screen pt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-[260px_1fr] gap-8">

        {/* LEFT SIDEBAR */}
        <aside className="text-gray-300 text-sm space-y-8 sticky top-24 h-fit">

          <button
            onClick={clearFilters}
            className="w-full bg-red-600 py-2 text-white"
          >
            Clear Filters
          </button>

          {/* SORT */}
          <div>
            <h3 className="font-semibold mb-2">Sort By</h3>
            <hr className="border-gray-700 mb-3" />
            {[
              "Latest",
              "Featured",
              "Top Rated",
              "Price(Lowest First)",
              "Price(Highest First)",
            ].map(opt => (
              <p
                key={opt}
                onClick={() => setSort(opt)}
                className={`cursor-pointer mb-2 ${
                  sort === opt ? "text-red-500" : "hover:text-white"
                }`}
              >
                {opt}
              </p>
            ))}
          </div>

          {/* BRANDS */}
          <div>
            <h3 className="font-semibold mb-2">Brands</h3>
            <hr className="border-gray-700 mb-3" />
            {brandsMenu.map(b => (
              <label key={b.id} className="flex gap-2 mb-2 items-center">
                <input
                  type="checkbox"
                  className="accent-red-600"
                  checked={brandFilter.includes(b.label)}
                  onChange={() => toggle(b.label, setBrandFilter)}
                />
                {b.label}
              </label>
            ))}
          </div>

          {/* CATEGORY */}
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <hr className="border-gray-700 mb-3" />
            {categoryMenu.map(c => (
              <label key={c.id} className="flex gap-2 mb-2 items-center">
                <input
                  type="checkbox"
                  className="accent-red-600"
                  checked={categoryFilter.includes(c.label)}
                  onChange={() => toggle(c.label, setCategoryFilter)}
                />
                {c.label}
              </label>
            ))}
          </div>

          {/* PRICE */}
          <div>
            <h3 className="font-semibold mb-2">Price: ₹{price}</h3>
            <input
              type="range"
              min="0"
              max={MAX_PRICE}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={{
                background: `linear-gradient(
                  to right,
                  #e60023 0%,
                  #e60023 ${(price / MAX_PRICE) * 100}%,
                  #444 ${(price / MAX_PRICE) * 100}%,
                  #444 100%
                )`
              }}
              className="w-full h-1 rounded-lg appearance-none cursor-pointer price-slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹0</span>
              <span>₹{MAX_PRICE}</span>
            </div>
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <div
          className="grid gap-6 items-start"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))"
          }}
        >
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-[#111] border border-gray-800 p-4 rounded
                         hover:border-red-600 transition cursor-pointer self-start"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img
                src={item.images[0]}
                className="h-40 mx-auto object-contain"
                alt={item.title}
              />

              <div className="text-red-500 text-xs mt-3">
                {"★".repeat(item.rateCount)}
              </div>

              <h3 className="text-white text-sm mt-1">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.info}</p>

              <div className="flex gap-2 mt-2">
                <span className="text-white font-semibold">
                  ₹{item.finalPrice}
                </span>
                <span className="line-through text-gray-500 text-sm">
                  ₹{item.originalPrice}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
                className="bg-red-600 w-full mt-4 py-2 text-sm hover:bg-red-700"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

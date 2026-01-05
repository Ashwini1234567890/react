import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData";
import { useCart } from "../context/CartContext";

const categories = ["All", "Headphones", "Earbuds", "Earphones", "Neckbands"];

export default function TopProducts() {
  const [active, setActive] = useState("All");
  const [addedId, setAddedId] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filtered =
    active === "All"
      ? productsData
      : productsData.filter((p) => p.category === active);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);

    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="bg-black py-16">
      <h2 className="text-center text-gray-300 mb-6 text-xl">
        Top Products
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
        {filtered.slice(0, 11).map((item) => (
          <div
            key={item.id}
            className="bg-[#111] p-4 rounded border border-gray-800 hover:border-red-600 transition"
          >
            {/* IMAGE */}
            <img
              src={item.images[0]}
              alt={item.title}
              className="h-40 mx-auto object-contain cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            />

            {/* TITLE */}
            <h3
              onClick={() => navigate(`/product/${item.id}`)}
              className="text-white mt-3 text-sm font-medium cursor-pointer hover:text-red-500"
            >
              {item.title}
            </h3>

            <p className="text-gray-400 text-xs">{item.info}</p>

            {/* ⭐ RATINGS */}
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-red-500">
                {"★".repeat(item.rateCount)}
              </span>
              <span className="text-gray-500 text-xs">
                ({item.ratings})
              </span>
            </div>

            {/* PRICE */}
            <div className="flex gap-2 mt-2 items-center">
              <span className="text-white font-semibold">
                ₹{item.finalPrice}
              </span>
              <span className="line-through text-gray-500 text-sm">
                ₹{item.originalPrice}
              </span>
            </div>

            {/* CART BUTTON */}
            <button
              onClick={() => handleAddToCart(item)}
              className={`w-full mt-3 py-2 text-sm rounded transition ${
                addedId === item.id
                  ? "bg-green-600"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {addedId === item.id ? "Added" : "Add to cart"}
            </button>
          </div>
        ))}

        {/* BROWSE ALL */}
        <div
          onClick={() => navigate("/Allproducts")}
          className="border border-gray-700 flex items-center justify-center
                     text-gray-400 hover:text-white cursor-pointer rounded
                     hover:border-red-600 transition"
        >
          <span className="text-sm font-medium">
            Browse All Products →
          </span>
        </div>
      </div>
    </section>
  );
}

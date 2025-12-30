import { FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { useState } from "react";
import productsData from "../data/productsData";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");

  const filteredResults = productsData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <header className="w-full bg-[#111] relative z-50">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-xl font-semibold text-white">
          Tech-Shop
        </h1>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6 text-white relative">

          {/* SEARCH BOX */}
          {openSearch && (
            <div className="absolute right-24 top-10 w-[420px] bg-[#111] border border-gray-700 rounded">

              {/* INPUT */}
              <div className="flex items-center px-3 py-2 border-b border-gray-700">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none text-sm"
                />
                {search && (
                 




                    <FiX
  className="cursor-pointer text-gray-400 hover:text-white"
  onClick={() => {
    setSearch("");       // clear input
    setOpenSearch(false); // close search box
  }}


                  />
                )}
              </div>

              {/* DROPDOWN RESULTS */}
              {search && (
                <div className="max-h-60 overflow-y-auto">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <div
                        key={item.id}
                        className="px-4 py-2 text-sm text-gray-300 hover:bg-[#1f1f1f] cursor-pointer"
                      >
                        {item.title}
                      </div>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-gray-500 text-sm">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ICONS */}
          <FiSearch
            size={18}
            className="cursor-pointer"
            onClick={() => setOpenSearch(!openSearch)}
          />
          <FiShoppingCart size={18} className="cursor-pointer" />
          <FiUser size={18} className="cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

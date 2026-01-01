import { FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [search, setSearch] = useState("");

  const { cart } = useCart();

  const profileRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Auto focus search input
  useEffect(() => {
    if (openSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [openSearch]);

  // Close profile on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredResults = productsData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header className="w-full bg-[#111] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

          {/* LOGO */}
          <h1
            className="text-xl font-semibold text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            Tech-Shop
          </h1>

          {/* ICONS */}
          <div className="flex items-center gap-6 text-white relative">

            {/* SEARCH ICON */}
            <FiSearch
              size={18}
              className="cursor-pointer"
              onClick={() => setOpenSearch((prev) => !prev)}
            />

            {/* SEARCH DROPDOWN */}
            {openSearch && (
              <div className="absolute right-32 top-14 bg-[#111] border border-gray-700 p-3 w-72 rounded z-50">

                {/* INPUT + CROSS */}
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-black border border-gray-600 px-3 py-2 pr-8 text-sm text-white outline-none"
                  />

                  {/* ❌ CLEAR BUTTON */}
                  {search && (
                    <FiX
                      size={16}
                      className="absolute right-2 top-2.5 cursor-pointer text-gray-400 hover:text-white"
                      onClick={() => setSearch("")}
                    />
                  )}
                </div>

                {/* RESULTS */}
                {search && (
                  <div className="mt-2 max-h-48 overflow-y-auto">
                    {filteredResults.length > 0 ? (
                      filteredResults.slice(0, 5).map((item) => (
                        <p
                          key={item.id}
                          onClick={() => {
                            navigate("/Allproducts");
                            setOpenSearch(false);
                            setSearch("");
                          }}
                          className="text-sm text-gray-300 hover:text-white cursor-pointer py-1"
                        >
                          {item.title}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 py-2">
                        No results found
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* CART */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FiShoppingCart size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </div>

            {/* PROFILE */}
            <div ref={profileRef} className="relative">
              <FiUser
                size={18}
                className="cursor-pointer"
                onClick={() => setOpenProfile((prev) => !prev)}
              />

              {openProfile && (
                <div className="absolute right-0 top-10 w-64 bg-[#111] border border-gray-700 rounded p-4">
                  <p className="text-sm mb-1">Hello!</p>
                  <p className="text-xs text-gray-400 mb-4">
                    Access account and manage orders
                  </p>

                  <button
                    onClick={() => {
                      setOpenProfile(false);
                      setOpenLogin(true);
                    }}
                    className="w-full border border-gray-600 py-2 text-sm rounded"
                  >
                    Login / Signup
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* LOGIN MODAL */}
      {openLogin && (
        <LoginModal
          onClose={() => setOpenLogin(false)}
          onSignup={() => {
            setOpenLogin(false);
            setOpenSignup(true);
          }}
        />
      )}

      {/* SIGNUP MODAL */}
      {openSignup && (
        <SignupModal
          onClose={() => setOpenSignup(false)}
          onLogin={() => {
            setOpenSignup(false);
            setOpenLogin(true);
          }}
        />
      )}
    </>
  );
}

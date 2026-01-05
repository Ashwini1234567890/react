import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  // ✅ EMPTY CART UI
  if (cart.length === 0) {
    return (
      <section className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
        <FiShoppingCart size={90} className="text-red-600 mb-6" />
        <h2 className="text-xl mb-4">Your Cart is Empty</h2>

        <button
          onClick={() => navigate("/allproducts")}
          className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
        >
          Start Shopping
        </button>
      </section>
    );
  }

  // ✅ CART WITH ITEMS
  const originalPrice = cart.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const finalPrice = cart.reduce(
    (sum, item) => sum + item.finalPrice * item.quantity,
    0
  );

  const discount = originalPrice - finalPrice;

  return (
    <section className="bg-black min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 border-b border-gray-800 pb-6"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-28 object-contain"
              />

              <div className="flex-1 text-white">
                <h3>{item.title}</h3>
                <p className="text-sm text-gray-400">{item.info}</p>

                <div className="flex gap-3 mt-2">
                  <span className="text-lg">₹{item.finalPrice}</span>
                  <span className="line-through text-gray-500">
                    ₹{item.originalPrice}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span className="text-red-500">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>

              <FiTrash2
                onClick={() => removeFromCart(item.id)}
                className="cursor-pointer text-gray-400 hover:text-red-500"
              />
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="bg-[#111] p-6 text-white h-fit">
          <h2 className="text-lg mb-4">
            Order Summary ({cart.length} items)
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Original Price</span>
              <span>₹{originalPrice}</span>
            </div>
            <div className="flex justify-between text-green-500">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          </div>

          <hr className="my-4 border-gray-700" />

          <div className="flex justify-between text-lg">
            <span>Total</span>
            <span>₹{finalPrice}</span>
          </div>

          <button className="bg-red-600 w-full mt-6 py-3">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

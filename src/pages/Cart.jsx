import { FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  

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

        {/* LEFT – CART ITEMS */}
        <div className="lg:col-span-2 space-y-8">
          {cart.length === 0 && (
            <p className="text-gray-400">Your cart is empty</p>
          )}

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
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.info}</p>

                <div className="flex gap-3 items-center mt-2">
                  <span className="text-lg font-semibold">
                    ₹{item.finalPrice}
                  </span>
                  <span className="line-through text-gray-500 text-sm">
                    ₹{item.originalPrice}
                  </span>
                </div>

                {/* QUANTITY CONTROLS */}
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 border border-gray-600"
                  >
                    -
                  </button>

                  <span className="text-red-500">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 border border-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>

              <FiTrash2
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 cursor-pointer hover:text-red-500"
                size={18}
              />
            </div>
          ))}
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="bg-[#111] p-6 text-white h-fit">
          <h2 className="text-lg font-semibold mb-4">
            Order Summary ({cart.length} items)
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Original Price</span>
              <span>₹{originalPrice}</span>
            </div>

            <div className="flex justify-between text-green-500">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-500">Free</span>
            </div>
          </div>

          <hr className="my-4 border-gray-700" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price</span>
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

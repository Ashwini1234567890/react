import productsData from "../data/productsData";

export default function FeaturedProducts() {
  const featured = productsData.filter(
    (item) => item.tag === "featured-product"
  );

  return (
    <section className="bg-black py-16">
      <h2 className="text-center text-xl text-white mb-10">
        Featured Products
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {featured.map((product) => (
          <div
            key={product.id}
            className="bg-[#111] border border-gray-800 rounded p-4 text-white"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-40 object-contain mb-4"
            />

            <h3 className="text-sm font-semibold">{product.title}</h3>
            <p className="text-xs text-gray-400 mb-2">{product.info}</p>

            <div className="flex gap-2 items-center">
              <span className="font-bold">₹{product.finalPrice}</span>
              <span className="line-through text-gray-500 text-xs">
                ₹{product.originalPrice}
              </span>
            </div>

            <button className="mt-4 w-full bg-red-600 py-2 text-sm rounded">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

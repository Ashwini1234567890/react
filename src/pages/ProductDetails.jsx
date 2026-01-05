import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import productsData from "../data/productsData";
import { useCart } from "../context/CartContext";
import { FaStar } from "react-icons/fa";
import Slick from "react-slick";

const Slider = Slick.default || Slick;

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = productsData.find(p => p.id === Number(id));
  if (!product) return null;

  const [activeTab, setActiveTab] = useState("specs");
  const [mainImg, setMainImg] = useState(product.images[0]);

  useEffect(() => {
    setMainImg(product.images[0]);
    setActiveTab("specs");
    window.scrollTo(0, 0);
  }, [id]);

  const reviews = product.reviews?.length
    ? product.reviews
    : [
        { name: "Atharva Kumar", rating: 5, date: "4 Aug 2022", comment: "Sound is awesome and as I expected, love it." },
        { name: "Ritika Sen", rating: 4, date: "15 July 2022", comment: "Very good and awesome product" },
        { name: "Bhavesh Joshi", rating: 4, date: "10 June 2022", comment: "Super amazing product !!!" }
      ];

  // 👉 ALL related products (except current)
 const related = productsData.filter(
  p => p.category === product.category && p.id !== product.id
);


  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  return (
    <section className="bg-black text-gray-300 min-h-screen px-10 py-12">

      {/* ================= TOP ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16">

        {/* LEFT IMAGES */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setMainImg(img)}
                className={`w-16 h-16 object-contain border cursor-pointer ${
                  mainImg === img ? "border-white" : "border-gray-700"
                }`}
              />
            ))}
          </div>

          <img src={mainImg} className="max-h-[420px] object-contain mt-4" />
        </div>

        {/* RIGHT DETAILS */}
        <div className="space-y-4">
          <h1 className="text-2xl text-white font-semibold">{product.title}</h1>
          
          <p className="text-sm text-gray-400">{product.subtitle}</p>
          <p className="text-gray-400 text-xs">{product.info}</p>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-red-500 text-sm" />
            ))}
            <span className="text-sm text-gray-400">| 1234 Ratings</span>
          </div>

          <hr className="border-gray-800 my-3" />

          <div className="flex items-center gap-4">
            <span className="text-3xl text-white font-bold">₹{product.finalPrice}</span>
            <span className="line-through text-gray-500">₹{product.originalPrice}</span>
            <span className="bg-green-600 text-xs px-3 py-1 rounded">✓ In Stock</span>
          </div>

          <p className="text-green-500 text-sm">
            You save ₹{product.originalPrice - product.finalPrice} (33%)
          </p>

          <p className="text-xs text-gray-500">(Inclusive of all taxes)</p>

          <hr className="border-gray-800 my-4" />

          <p className="text-sm font-semibold text-gray-400">Offers and Discounts</p>

          <div className="flex gap-4">
            <div className="border border-gray-700 px-4 py-2 text-sm">
              No Cost EMI on Credit Card
            </div>
            <div className="border border-gray-700 px-4 py-2 text-sm">
              Pay Later & Avail Cashback
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-red-600 px-10 py-3 text-white rounded mt-4"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex justify-center gap-12 mt-24 text-sm">
        {["specs", "overview", "reviews"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded ${
              activeTab === tab ? "bg-red-600 text-white" : "text-gray-400"
            }`}
          >
            {tab === "specs" ? "Specifications" : tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ================= TAB CONTENT ================= */}
      <div className="max-w-5xl mx-auto mt-14">

        {activeTab === "specs" && (
          <div className="space-y-4 text-sm">
            {[
              ["Brand", product.brand],
              ["Model", product.title],
              ["Generic Name", "Headphones"],
              ["Headphone Type", "Over Ear"],
              ["Connectivity", "Wireless"],
              ["Microphone", "Yes"]
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">{k}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "overview" && (
          <div className="space-y-6 text-sm">
            <p className="text-white font-semibold">
              The <span className="text-red-500">{product.title}</span> Wireless In-Ear NC Headphones provides with fabulous sound quality
            </p>
            <ul className="list-disc ml-6 text-gray-400 space-y-2">
              <li>Sound Tuned to Perfection</li>
              <li>Comfortable to Wear</li>
              <li>Long Hours Playback Time</li>
            </ul>
            <p className="text-gray-400 leading-7">
              Buy the {product.title} Wireless In-Ear NC Headphones for an unrivalled listening experience.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-10">
            {reviews.map((r, i) => (
              <div key={i}>
                <p className="text-white font-medium">{r.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="flex gap-1">
                    {[...Array(r.rating)].map((_, j) => (
                      <FaStar key={j} className="text-red-500" />
                    ))}
                  </div>
                  | {r.date}
                </div>
                <p className="text-gray-400 mt-2">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= RELATED ================= */}
      <h2 className="text-center text-xl mt-28 mb-10">Related Products</h2>

      <div className="max-w-7xl mx-auto">
        <Slider {...sliderSettings}>
          {related.map(item => (
            <div key={item.id} className="px-3">
              <div className="bg-[#111] border border-gray-800 p-4">
                <img
                  src={item.images[0]}
                  className="h-40 mx-auto object-contain cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                />

                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-red-500 text-xs" />
                  ))}
                </div>

                <h3 className="text-sm mt-2 text-white text-center">{item.title}</h3>

                <p className="text-gray-400 text-xs">{item.info}</p>

                <div className="flex justify-center gap-2 mt-2">
                  <span className="text-white">₹{item.finalPrice}</span>
                  <span className="line-through text-gray-500">₹{item.originalPrice}</span>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="bg-red-600 w-full mt-3 py-2 text-sm"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

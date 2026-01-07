import Slick from "react-slick";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData";

const Slider = Slick.default || Slick;

export default function FeaturedProducts() {
  const navigate = useNavigate();

  const featured = productsData.filter(
    (item) => item.tag === "featured-product"
  );

  const settings = {
    centerMode: true,
    infinite: true,
    variableWidth: true,   // 🔥 IMPORTANT (video-like movement)
    slidesToScroll: 1,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    pauseOnHover: false,
    cssEase: "ease-in-out",

    // 🔥 Start from middle
    initialSlide: Math.floor(featured.length / 2),

    appendDots: (dots) => (
      <div className="mt-10">
        <ul className="flex justify-center gap-3">
          {dots}
        </ul>
      </div>
    ),

    customPaging: () => <div className="featured-dot"></div>,
  };

  return (
    <section className="bg-black py-24 overflow-hidden">
      <h2 className="text-center text-xl text-gray-300 mb-16">
        Featured Products
      </h2>

      <Slider {...settings}>
        {featured.map((product) => (
          <div key={product.id} className="featured-slide">
            <div
              onClick={() => navigate(`/product/${product.id}`)}
              className="featured-card cursor-pointer text-center"
            >
              <p className="text-xs text-gray-400 mb-2">
                {product.title}
              </p>

              <img
                src={product.images[0]}
                alt={product.title}
                className="mx-auto h-56 object-contain mb-4"
              />

              <div className="flex justify-center gap-2 items-center">
                <span className="text-white font-semibold">
                  ₹{product.finalPrice}
                </span>
                <span className="line-through text-gray-500 text-sm">
                  ₹{product.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

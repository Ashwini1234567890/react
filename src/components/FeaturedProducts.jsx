import Slick from "react-slick";
import productsData from "../data/productsData";

const Slider = Slick.default || Slick;

export default function FeaturedProducts() {
  const featured = productsData.filter(
    (item) => item.tag === "featured-product"
  );

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 5,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    dots: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
    appendDots: (dots) => (
      <div className="mt-8">
        <ul className="flex justify-center gap-3">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-600"></div>
    ),
  };

  return (
    <section className="bg-black py-24">
      <h2 className="text-center text-xl text-gray-300 mb-16">
        Featured Products
      </h2>

      <Slider {...settings}>
        {featured.map((product) => (
          <div key={product.id} className="px-4">
            <div className="flex flex-col items-center text-center text-gray-300 transition-all duration-500 slick-center:scale-110 scale-90">

              {/* IMAGE */}
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-48 object-contain mb-6"
              />

              {/* TITLE */}
              <p className="text-sm mb-2">{product.title}</p>

              {/* PRICE */}
              <div className="flex gap-3 items-center justify-center">
                <span className="text-lg text-white font-semibold">
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

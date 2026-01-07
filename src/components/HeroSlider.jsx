import Slick from "react-slick";
const Slider = Slick.default || Slick;

export default function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: false,

    appendDots: dots => (
      <div>
        <ul className="flex justify-center gap-3 mt-4">
          {dots}
        </ul>
      </div>
    ),

    customPaging: () => (
      <div className="hero-dot"></div>
    ),
  };

  return (
    <section className="w-full bg-black">
      <Slider {...settings}>

        {/* SLIDE 1 */}
        <div className="h-[90vh] flex items-center">
          <div className="max-w-7xl mx-auto px-10 flex justify-between items-center w-full">
            <div className="text-white max-w-xl">
              <p className="text-gray-400 mb-2">boAt Airdopes 131</p>

              <h1 className="text-4xl font-bold mb-4">
                Featherweight For <br /> Comfort All-Day.
              </h1>

              <div className="flex gap-4 mb-6">
                <span className="text-xl">₹1,099</span>
                <span className="line-through text-gray-500">₹2,990</span>
              </div>

              <button className="bg-red-600 px-6 py-3 rounded">
                Shop Now
              </button>
            </div>

            <img
              src="/images/products/boat131-1.png"
              className="w-[420px]"
              alt="Boat 131"
            />
          </div>
        </div>

        {/* SLIDE 2 */}
        <div className="h-[90vh] flex items-center">
          <div className="max-w-7xl mx-auto px-10 flex justify-between items-center w-full">
            <div className="text-white max-w-xl">
              <p className="text-gray-400 mb-2">boAt Rockerz 228</p>

              <h1 className="text-4xl font-bold mb-4">
                Powerful Bass. <br /> Clean Sound.
              </h1>

              <div className="flex gap-4 mb-6">
                <span className="text-xl">₹1,499</span>
                <span className="line-through text-gray-500">₹2,999</span>
              </div>

              <button className="bg-red-600 px-6 py-3 rounded">
                Shop Now
              </button>
            </div>

            <img
              src="/images/products/boat228-1.png"
              className="w-[420px]"
              alt="Boat 228"
            />
          </div>
        </div>

        {/* SLIDE 3 */}
        <div className="h-[90vh] flex items-center">
          <div className="max-w-7xl mx-auto px-10 flex justify-between items-center w-full">
            <div className="text-white max-w-xl">
              <p className="text-gray-400 mb-2">boAt Rockerz 410</p>

              <h1 className="text-4xl font-bold mb-4">
                Wireless Freedom. <br /> All-Day Play.
              </h1>

              <div className="flex gap-4 mb-6">
                <span className="text-xl">₹1,999</span>
                <span className="line-through text-gray-500">₹3,499</span>
              </div>

              <button className="bg-red-600 px-6 py-3 rounded">
                Shop Now
              </button>
            </div>

            <img
              src="/images/products/boat410-1.png"
              className="w-[420px]"
              alt="Boat 410"
            />
          </div>
        </div>

      </Slider>
    </section>
  );
}

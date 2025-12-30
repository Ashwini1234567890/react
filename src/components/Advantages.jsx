import servicesData from "../data/servicesData";
import {
  FaShippingFast,
  FaShieldAlt,
  FaTags,
  FaCreditCard,
} from "react-icons/fa";

const iconMap = {
  shipping: <FaShippingFast />,
  shield: <FaShieldAlt />,
  tags: <FaTags />,
  payment: <FaCreditCard />,
};

export default function Advantages() {
  return (
    <section className="bg-black py-16">
      <h2 className="text-center text-xl text-white mb-10">
        Our Advantages
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {servicesData.map((item) => (
          <div key={item.id} className="text-center text-white">
            <div className="text-red-500 text-3xl mb-3">
              {iconMap[item.icon]}
            </div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.info}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { footMenu, footSocial } from "../data/footerData";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";

const socialIcons = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-16 border-t border-gray-800">
      
      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LEFT : BRAND + SUBSCRIBE */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">
            Tech-Shop
          </h2>

          <p className="text-sm mb-4">
            Subscribe to our Email alerts to receive
            early discount offers, and new products info.
          </p>

          <input
            type="email"
            placeholder="Email Address*"
            className="w-full bg-transparent border border-gray-700 px-3 py-2 text-sm mb-3 outline-none"
          />

          <button className="bg-red-600 text-white px-5 py-2 text-sm">
            Subscribe
          </button>
        </div>

        {/* MENU COLUMNS */}
        {footMenu.map((section) => (
          <div key={section.id}>
            <h4 className="text-white mb-4 font-semibold">
              {section.title}
            </h4>

            {section.menu.map((item) => (
              <p
                key={item.id}
                className="text-sm mb-2 hover:text-white cursor-pointer"
              >
                {item.link}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-800 mt-12"></div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* COPYRIGHT */}
        <p className="text-sm">
          2025 | All Rights Reserved ©.
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 items-center">
          {footSocial.map((item) => {
            const Icon = socialIcons[item.icon];
            return (
              <Icon
                key={item.id}
                className="cursor-pointer hover:text-white"
              />
            );
          })}

          {/* SCROLL TO TOP */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-red-600 p-2 ml-2"
          >
            <FaArrowUp className="text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
}

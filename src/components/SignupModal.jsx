import { FiX } from "react-icons/fi";

export default function SignupModal({ onClose, onLogin }) {
  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center">
      
      {/* CLOSE ICON */}
      <FiX
        size={22}
        className="absolute top-6 right-6 text-gray-400 hover:text-white cursor-pointer"
        onClick={onClose}
      />

      {/* SIGNUP CARD */}
      <div className="w-[380px] bg-[#111] border border-gray-700 rounded-lg p-6 text-white shadow-xl">

        <h2 className="text-xl font-semibold mb-1">Signup</h2>
        <p className="text-sm text-gray-400 mb-5">
          Already have an account?{" "}
          <span
            onClick={onLogin}
            className="text-red-500 cursor-pointer"
          >
            Login
          </span>
        </p>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 px-3 py-2 bg-transparent border border-gray-600 rounded text-sm outline-none focus:border-red-500"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 bg-transparent border border-gray-600 rounded text-sm outline-none focus:border-red-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 bg-transparent border border-gray-600 rounded text-sm outline-none focus:border-red-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 px-3 py-2 bg-transparent border border-gray-600 rounded text-sm outline-none focus:border-red-500"
        />

        <button className="w-full bg-red-600 py-2 rounded text-sm hover:bg-red-700">
          Signup
        </button>
      </div>
    </div>
  );
}

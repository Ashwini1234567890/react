import { FiX } from "react-icons/fi";

export default function LoginModal({ onClose, onSignup }) {
  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center">
      
      <FiX
        size={22}
        className="absolute top-6 right-6 text-gray-400 hover:text-white cursor-pointer"
        onClick={onClose}
      />

      <div className="w-[380px] bg-[#111] border border-gray-700 rounded-lg p-6 text-white shadow-xl">

        <h2 className="text-xl font-semibold mb-1">Login</h2>
        <p className="text-sm text-gray-400 mb-5">
          New to Tech-Shop?{" "}
          <span
            onClick={onSignup}
            className="text-red-500 cursor-pointer"
          >
            Create an account
          </span>
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 bg-transparent border border-gray-600 rounded text-sm outline-none focus:border-red-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 bg-transparent border border-gray-600 rounded text-sm outline-none focus:border-red-500"
        />

        <button className="w-full bg-red-600 py-2 rounded text-sm hover:bg-red-700 mb-4">
          Login
        </button>

        <div className="flex items-center gap-3 text-gray-500 text-xs mb-4">
          <span className="flex-1 h-px bg-gray-700"></span>
          or login with
          <span className="flex-1 h-px bg-gray-700"></span>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 py-2 text-xs rounded">
            Facebook
          </button>
          <button className="flex-1 bg-red-600 py-2 text-xs rounded">
            Google
          </button>
          <button className="flex-1 bg-sky-500 py-2 text-xs rounded">
            Twitter
          </button>
        </div>
      </div>
    </div>
  );
}

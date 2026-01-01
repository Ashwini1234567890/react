import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Allproducts" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>

      <Footer />
    </div>
  );
}






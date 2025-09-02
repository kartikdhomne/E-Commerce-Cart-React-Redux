import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const cartCount = useSelector((state) => state.cart.cartItems.length);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      alert(`Searching for: ${searchTerm}`);
    }
  };

  return (
    <nav className="fixed z-10 w-full flex items-center justify-between bg-white text-black px-6 py-3 shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="" />
      </Link>

      <form onSubmit={handleSearch} className="flex flex-1 mx-6 max-w-xl">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-md text-black focus:outline-none bg-[#f0f5ff]"
          />
          <button
            type="submit"
            className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-xl"
          >
            🔍
          </button>
        </div>
      </form>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/profile">Login</Link>
        <Link to="/cart">🛒 Cart ({cartCount})</Link>
      </div>
    </nav>
  );
}

export default Navbar;

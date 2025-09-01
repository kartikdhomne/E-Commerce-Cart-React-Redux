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
    <nav className="w-full flex items-center justify-between bg-white text-black px-6 py-3 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Logo" className="" />
        {/* <h1 className="text-xl font-bold">ShopKart</h1> */}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-1 mx-6 max-w-xl">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[750px] flex-1 px-4 py-2 rounded-l-md text-black focus:outline-none bg-[#f0f5ff]"
        />
        <button
          type="submit"
          className="bg-yellow-400 px-4 py-2 rounded-r-md font-semibold hover:bg-yellow-500 transition"
        >
          🔍
        </button>
      </form>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:underline">
          🏠 Home
        </Link>
        <Link to="/products" className="hover:underline">
          🛍 Products
        </Link>
        <Link to="/profile" className="hover:underline">
          👤 Profile
        </Link>
        <Link to="/cart" className="hover:underline">
          🛒 Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.cartItems.length);

  // Fetch all products once for suggestions
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products || []))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/products?q=${searchTerm}`);
      setSuggestions([]);
    }
  };

  const handleInput = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const matches = allProducts.filter((p) =>
        p.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches.slice(0, 8)); // show max 8
    }
  };

  return (
    <nav className="fixed z-10 w-full flex items-center justify-between bg-white text-black px-6 py-3 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.webp" alt="Logo" className="" />
      </Link>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex flex-1 mx-6 max-w-xl relative"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e) => handleInput(e.target.value)}
            className="w-full px-4 py-2 pr-10 rounded-md text-black focus:outline-none bg-[#f0f5ff]"
          />
          <button
            type="submit"
            className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-xl"
          >
            🔍
          </button>

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto z-50">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate(`/products?q=${item.title}`);
                    setSearchTerm(item.title);
                    setSuggestions([]);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/products">Explore Products</Link>
        <Link to="/profile">Login</Link>
        <Link to="/cart">🛒 Cart ({cartCount})</Link>
      </div>
    </nav>
  );
}

export default Navbar;

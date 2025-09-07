import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const API_ENDPOINTS = [
  "https://dummyjson.com/products/category/smartphones",
  "https://dummyjson.com/products/category/laptops",
  "https://dummyjson.com/products/category/fragrances",
  "https://dummyjson.com/products/category/skincare",
  "https://dummyjson.com/products/category/home-decoration",
  "https://dummyjson.com/products/category/furniture",
  "https://dummyjson.com/products/category/mens-shirts",
  "https://dummyjson.com/products/category/womens-dresses",
];

function Navbar() {
  const cartCount = useSelector((state) => state.cart.cartItems.length);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch products from multiple category endpoints
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allData = [];
        for (const url of API_ENDPOINTS) {
          const res = await fetch(url);
          const data = await res.json();
          allData.push(...(data.products || []));
        }
        setAllProducts(allData);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
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
      // ❌ old: setSuggestions(matches.slice(0, 8));
      // ✅ new: show all matches
      setSuggestions(matches);
    }
  };

  const handleSelect = (title) => {
    navigate(`/products?q=${title}`);
    setSearchTerm(title);
    setSuggestions([]);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-md fixed w-full z-10">
      {({ open }) => (
        <>
          {/* Navbar main row */}
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center lg:gap-40">
              {/* Left: Logo + (mobile cart/profile) */}
              <div className="flex items-center gap-3">
                <Link to="/">
                  <img src="/logo.webp" alt="Logo" className="h-8 w-auto" />
                </Link>

                {/* Mobile Cart + Profile */}
                <div className="flex sm:hidden items-center gap-2">
                  <Link to="/cart" className="relative flex items-center">
                    🛒
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button className="bg-black text-white px-2 py-1 text-sm">
                        Login
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>

              {/* Desktop Nav + Search */}
              <div className="hidden sm:flex flex-1 items-center justify-center gap-6">
                {/* Search Bar */}
                <form
                  onSubmit={handleSearch}
                  className="relative w-full sm:w-140"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => handleInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto z-50">
                      {suggestions.map((item) => (
                        <li
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelect(item.title)}
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </form>
              </div>

              <div className="flex gap-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive
                        ? "text-white bg-black py-1 px-2 rounded-sm"
                        : "text-black"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive
                        ? "text-white bg-black py-1 px-2 rounded-sm"
                        : "text-black"
                    }`
                  }
                >
                  Explore Products
                </NavLink>
              </div>

              {/* Desktop Cart + Profile */}
              <div className="hidden sm:flex items-center gap-8">
                <Link to="/cart" className="relative flex items-center">
                  🛒
                  {cartCount > 0 && (
                    <span className="absolute -top-2 right-2 bg-red-600 text-white text-sm rounded-full px-2">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="bg-black text-white px-4 py-2 text-sm">
                      Login
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>

              {/* Mobile Hamburger */}
              <div className="sm:hidden">
                <DisclosureButton className="p-2 text-gray-600">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="sm:hidden bg-white px-4 pt-2 pb-3 space-y-2">
            {/* Search bar mobile */}
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleInput(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
              />
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto z-50">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(item.title)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
            </form>

            <NavLink to="/" className="block py-2">
              Home
            </NavLink>
            <NavLink to="/products" className="block py-2">
              Explore Products
            </NavLink>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;

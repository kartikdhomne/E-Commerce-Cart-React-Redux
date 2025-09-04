// pages/Products.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductListItem from "../components/ProductListItem";
import Navbar from "../components/Navbar";

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

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [rating, setRating] = useState(0);

  // search from URL (?q=...)
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          API_ENDPOINTS.map((url) => fetch(url).then((res) => res.json()))
        );
        const merged = results.flatMap((res) => res.products);
        setProducts(merged);
        setFiltered(merged);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    let result = products;

    // Search
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating
    if (rating > 0) {
      result = result.filter((p) => Math.floor(p.rating) >= rating);
    }

    setFiltered(result);
  }, [products, search, category, priceRange, rating]);

  return (
    <div>
      <Navbar />
      <div className="flex pt-24 px-4 max-w-7xl mx-auto gap-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow rounded-lg p-4 hidden md:block">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Category */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Category</h3>
            <select
              className="w-full border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              {[...new Set(products.map((p) => p.category))].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Price</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full"
            />
            <p className="text-sm text-gray-600">
              Up to ₹{(priceRange[1] * 10).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Rating</h3>
            {[4, 3, 2, 1].map((r) => (
              <label key={r} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="rating"
                  value={r}
                  checked={rating === r}
                  onChange={() => setRating(r)}
                  className="mr-2"
                />
                {r}★ & above
              </label>
            ))}
            <button
              className="text-sm text-blue-600 mt-1"
              onClick={() => setRating(0)}
            >
              Clear
            </button>
          </div>
        </aside>

        {/* Product List */}
        <main className="flex-1">
          <h2 className="text-2xl font-bold mb-4">
            Products ({filtered.length})
          </h2>
          {loading ? (
            <div className="p-10 text-center">Loading products...</div>
          ) : filtered.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No products found
            </div>
          ) : (
            <ul className="space-y-4">
              {filtered.map((product) => (
                <Link to={`/product/${product.id}`}>
                  <li key={product.id}>
                    <ProductListItem product={product} />
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;

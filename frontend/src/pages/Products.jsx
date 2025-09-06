// pages/Products.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // filters
  const categoryFromUrl = searchParams.get("category") || "all";
  const [category, setCategory] = useState(categoryFromUrl);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [rating, setRating] = useState(0);

  // search (?q=)
  const search = searchParams.get("q") || "";

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          API_ENDPOINTS.map((url) => fetch(url).then((res) => res.json()))
        );
        console.log(results, "res");
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

    // Search filter
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating filter
    if (rating > 0) {
      result = result.filter((p) => Math.floor(p.rating) >= rating);
    }

    setFiltered(result);
  }, [products, search, category, priceRange, rating]);

  // sync category with URL
  useEffect(() => {
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams, { replace: true });
  }, [category]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row pt-24 px-4 max-w-7xl mx-auto gap-6">
        {/* Sidebar */}
        <aside className="md:w-64 bg-white shadow rounded-lg p-4">
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
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
            {filtered.length} products found
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
                <li key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    <ProductListItem product={product} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;

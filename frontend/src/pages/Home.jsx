// pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Hero />

      {/* Shop by Category */}
      <h2 className="text-3xl md:text-5xl font-bold py-12">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 max-w-7xl w-full">
        {[
          { name: "smartphones", img: "/smartphoness.webp" },
          { name: "laptops", img: "/laptop.webp" },
          { name: "mens", img: "/mens.webp" },
          { name: "womens", img: "/women.webp" },
          { name: "home-decor", img: "/home-decor.webp" },
          { name: "fragrances", img: "/fragrance.webp" },
          { name: "furnitures", img: "/furniture.webp" },
          { name: "skincare", img: "/skincare.webp" },
        ].map((cat) => (
          <Link
            key={cat.name}
            to={`/products?category=${encodeURIComponent(cat.name)}`}
            className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-40 object-cover"
            />
            <p className="text-center py-2 font-semibold capitalize">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Most Loved Section */}
      <h2 className="text-3xl md:text-5xl font-bold py-12">
        Most Loved Products
      </h2>
      {loading ? (
        <div className="p-10 text-center">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl w-full">
          {products.map((product) => (
            <div key={product.id}>
              <Link to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddToCartButton from "../components/AddToCartButton";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const USD_TO_INR = 88;

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product)
    return <div className="p-10 text-center">Product not found</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto pt-48 p-6 flex flex-col md:flex-row gap-10 items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-80 h-80 object-cover rounded-xl shadow-lg"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl text-green-700 font-semibold">
            ₹{(product.price * USD_TO_INR).toLocaleString("en-IN")}
          </p>
          <p className="text-sm text-gray-500">Rating: {product.rating}</p>

          {/* ✅ Reusable Button */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

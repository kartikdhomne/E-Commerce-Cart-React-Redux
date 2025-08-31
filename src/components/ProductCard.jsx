import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      {/* <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain mb-4"
      />
      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>*/}
      <p className="text-gray-700 mb-2">${product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="bg-black text-black px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <Link to={`/product?productId=${product.id}`} className="block w-full">
      <div
        onClick={(e) => {
          // Prevent card click if "Add to Cart" is clicked
          if (e.target.closest("button")) e.preventDefault();
        }}
        className="card flex flex-col p-4 gap-4 rounded-2xl justify-center items-center border-2"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-48 object-cover"
        />
        <h3 className="text-lg font-semibold text-center">{product.title}</h3>
        <p className="text-md text-gray-700">💲{product.price}</p>

        <Button
          onClick={() => dispatch(addToCart(product))}
          className="cursor-pointer w-full mt-2 bg-black"
        >
          Add to Cart
        </Button>
      </div>
    </Link>
  );
}

export default ProductCard;

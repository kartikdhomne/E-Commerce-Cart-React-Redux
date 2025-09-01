import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Button } from "./ui/button";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>💲{product.price}</p>
      <Button onClick={() => dispatch(addToCart(product))} className="cursor-pointer">Add to Cart</Button>
    </div>
  );
}

export default ProductCard;

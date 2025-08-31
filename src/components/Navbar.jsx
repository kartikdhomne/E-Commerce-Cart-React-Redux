import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartCount = useSelector((state) => state.cart.cartItems.length);

  return (
    <nav className="navbar">
      <Link to="/">🏠 Home</Link>
      <Link to="/cart">🛒 Cart ({cartCount})</Link>
    </nav>
  );
}

export default Navbar;

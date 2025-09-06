import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Empty the cart once order is successful
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Payment Successful!
      </h1>
      <p className="mt-4 text-lg">
        Thank you for your order. Your cart has been cleared.
      </p>
      <Link
        to="/"
        className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default Success;

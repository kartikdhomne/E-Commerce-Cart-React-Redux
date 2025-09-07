import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Empty the cart once order is successful
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="px-8 text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600 text-center">
        Hurrey, Payment Successful! 🎉
      </h1>
      <p className="mt-8 text-lg">Thank you for your order.</p>
      <p className="mt-4 text-lg">We have received your order details.</p>
      <p className="my-4 text-lg">
        You will received your order within selected shipping days.
      </p>
      <Link
        to="/"
        className="inline-block mt-4 text-white px-6 py-2 rounded-lg transition"
      >
        <Button className="text-lg py-6 px-8 cursor-pointer">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}

export default Success;

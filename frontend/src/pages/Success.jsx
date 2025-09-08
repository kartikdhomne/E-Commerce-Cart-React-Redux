import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { Button } from "../components/ui/button";

function Success() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    if (cartItems.length > 0 && user) {
      const shippingDays = { standard: 7, express: 3, overnight: 1 };
      const method = "standard"; // replace later with selected option

      const newOrder = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: "Done",
        shippingMethod: method,
        deliveryExpected: new Date(
          Date.now() + shippingDays[method] * 24 * 60 * 60 * 1000
        ).toISOString(),
        amount: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        items: [...cartItems],
      };

      const key = `orders_${user.id}`;
      const existingOrders = JSON.parse(localStorage.getItem(key)) || [];
      localStorage.setItem(key, JSON.stringify([newOrder, ...existingOrders]));

      dispatch(clearCart());
    }
  }, [cartItems, dispatch, user]);

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

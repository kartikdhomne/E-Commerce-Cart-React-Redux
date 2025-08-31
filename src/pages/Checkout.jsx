import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { clearCart } from "../features/cartSlice";

const stripePromise = loadStripe(
  "pk_test_51NbNGhSI4RvDEUXId9tpaXHBCwfLW4s9nZWb184QK63MYzXfxyk9hFmTqg4AZunH9J7M6dCN7K11kX6c4NWxrZx900zKaLBBdi"
); // 🔴 apna Stripe publishable key yaha daalo

function Checkout() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const dispatch = useDispatch();

  const handlePayment = async () => {
    const stripe = await stripePromise;

    // Dummy line items
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100, // Stripe me cents me hota hai
      },
      quantity: item.quantity,
    }));

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      lineItems,
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/checkout",
    });

    if (error) {
      console.error("Stripe checkout error", error);
    } else {
      dispatch(clearCart());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ${item.price}
                  </p>
                </div>
                <p className="font-semibold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-lg font-semibold">
            <p>Total:</p>
            <p>${total}</p>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;

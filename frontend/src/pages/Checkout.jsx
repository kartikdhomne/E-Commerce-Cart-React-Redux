// Checkout.jsx
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(false);

  // USD → INR (already doing in your cart)
  const USD_TO_INR = 88;
  const amount =
    cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0) *
    USD_TO_INR *
    100; // paise

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Ask backend to create PaymentIntent
      const { data } = await axios.post(
        "http://localhost:5000/create-payment-intent",
        { amount }
      );

      // 2. Confirm payment on frontend
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        alert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful ✅");
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <CardElement className="p-3 border rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white p-3 rounded"
      >
        {loading
          ? "Processing..."
          : `Pay ₹${(amount / 100).toLocaleString("en-IN")}`}
      </button>
    </form>
  );
}

export default Checkout;

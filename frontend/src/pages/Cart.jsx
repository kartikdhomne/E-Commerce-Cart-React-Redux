import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [discount, setDiscount] = useState(0);
  const { isSignedIn } = useUser();
  const [showLogin, setShowLogin] = useState(false);

  // Conversion rate USD → INR
  const USD_TO_INR = 88;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingRates = { standard: 5, express: 15, overnight: 25 };
  const shippingCost = cartItems.length > 0 ? shippingRates[shippingMethod] : 0;
  const tax = (subtotal - discount) * 0.075;
  const total = subtotal + shippingCost + tax - discount;

  const applyPromo = () => {
    const promos = {
      SAVE10: {
        discount: 0.1,
        message: "10% discount applied!",
        minAmount: 399,
      },
      SAVE20: {
        discount: 0.2,
        message: "20% discount applied!",
        minAmount: 799,
      },
      WELCOME20: {
        discount: 0.2,
        message: "Welcome offer: 20% discount applied!",
        minAmount: 499,
        newUser: true,
      },
      FREESHIP: {
        discount: 0,
        message: "Free shipping applied!",
        freeShip: true,
        minAmount: 999,
      },
    };

    const code = promoCode.toUpperCase();
    const promo = promos[code];

    if (!promo) {
      setPromoMessage("Invalid promo code");
      setDiscount(0);
      return;
    }

    if (subtotal * USD_TO_INR < promo.minAmount) {
      setPromoMessage(`Minimum order of ₹${promo.minAmount} required`);
      setDiscount(0);
      return;
    }

    setPromoMessage(promo.message);
    if (promo.discount) {
      setDiscount(subtotal * promo.discount);
    } else {
      setDiscount(0);
    }

    if (promo.freeShip) {
      setShippingMethod("standard");
    }
  };

  const formatINR = (amount) =>
    `₹${(amount * USD_TO_INR).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleCheckout = async () => {
    if (!isSignedIn) {
      // If not logged in → show login popup or redirect
      setShowLogin(true);
      return;
    }
    try {
      // Convert prices to INR (Stripe requires smallest unit: paise)
      const itemsInINR = cartItems.map((item) => ({
        ...item,
        price: item.price * USD_TO_INR, // convert here
      }));

      const { data } = await axios.post(
        `${API_BASE_URL}/create-checkout-session`,
        {
          cartItems: itemsInINR,
        }
      );

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Shopping Cart
          </h1>
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full">
            🛒 {cartItems.length} items
          </div>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-xl text-gray-500">Your cart is empty</p>
            <Link
              to="/"
              className="inline-block mt-4 text-white px-6 py-2 rounded-lg cursor-pointer transition"
            >
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Responsive Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-6 md:block hidden">
              <table className="w-full text-sm">
                <thead className="hidden sm:table-header-group bg-gray-50 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Product</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.id}
                      className="block sm:table-row border-b sm:border-0 sm:border-t sm:border-gray-200"
                    >
                      {/* Product */}
                      <td className="block sm:table-cell py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                          </div>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="block sm:table-cell py-4 px-4 text-center">
                        <div className="flex items-center justify-center sm:justify-center">
                          <Button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="w-12 px-2 py-1 border rounded-full cursor-pointer"
                          >
                            -
                          </Button>
                          <input
                            type="number"
                            readOnly
                            value={item.quantity}
                            className="text-center text-xl w-20 mx-2 border-1 border-black"
                          />
                          <Button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="w-12 px-2 py-1 border rounded-full cursor-pointer"
                          >
                            +
                          </Button>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="block sm:table-cell py-4 px-4 text-right">
                        {formatINR(item.price)}
                      </td>

                      {/* Total */}
                      <td className="block sm:table-cell py-4 px-4 text-right font-bold">
                        {formatINR(item.price * item.quantity)}
                      </td>

                      {/* Actions */}
                      <td className="block sm:table-cell py-4 px-4 text-center">
                        <Button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-white cursor-pointer"
                        >
                          🗑 Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* mobile view  */}
            <div className="block md:hidden overflow-x-auto bg-white rounded-lg shadow-md mb-6 p-6">
              {cartItems.map((item) => (
                <div className="flex items-center gap-4 flex-col border-1 border-black rounded-lg mb-6 py-6">
                  <div className="flex items-center flex-col">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-28 h-28 object-cover rounded"
                    />
                    <h2 className="font-medium text-2xl mt-2">{item.title}</h2>
                  </div>
                  <div className="flex items-center gap-8">
                    <Button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="w-12 py-1 border cursor-pointer"
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      readOnly
                      value={item.quantity}
                      className="text-center text-xl w-20 border-1 border-black rounded-sm"
                    />
                    <Button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="w-12 py-1 border cursor-pointer"
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex gap-16">
                    <div>
                      <p className="font-bold">Item Price</p>
                      {formatINR(item.price)}
                    </div>
                    <div>
                      <p className="font-bold">Item Total</p>
                      {formatINR(item.price * item.quantity)}
                    </div>
                  </div>

                  <div className="mx-auto">
                    <Button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-white cursor-pointer w-64"
                    >
                      🗑 Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping + Promo + Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Shipping */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Shipping Options
                  </h2>
                  {["standard", "express", "overnight"].map((method) => (
                    <label
                      key={method}
                      className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50 mb-2"
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={method}
                        checked={shippingMethod === method}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium capitalize">
                          {method} Shipping
                        </div>
                        <div className="text-sm text-gray-600">
                          {method === "standard" && "5–7 business days"}
                          {method === "express" && "1–3 business days"}
                          {method === "overnight" && "Next day delivery"}
                        </div>
                      </div>
                      <div className="ml-auto font-medium">
                        {formatINR(shippingRates[method])}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Promo */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Promo Code</h2>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-grow border rounded-20 p-2"
                    />
                    <Button
                      onClick={applyPromo}
                      className="text-white px-4 py-4 cursor-pointer rounded-2 transition"
                    >
                      Apply
                    </Button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`mt-2 text-sm ${
                        discount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {promoMessage}
                    </p>
                  )}

                  {/* Promo Info */}
                  <div className="mt-4 p-3 bg-gray-50 border rounded-lg text-sm text-gray-700">
                    <h3 className="font-semibold mb-2">Available Offers</h3>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>
                        🛍 Order ₹399 and above – Apply <strong>SAVE10</strong>{" "}
                        (10% OFF)
                      </li>
                      <li>
                        🛍 Order ₹799 and above – Apply <strong>SAVE20</strong>{" "}
                        (20% OFF)
                      </li>
                      <li>
                        ✨ New Users – <strong>WELCOME20</strong> on orders
                        above ₹499
                      </li>
                      <li>
                        🚚 Orders above ₹999 – Apply <strong>FREESHIP</strong>{" "}
                        (Free Shipping)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{formatINR(shippingCost)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>- {formatINR(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{formatINR(tax)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                    <span>Grand Total</span>
                    <span>{formatINR(total)}</span>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full cursor-pointer text-white py-3 rounded-lg font-medium transition"
                >
                  Proceed to Checkout
                </Button>

                {/* If not signed in → show Clerk login */}
                {showLogin && <RedirectToSignIn />}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <Link
                to="/"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Button className="cursor-pointer text-white">
                  ⬅ Continue Shopping
                </Button>
              </Link>
              <Button
                onClick={() => dispatch(clearCart())}
                className="text-white cursor-pointer"
              >
                🗑 Clear Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;

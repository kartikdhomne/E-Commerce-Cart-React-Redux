import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import { useState } from "react";
import { Button } from "../components/ui/button";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [discount, setDiscount] = useState(0);

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
    `₹${(amount * USD_TO_INR).toLocaleString("en-IN")}`;

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
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Responsive Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-6">
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
                            className="w-16 h-16 object-cover rounded"
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
                            className="px-2 py-1 border rounded-l"
                          >
                            -
                          </Button>
                          <input
                            type="number"
                            readOnly
                            value={item.quantity}
                            className="w-12 text-center border-y"
                          />
                          <Button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="px-2 py-1 border rounded-r"
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
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑 Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  <div className="flex">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-grow border rounded-l p-2"
                    />
                    <Button
                      onClick={applyPromo}
                      className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
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
                    <span>Total</span>
                    <span>{formatINR(total)}</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                  Proceed to Checkout
                </Button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <Link
                to="/"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                ⬅ Continue Shopping
              </Link>
              <Button
                onClick={() => dispatch(clearCart())}
                className="text-red-600 hover:text-red-800"
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

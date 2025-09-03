import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cartSlice";
import { useState } from "react";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [discount, setDiscount] = useState(0);

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
      SAVE10: { discount: 0.1, message: "10% discount applied!" },
      WELCOME20: { discount: 0.2, message: "20% discount applied!" },
      FREESHIP: {
        discount: 0,
        message: "Free shipping applied!",
        freeShip: true,
      },
    };
    const promo = promos[promoCode.toUpperCase()];
    if (!promo) {
      setPromoMessage("Invalid promo code");
      setDiscount(0);
      return;
    }
    setPromoMessage(promo.message);
    if (promo.discount) {
      setDiscount(subtotal * promo.discount);
    }
    if (promo.freeShip) {
      setShippingMethod("standard");
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
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="px-2 py-1 border rounded-l"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            readOnly
                            value={item.quantity}
                            className="w-12 text-center border-y"
                          />
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="px-2 py-1 border rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="block sm:table-cell py-4 px-4 text-right">
                        ${item.price}
                      </td>

                      {/* Total */}
                      <td className="block sm:table-cell py-4 px-4 text-right font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>

                      {/* Actions */}
                      <td className="block sm:table-cell py-4 px-4 text-center">
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑 Remove
                        </button>
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
                        ${shippingRates[method]}
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
                    <button
                      onClick={applyPromo}
                      className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
                    >
                      Apply
                    </button>
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
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                  Proceed to Checkout
                </button>
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
              <button
                onClick={() => dispatch(clearCart())}
                className="text-red-600 hover:text-red-800"
              >
                🗑 Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;

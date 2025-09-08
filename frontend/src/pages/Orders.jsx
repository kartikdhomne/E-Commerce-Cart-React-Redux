import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

function Orders() {
  const { user } = useUser();
  const userId = user?.id;
  const [orders, setOrders] = useState([]);

  // Utility: safe date formatter
  const formatDate = (date) => {
    if (!date) return "N/A";
    const parsed = new Date(date);
    return isNaN(parsed) ? "N/A" : parsed.toLocaleDateString();
  };

  useEffect(() => {
    if (!userId) return;
    const storageKey = `orders_${userId}`;
    const savedOrders = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Update status if delivery date has passed
    const updatedOrders = savedOrders.map((order) => {
      const today = new Date();
      const deliveryDate = new Date(order.deliveryExpected);

      if (!isNaN(deliveryDate) && today >= deliveryDate) {
        return { ...order, status: "Delivered" };
      }
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem(storageKey, JSON.stringify(updatedOrders));
  }, [userId]);

  // Remove order
  const handleRemoveOrder = (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    const storageKey = `orders_${userId}`;
    const updatedOrders = orders.filter((o) => o.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem(storageKey, JSON.stringify(updatedOrders));
  };

  if (!userId) {
    return (
      <p className="text-center mt-8">Please sign in to view your orders.</p>
    );
  }

  if (orders.length === 0) {
    return <p className="text-center mt-8">No orders yet.</p>;
  }

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
          Order History
        </h2>

        {/* Orders List */}
        {orders.map((order) => (
          <div
            key={order.id}
            className="mt-7 border border-gray-300 pt-9 rounded-lg shadow-sm"
          >
            {/* Order Header */}
            <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
              <div>
                <p className="font-medium text-lg text-black whitespace-nowrap">
                  Order : #{order.id}
                </p>
                <p className="font-medium text-lg text-black mt-3 whitespace-nowrap">
                  Order Date: {formatDate(order.createdAt)}
                </p>
                <p className="font-medium text-lg text-gray-500 mt-2 whitespace-nowrap">
                  Shipping: {order.shippingMethod || "N/A"}
                </p>
              </div>
              <div className="flex items-start gap-3 max-md:mt-5">
                <button className="rounded-full px-7 py-3 bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700">
                  Buy Again
                </button>
                <button
                  onClick={() => handleRemoveOrder(order.id)}
                  className="text-red-500 mb-auto hover:text-red-700 font-bold text-lg"
                  title="Remove Order"
                >
                  ✕
                </button>
              </div>
            </div>

            <svg
              className="my-9 w-full"
              xmlns="http://www.w3.org/2000/svg"
              height="2"
              viewBox="0 0 1216 2"
            >
              <path d="M0 1H1216" stroke="#D1D5DB" />
            </svg>

            {/* Order Items */}
            {order.items.map((item, i) => (
              <div key={i}>
                <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                  <div className="grid grid-cols-4 w-full">
                    <div className="col-span-4 sm:col-span-1">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="max-sm:mx-auto object-cover w-28 h-28"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                      <h6 className="font-manrope font-semibold text-2xl text-black mb-3 whitespace-nowrap">
                        {item.title}
                      </h6>
                      <p className="font-normal text-lg text-gray-500 mb-8 whitespace-nowrap">
                        By: EasyShop
                      </p>
                      <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                        <span className="font-normal text-lg text-gray-500 whitespace-nowrap">
                          Qty: {item.quantity}
                        </span>
                        <p className="font-semibold text-xl text-black whitespace-nowrap">
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status & Delivery */}
                  <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                    <div>
                      <p className="font-normal text-lg text-gray-500 mb-2">
                        Status
                      </p>
                      <p
                        className={`font-semibold text-lg ${
                          order.status === "Delivered"
                            ? "text-green-500"
                            : order.status === "Cancelled"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {order.status}
                      </p>
                    </div>
                    <div>
                      <p className="font-normal text-lg text-gray-500 mb-2">
                        Delivery Expected by
                      </p>
                      <p className="font-semibold text-lg text-black">
                        {formatDate(order.deliveryExpected)}
                      </p>
                    </div>
                  </div>
                </div>

                <svg
                  className="my-9 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  height="2"
                  viewBox="0 0 1216 2"
                >
                  <path d="M0 1H1216" stroke="#D1D5DB" />
                </svg>
              </div>
            ))}

            {/* Footer */}
            <div className=" pb-8 px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
              <div className="flex max-sm:flex-col-reverse items-center">
                <p className="font-normal text-xl text-gray-500 sm:pl-8">
                  Payment Successful
                </p>
              </div>
              <p className="font-medium text-xl text-black max-sm:py-4">
                <span className="text-gray-500">Total Price: </span>₹
                {Number(order.amount).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Orders;

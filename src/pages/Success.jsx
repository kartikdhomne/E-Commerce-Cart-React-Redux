import React from "react";

function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful ✅
      </h1>
      <p className="mt-4 text-gray-600">Thank you for your purchase!</p>
      <a
        href="/"
        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Continue Shopping
      </a>
    </div>
  );
}

export default Success;

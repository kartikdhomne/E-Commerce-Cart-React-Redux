// components/ProductListItem.jsx
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import AddToCartButton from "./AddToCartButton";

function ProductListItem({ product }) {
  return (
    <div className="flex border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      {/* Left Image */}
      <div className="w-40 flex-shrink-0 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 w-auto object-contain"
        />
      </div>

      {/* Right Details */}
      <div className="flex-1 px-4">
        {/* Title + Brand */}
        <Link
          to={`/product?productId=${product.id}`}
          className="text-lg font-semibold text-blue-700 hover:underline"
        >
          {product.title}
        </Link>
        <p className="text-sm text-gray-600">Brand: {product.brand}</p>

        {/* Rating + Reviews */}
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm font-medium">
            {product.rating.toFixed(1)} ★
          </span>
          <span className="text-gray-500 text-sm">
            {product.reviews?.length || 0} Reviews
          </span>
        </div>

        {/* Description (short) */}
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Warranty & Shipping */}
        <p className="text-xs text-gray-500 mt-1">
          {product.warrantyInformation} • {product.shippingInformation}
        </p>
      </div>

      {/* Price Section */}
      <div className="w-48 text-right flex flex-col justify-center">
        <div className="text-2xl font-bold text-gray-900">
          ₹{Math.round(product.price * 83).toLocaleString("en-IN")}
        </div>
        {product.discountPercentage && (
          <div className="text-sm text-green-600">
            {product.discountPercentage}% off
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {product.availabilityStatus}
        </p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}

export default ProductListItem;

import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }) {
  const USD_TO_INR = 88;

  return (
    <Link to={`/product/${product.id}`} className="block w-full">
      <div
        onClick={(e) => {
          if (e.target.closest("button")) e.preventDefault();
        }}
        className="card flex flex-col p-4 gap-4 rounded-2xl justify-center items-center border-2"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-48 object-cover"
        />
        <h3 className="text-lg font-semibold text-center">{product.title}</h3>
        <span className="text-xl text-gray-700 font-bold">
          ₹{(product.price * USD_TO_INR).toLocaleString("en-IN")}
        </span>
        <div className="flex">
          <span className="text-sm p-1 text-white bg-green-500 rounded-sm">
            {product.rating}⭐
          </span>
          <span className="ml-2">Ratings</span>
        </div>
        {/* ✅ Reusable Button */}
        <AddToCartButton product={product} />
      </div>
    </Link>
  );
}

export default ProductCard;

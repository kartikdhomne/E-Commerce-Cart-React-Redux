import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CartNotification from "./CartNotification";

function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const [showNotif, setShowNotif] = useState(false);

  const handleClick = () => {
    if (isInCart) {
      navigate("/cart");
    } else {
      dispatch(addToCart(product));
      setShowNotif(true);

      // auto close after 3 sec
      setTimeout(() => setShowNotif(false), 3000);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="cursor-pointer w-full mt-2 bg-black"
      >
        {isInCart ? "Go To Cart" : "Add to Cart"}
      </Button>

      {/* ✅ Notification */}
      <CartNotification
        show={showNotif}
        product={product}
        onClose={() => setShowNotif(false)}
      />
    </>
  );
}

export default AddToCartButton;

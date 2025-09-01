import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../features/cartSlice";
import { Button } from "@/components/ui/button";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Cart is empty</p>
          <div>
            <Button>
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} />
              <h3>{item.title}</h3>
              <p>💲{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => dispatch(increaseQuantity(item.id))}>
                +
              </button>
              <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                -
              </button>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: 💲{total}</h3>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
}

export default Cart;

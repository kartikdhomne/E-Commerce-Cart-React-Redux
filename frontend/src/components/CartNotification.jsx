import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

function CartNotification({ show, product, onClose }) {
  return (
    <AnimatePresence>
      {show && product && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed flex justify-between top-20 right-4 bg-black  rounded-lg p-4 w-120 z-50 border"
        >
          <div className="flex gap-3 items-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-12 h-12 object-cover rounded-md border"
            />
            <div>
              <p className="font-semibold text-white">{product.title}</p>
              <p className="text-md text-white">Added to cart</p>
            </div>
          </div>
          <Button onClick={onClose} className="text-start text-lg">
            X
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartNotification;

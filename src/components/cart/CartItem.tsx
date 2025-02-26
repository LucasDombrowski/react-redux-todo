import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../store/cartSlice"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface CartItemProps {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, price, quantity, thumbnail }) => {
  const dispatch = useDispatch();
  const itemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(itemRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" });
  }, []);

  return (
    <div ref={itemRef} className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
      <img src={thumbnail} alt={title} className="w-24 h-24 object-cover rounded-lg" />
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-700 mb-1">{title}</h2>
        <p className="text-gray-600 mb-2">Prix: {(price * quantity).toFixed(2)} EUR</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(updateQuantity({ id, quantity: Math.max(quantity - 1, 1) }))}
            disabled={quantity <= 1}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="w-12 text-center font-semibold text-gray-800 bg-gray-200 px-4 py-2 rounded-lg">
            {quantity}
          </span>
          <button
            onClick={() => dispatch(updateQuantity({ id, quantity: quantity + 1 }))}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => dispatch(removeFromCart(id))}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Supprimer
      </button>
    </div>
  );
};

export default CartItem;

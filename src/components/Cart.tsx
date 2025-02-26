import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CartItem from "./cart/CartItem";
import CartSummary from "./cart/CartSummary";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity ?? 0), 0).toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Votre Panier</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Votre panier est vide.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                quantity={item.quantity ?? 0}
                thumbnail={item.thumbnail}
              />
            ))}
          </div>

          {/* Résumé du panier */}
          <CartSummary totalItems={cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0)} totalPrice={calculateTotal()} />
        </div>
      )}
    </div>
  );
};

export default Cart;

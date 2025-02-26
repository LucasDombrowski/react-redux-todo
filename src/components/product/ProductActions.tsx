import { useRef, useState } from "react";
import { Heart } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductActionsProps {
  handleAddToCart: (quantity: number) => void;
  handleWishlistToggle: () => void;
  isInWishlist: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({ handleAddToCart, handleWishlistToggle, isInWishlist }) => {
  const actionsRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useGSAP(() => {
    gsap.from(actionsRef.current, { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.7)", stagger: 0.2 });
  }, []);

  return (
    <div ref={actionsRef} className="flex flex-col space-y-4">
      {/* Ligne avec le compteur et le bouton "Ajouter au panier" */}
      <div className="flex items-center space-x-4">
        {/* Sélection de la quantité */}
        <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
          <button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-300 text-gray-700 px-3 py-2 rounded-full hover:bg-gray-400"
          >
            -
          </button>
          <span className="text-lg font-semibold text-gray-800 px-4">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="bg-gray-300 text-gray-700 px-3 py-2 rounded-full hover:bg-gray-400"
          >
            +
          </button>
        </div>

        {/* Bouton Ajouter au panier */}
        <button
          onClick={() => handleAddToCart(quantity)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex-1 flex items-center justify-center"
        >
          Ajouter au panier
        </button>
      </div>

      {/* Bouton Wishlist */}
      <button
        onClick={handleWishlistToggle}
        className={`flex items-center justify-center px-4 py-2 rounded-lg w-full transition-colors ${
          isInWishlist ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? "fill-current text-white" : "stroke-current text-gray-800"}`} />
        {isInWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
      </button>
    </div>
  );
};

export default ProductActions;

import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist, deleteFromWishList } from "../../store/wishlistSlice";
import { RootState } from "../../store/store";
import { Product } from "../../store/productSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cardRef = useRef<HTMLDivElement>(null);

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  return (
    <div
      ref={cardRef}
      className="relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/products/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} className="w-full h-56 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors">
            {product.title}
          </h2>
        </Link>
        <p className="mt-2 text-gray-600">Prix : {product.price} EUR</p>
        <div className="mt-2 flex items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
            {product.reviews.length} Avis
          </span>
          <span className="ml-2 text-gray-500 text-sm">Évaluation : {product.rating} / 5</span>
        </div>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-4 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full transition-colors"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Ajouter au panier
        </button>
        <button
          onClick={() => dispatch(isInWishlist ? deleteFromWishList(product) : addToWishlist(product))}
          className={`mt-2 flex items-center justify-center px-4 py-2 rounded w-full transition-colors ${
            isInWishlist ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? "fill-current" : "stroke-current"}`} />
          {isInWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

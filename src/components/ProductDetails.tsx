import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../store/cartSlice";
import { addToWishlist, deleteFromWishList } from "../store/wishlistSlice";
import { fetchProducts, Product } from "../store/productSlice";
import ProductGallery from "./product/ProductGallery";
import ProductInfo from "./product/ProductInfo";
import ProductActions from "./product/ProductActions";
import CustomerReviews from "./product/CustomerReviews";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  if (!id) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  // Sélection du produit depuis le store
  const selector = useSelector((state: RootState) =>
    state.product.items.find((p) => p.id === parseInt(id)) ??
    state.product.searchItems.find((p) => p.id === parseInt(id))
  ) as Product | undefined;

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === selector?.id);

  const [product, setProduct] = useState<Product | undefined>(selector);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    setProduct(selector);
    setSelectedIndex(0);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!product) {
      setProduct(selector);
    }
  }, [selector]);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts({ page: 1, id: parseInt(id) }));
    }
  }, []);

  if (!product) return <p className="text-center text-gray-500 mt-8">Produit non trouvé</p>;

  const handleAddToCart = (quantity: number) => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      navigate("/cart");
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      dispatch(isInWishlist ? deleteFromWishList(product) : addToWishlist(product));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" key={id}>
      <div className="md:flex md:space-x-8">
        {/* Galerie du produit */}
        <ProductGallery images={product.images} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />

        {/* Détails du produit avec boutons en dessous */}
        <div className="md:w-1/2">
          <ProductInfo product={product} />

          {/* Actions sur le produit sous la description */}
          <div className="mt-6">
            <ProductActions handleAddToCart={handleAddToCart} handleWishlistToggle={handleWishlistToggle} isInWishlist={isInWishlist} />
          </div>
        </div>
      </div>

      {/* Avis clients */}
      <CustomerReviews reviews={product.reviews} />
    </div>
  );
};

export default ProductDetails;

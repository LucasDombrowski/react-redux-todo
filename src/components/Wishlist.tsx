import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ProductListing from "./ProductListing";

export default function Wishlist() {
  const items = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Votre Wishlist
      </h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-500">Votre wishlist est vide.</p>
      ) : (
        <ProductListing items={items} />
      )}
    </div>
  );
}

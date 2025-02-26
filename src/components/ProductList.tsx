import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchProducts, setPage } from "../store/productSlice";
import ProductListing from "./listing/ProductListing";
import ProductFilter from "./listing/ProductFilter";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, currentPage, currentCategory} = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, category: currentCategory }));
  }, [currentPage, currentCategory]);

  if (isLoading) return <p className="text-center text-gray-500 mt-8">Chargement...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Liste des Produits</h1>
      <nav className="flex items-center justify-center gap-4 mb-8">
        <ProductFilter />
      </nav>
      <ProductListing items={items} />
      <div className="flex justify-between mt-8">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
        >
          Précédent
        </button>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={items.length < 9}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;

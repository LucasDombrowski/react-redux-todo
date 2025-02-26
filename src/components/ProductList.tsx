import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import React, { useEffect } from "react";
import { fetchProducts, setCategory, setPage } from "../store/productSlice";
import { fetchCategories } from "../store/categorySlice";
import ProductListing from "./ProductListing";
import Select, { ActionMeta, SingleValue } from 'react-select';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items,
    isLoading,
    currentPage,
    categoryItems,
    currentCategory,
  } = useSelector((state: RootState) => ({
    ...state.product,
    categoryItems: state.category.items,
  }));

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage || 1,
        category: currentCategory,
      })
    );
  }, [dispatch, currentPage, currentCategory]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(setPage(1));
  },[currentCategory]);

  if (isLoading)
    return <p className="text-center text-gray-500 mt-8">Chargement...</p>;

  // Préparer les options pour le sélecteur
  const categoryOptions = categoryItems.map((category) => ({
    value: category.slug,
    label: category.name,
  }));

  // Ajouter une option pour "Toutes les catégories"
  categoryOptions.unshift({ value: 'all', label: 'Toutes les catégories' });

  // Gérer le changement de catégorie
  const handleCategoryChange = (newValue: SingleValue<{
    value: string;
    label: string;
}>, actionMeta: ActionMeta<{
    value: string;
    label: string;
}> ) => {
    if (newValue?.value === 'all') {
      dispatch(setCategory(undefined));
    } else {
      const selectedCategory = categoryItems.find(
        (category) => category.slug === newValue?.value
      );
      dispatch(setCategory(selectedCategory));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Liste des Produits
      </h1>
      <nav className="flex items-center justify-center gap-4 mb-8">
        {categoryItems.length > 0 && (
          <Select
            defaultValue={categoryOptions[0]}
            value={{
              value: currentCategory?.slug || 'all',
              label: currentCategory?.name || 'Toutes les catégories',
            }}
            onChange={handleCategoryChange}
            options={categoryOptions}
            className="w-64"
          />
        )}
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

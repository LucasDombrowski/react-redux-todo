import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setCategory, setPage } from "../../store/productSlice";
import Select, { ActionMeta, SingleValue } from "react-select";
import { useEffect } from "react";
import { fetchCategories} from "../../store/categorySlice";

const ProductFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categoryItems, currentCategory } = useSelector((state: RootState) => ({
    categoryItems: state.category.items,
    currentCategory: state.product.currentCategory,
  }));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryOptions = categoryItems.map((category) => ({
    value: category.slug,
    label: category.name,
  }));

  categoryOptions.unshift({ value: "all", label: "Toutes les catégories" });

  const handleCategoryChange = (newValue: SingleValue<{ value: string; label: string }>) => {
    if (newValue?.value === "all") {
      dispatch(setCategory(undefined));
    } else {
      const selectedCategory = categoryItems.find((category) => category.slug === newValue?.value);
      dispatch(setCategory(selectedCategory));
    }
  };

  return (
    <Select
      defaultValue={categoryOptions[0]}
      value={{
        value: currentCategory?.slug || "all",
        label: currentCategory?.name || "Toutes les catégories",
      }}
      onChange={handleCategoryChange}
      options={categoryOptions}
      className="w-64"
    />
  );
};

export default ProductFilter;

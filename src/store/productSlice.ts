import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "./categorySlice";
import { Review } from "../components/product/CustomerReviews";

export interface Product {
  thumbnail: string;
  category: string;
  brand: string;
  discountPercentage: number;
  stock: number;
  availabilityStatus: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  images: string[];
  warrantyInformation: string;
  weight: number;
  shippingInformation: string;
  sku: string;
  returnPolicy: string;
  reviews: Review[];
  rating: number;
  id: number;
  title: string;
  description: string;
  price: number;
  quantity?: number;
}

export const APIBaseURL = "https://dummyjson.com/products";
// Product Slice
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params: {
    page: number,
    category?: Category,
    id?: number
  }) => {
    const { page, category, id } = params;
    const perPage = 9;
    const skip = perPage * (page - 1);
    const urlParams = `?skip=${skip}&limit=${perPage}`;
    const baseUrl = category ? `${APIBaseURL}/category/${category.slug}` : APIBaseURL;
    const response = await fetch((typeof id === "number" && !category) ? APIBaseURL + "/" + id : baseUrl + urlParams);
    return id ? {
      products: [await response.json()]
    } : await response.json();
  }
)

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (query: string) => {
    if (query.length > 0) {
      const response = await fetch(`${APIBaseURL}/search?q=${query}&limit=3`);
      return await response.json();
    } else {
      return null;
    }
  }
)

const initialState: {
  items: Product[],
  searchItems: Product[],
  isLoading: boolean,
  currentPage: number,
  currentCategory?: Category
  isSearchLoading: boolean,
} = {
  items: [],
  searchItems: [],
  isLoading: false,
  currentPage: 1,
  isSearchLoading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    setCategory(state, action) {
      state.currentCategory = action.payload;
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchProducts.fulfilled, (state, action) => {
      if (action.payload.products) {
        state.items = action.payload.products as Product[];
      }
      state.isLoading = false;
    }).addCase(searchProducts.pending, (state) => {
      state.isSearchLoading = true;
    }).addCase(searchProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.searchItems = action.payload.products as Product[];
      }
      state.isSearchLoading = false;
    })
  },
});

export const { setPage, setCategory } = productSlice.actions;
export default productSlice.reducer;
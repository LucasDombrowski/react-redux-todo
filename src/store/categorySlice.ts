import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIBaseURL } from "./productSlice";

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async () => {
        const response = await fetch(`${APIBaseURL}/categories`);
        return await response.json();
    }
);

export interface Category{
    id: number;
    name: string;
    slug: string;
}

const initialState: {
    items: Category[];
    categoryLoading: boolean;
} = {
    items: [],
    categoryLoading: false
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.items = action.payload;
        }).addCase(fetchCategories.pending, (state) => {
            state.categoryLoading = true;
        })
    },
}); 

export default categorySlice.reducer;

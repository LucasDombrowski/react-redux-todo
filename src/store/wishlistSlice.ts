import { createSlice } from "@reduxjs/toolkit"
import { Product } from "./productSlice"

const initialState : {
    items: Product[]
} = {
    items : []
};

const whishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist : (state, action : {
            payload: Product
        })=>{
            state.items.push(action.payload);
        },
        deleteFromWishList: (state, action : {
            payload: Product
        })=>{
            state.items = state.items.filter(({id})=>id!==action.payload.id);
        }
    }
});

export const {addToWishlist,deleteFromWishList} = whishlistSlice.actions;

export default whishlistSlice.reducer;
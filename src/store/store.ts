import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import wishlistReducer from "./wishlistSlice";
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage
}

const persistWishlistReducer = persistReducer(wishlistPersistConfig,wishlistReducer);
const persistCartReducer = persistReducer(cartPersistConfig,cartReducer);

// Configuration du store Redux
export const store = configureStore({
  reducer: {
    cart: persistCartReducer,
    product: productReducer,
    category: categoryReducer,
    wishlist: persistWishlistReducer
  },
  // Ajout des middleware par défaut (utile pour des middlewares additionnels)
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);
// Types pour le typage de l'état global et des dispatchs
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
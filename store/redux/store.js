import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../slice/AllProductsSlice';
import AuthSlice from "../slice/AuthSlice";


const store = configureStore({
    reducer: {
        products : productsReducer,
        auth: AuthSlice,
    }
});

export default store;
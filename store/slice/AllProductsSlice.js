import { createSlice } from "@reduxjs/toolkit";
import { ProductsData } from "../../data/Products";

const initialState = {
  Cart: [],
  subTotal: 0,
  // ModalVisibility: false,
};

const ProductsSlice = createSlice({
  name: "CartProducts",
  initialState,
  reducers: {
    AddToCart(state, action) {
      const isExist = state.Cart.some((item) => item.id === action.payload.id);
      if (isExist) {
        const product = state.Cart.find(
          (item) => item.id === action.payload.id
        );
        product.quantity += 1;
        state.subTotal += parseInt(product.price);

        // console.log(typeof(parseFloat(product.price)));
      } else {
        state.Cart.push(action.payload);
        action.payload.quantity += 1;
        state.subTotal += parseInt(action.payload.price);
      }
    },
    incrementQuantity(state, action) {
      const product = state.Cart.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
        state.subTotal += parseInt(product.price);
      }
    },
    decrementQuantity(state, action) {
      const product = state.Cart.find((item) => item.id === action.payload.id);
      if (product.quantity !== 1) {
        product.quantity -= 1;
        state.subTotal -= parseInt(product.price);
      } else {
        state.subTotal -= parseInt(product.price);
        state.Cart = state.Cart.filter((item) => item.id !== action.payload.id);
      }
    },
    clearCartHandler(state, action){
      state.Cart.splice(0, state.Cart.length);
      state.subTotal = 0
    }
  },
});

export const { AddToCart, incrementQuantity, decrementQuantity, clearCartHandler } =
  ProductsSlice.actions;

export default ProductsSlice.reducer;

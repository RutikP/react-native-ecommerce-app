import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import CartSubTotal from "../components/CartSubTotal";
import { LinearGradient } from "expo-linear-gradient";
import { clearCartHandler } from "../store/slice/AllProductsSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.products.Cart);
  const dispatch = useDispatch();

  function OnClearCartHandler() {
    dispatch(clearCartHandler());
  }

  return (
    <LinearGradient
      // Set the gradient colors (two teal shades)
      colors={["#b4dfd5", "#499187"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }} // Increases the gradient effect from top to bottom
      style={{ flex: 1 }}
    >
      <ScrollView className="p-4">
        <CartSubTotal />
        {cartItems.length > 0 && (
          <TouchableOpacity
            className="flex-row justify-end"
            onPress={OnClearCartHandler}
          >
            <Text className="text-lg text-right mb-4 text-white bg-teal-900 w-16 pr-3 py-1 rounded-lg">
              Clear
            </Text>
          </TouchableOpacity>
        )}
        {cartItems.length > 0 &&
          cartItems.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
      </ScrollView>
    </LinearGradient>
  );
}

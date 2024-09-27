import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { useSelector } from "react-redux";

const CartSubTotal = () => {
  const SubTotal = useSelector((state) => state.products.subTotal);
  return (
    <View className="bg-white shadow-lg rounded-lg p-4 my-4 mx-4">
      <Text className="text-2xl font-bold text-center">Shopping Cart</Text>

      {SubTotal > 0 ? (
        <>
          <View className="border-b-2 border-gray-300 my-2"></View>
          <View className="flex-row justify-between items-center my-4">
            <Text className="text-lg font-semibold">Subtotal</Text>
            <Text className="text-lg font-semibold text-blue-600">
              Rs.{SubTotal}
            </Text>
          </View>
          <TouchableOpacity className="bg-blue-500 rounded-lg py-3 px-4 mt-4">
            <Text className="text-white text-center text-lg font-bold">
              Proceed to Buy
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-lg my-5 text-center">No Items Added!!</Text>
      )}
    </View>
  );
};

export default CartSubTotal;

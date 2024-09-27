import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { images } from "../data/Images/ImageMapping";
import { incrementQuantity, decrementQuantity } from "../store/slice/AllProductsSlice";
import { useSelector, useDispatch } from "react-redux";

function CartItem({ product }) {
  const dispatch = useDispatch();

  function IncrementHandler(product) {
    dispatch(incrementQuantity(product));
  }
  function DecrementHandler(product) {
    dispatch(decrementQuantity(product));
  }

  return (
    <View className="flex-row bg-white p-4 mb-4 shadow-md rounded-lg">
      {/* Left: Product Image and Increment/Decrement Controls */}
      <View className="mr-4 items-center">
        <Image
          source={images[product.image]}
          style={{ width: 120, height: 80, borderRadius: 8 }}
          className="mb-2"
        />
        {/* Increment and Decrement Buttons */}
        <View className="flex-row items-center space-x-2 mt-2">
          <TouchableOpacity
            onPress={DecrementHandler.bind(this, product)}
            className="bg-gray-200 px-3 py-1 rounded-lg"
          >
            <Text className="text-lg">-</Text>
          </TouchableOpacity>

          {/* Product Quantity */}
          <Text className="px-4 text-lg font-bold">{product.quantity}</Text>

          <TouchableOpacity
            className="bg-gray-200 px-3 py-1 rounded-lg"
            onPress={IncrementHandler.bind(this, product)}
          >
            <Text className="text-lg">+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Right: Product Details */}
      <View className="flex-1 justify-center">
        <Text className="text-lg font-bold">{product.title}</Text>
        <Text className="text-sm text-gray-500">{product.description}</Text>
        <Text className="text-md font-semibold text-green-600 mt-2">
          Rs.{product.price}
        </Text>
      </View>
    </View>
  );
}

export default CartItem;

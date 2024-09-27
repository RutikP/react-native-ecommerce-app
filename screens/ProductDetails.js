import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { images } from "../data/Images/ImageMapping";
import { LinearGradient } from "expo-linear-gradient";
import { AddToCart } from "../store/slice/AllProductsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetails({ route }) {
  const { product } = route.params;
  const [infoForAddingInCart, setInfoForAddingInCart] = useState(false);

  const dispatch = useDispatch();
  function addToCartHandler(product) {
    dispatch(AddToCart(product));
    setInfoForAddingInCart(true);
    // Hide message after 2 seconds
    setTimeout(() => {
      setInfoForAddingInCart(false);
    }, 1000);
  }

  return (
    <LinearGradient
      // Set the gradient colors (two teal shades)
      colors={["#b4dfd5", "#499187"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }} // Increases the gradient effect from top to bottom
      style={{ flex: 1 }}
    >
      <ScrollView className="p-4 mb-2">
        {/* Product Image */}
        <View className="mb-4 bg-transparent rounded-lg overflow-hidden shadow-md">
          <Image
            source={images[product.image]}
            className="w-full h-60"
            resizeMode="contain"
          />
        </View>

        {/* Product Title */}
        <Text className="text-2xl font-semibold mb-2 text-gray-900">
          {product.title}
        </Text>

        {/* Category */}
        <Text className="text-sm text-gray-600 mb-4">{product.category}</Text>

        {/* Description */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-base text-gray-800">{product.description}</Text>
        </View>

        {/* Price */}
        <Text className="text-2xl font-bold text-teal-700 mb-2">
          Rs.{product.price}
        </Text>

        {/* Stock Availability */}
        <Text
          className={`text-lg font-semibold mb-4 ${
            product.stock > 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Text>

        <TouchableOpacity
          className="bg-teal-700 rounded-lg py-4 mx-3 mb-3 px-2"
          onPress={addToCartHandler.bind(this, product)}
        >
          <Text className="text-white text-center font-bold">ADD TO CART</Text>
        </TouchableOpacity>
        {infoForAddingInCart && <Text className="text-teal text-center font-bold mb-5 ">Added to Cart</Text>}
        
        {/* Brand */}
        {product.brand && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-base text-gray-700">
              <Text className="font-semibold">Brand:</Text> {product.brand}
            </Text>
          </View>
        )}

        {/* Weight */}
        {product.weight && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-base text-gray-700">
              <Text className="font-semibold">Weight:</Text> {product.weight}
            </Text>
          </View>
        )}

        {/* Dimensions */}
        {product.dimensions && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-base text-gray-700">
              <Text className="font-semibold">Dimensions:</Text>{" "}
              {product.dimensions}
            </Text>
          </View>
        )}

        {/* Material */}
        {product.material && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-base text-gray-700">
              <Text className="font-semibold">Material:</Text>{" "}
              {product.material}
            </Text>
          </View>
        )}

        {/* Ingredients (for Groceries) */}
        {product.ingredients && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-2">Ingredients:</Text>
            <Text className="text-base text-gray-700">
              {product.ingredients.join(", ")}
            </Text>
          </View>
        )}

        {/* Usage Instructions (for Beauty or Groceries) */}
        {product.usageInstructions && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-lg font-semibold mb-2">
              Usage Instructions:
            </Text>
            <Text className="text-base text-gray-700">
              {product.usageInstructions}
            </Text>
          </View>
        )}

        {/* Expiration Date (for Groceries or Beauty) */}
        {product.expirationDate && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-base text-gray-700">
              <Text className="font-semibold">Expiration Date:</Text>{" "}
              {product.expirationDate}
            </Text>
          </View>
        )}

        {/* Warranty (for Electronics or Home) */}
        {product.warranty && (
          <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <Text className="text-base text-gray-700">
              <Text className="font-semibold">Warranty:</Text>{" "}
              {product.warranty} years
            </Text>
          </View>
        )}

        {/* Rating */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-base text-gray-700">
            <Text className="font-semibold">Rating:</Text> {product.rating} / 5
            ({product.numReviews} reviews)
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

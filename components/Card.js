import { React, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { images } from "../data/Images/ImageMapping";
import { useDispatch, useSelector } from "react-redux";
import { OpenModalHandler } from "../store/slice/AllProductsSlice";


// git remote add origin https://github.com/RutikP/react-native-ecommerce-app.git
// https://github.com/RutikP/react-native-ecommerce-app

const Card = ({ product, addToCartHandler, navigation }) => {
  const [infoForAddingInCart, setInfoForAddingInCart] = useState(false);
  function onAddToCartHandler(product) {
    addToCartHandler(product);
    setInfoForAddingInCart(true);
    // Hide message after 2 seconds
    setTimeout(() => {
      setInfoForAddingInCart(false);
    }, 1000);
  }
  function openProduct() {
    navigation.navigate("ProductDetails", { product: product });
  }
  return (
    <>
      <View className="bg-white shadow-lg rounded-lg overflow-hidden my-4 mx-4 ">
        {/* Product Image */}
        <TouchableOpacity onPress={openProduct}>
          <Image
            source={images[product.image]}
            className="w-full h-48 object-cover "
          />

          {/* Product Details */}

          <View className="p-4 pb-1">
            {/* Product Caption */}
            <Text className="text-lg font-bold mb-2">{product.title}</Text>

            {/* Product Description */}
            <Text className="text-gray-700 mb-2">{product.description}</Text>

            {/* Price */}
            <Text className="text-teal-500 text-xl font-semibold mb-4">
              Rs.{product.price}
            </Text>
            

            {/* Add to Cart Button */}
          </View>
        </TouchableOpacity>
        {infoForAddingInCart && (
          <Text className="text-teal text-center font-bold mb-5 ">
            Added to Cart
          </Text>
        )}
        <TouchableOpacity
          className="bg-teal-700 rounded-lg py-4 mx-3 mb-3 px-2"
          onPress={onAddToCartHandler.bind(this, product)}
        >
          <Text className="text-white text-center font-bold">ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Card;

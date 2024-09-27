import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Card from "../components/Card";
// npx expo install react-native-svg
import { ProductsData } from "../data/Products";
import { Categories } from "../data/Products";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../store/slice/AllProductsSlice";
import { LinearGradient } from "expo-linear-gradient";

export default function Products({ route, navigation }) {
  const CartProducts = useSelector((state) => state.products.Cart);
  const [showCategory, setShowCategory] = useState("ALL");
  const [filteredProducts, setFilteredProducts] = useState();

  useEffect(() => {
    const newFilteredProducts = ProductsData.filter(
      (product) => product.category === showCategory
    );
    if (newFilteredProducts.length === 0) {
      setFilteredProducts(ProductsData);
      return;
    }
    setFilteredProducts(newFilteredProducts);
  }, [showCategory]);

  const dispatch = useDispatch();

  function addToCartHandler(product) {
    dispatch(AddToCart(product));
  }

  function OnFocusHandler(category) {
    setShowCategory(category);
  }
  // console.log(filteredProducts);
  return (
    <LinearGradient
      // Set the gradient colors (two teal shades)
      colors={["#b4dfd5", "#499187"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }} // Increases the gradient effect from top to bottom
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mx-6 my-4"
        >
          {Categories.map((category) => (
            <TouchableOpacity
              className={`${
                category !== showCategory
                  ? "bg-teal-500 shadow-lg rounded-lg mr-5 justify-center items-center"
                  : "bg-teal-900 shadow-lg rounded-lg mr-5 justify-center items-center"
              }`}
              key={category}
              onPress={OnFocusHandler.bind(this, category)}
            >
              <Text className="text-base h-16 px-3 py-5 text-white">
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => {
            return item.id;
          }}
          showsVerticalScrollIndicator={false}
          renderItem={(itemData) => (
            <Card
              product={itemData.item}
              addToCartHandler={addToCartHandler}
              navigation={navigation}
            />
          )}
        />
      </View>
    </LinearGradient>
  );
}

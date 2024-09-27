import React, { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { login } from "../util/auth";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/slice/AuthSlice";



const LoginScreen = ({ navigation }) => {

    const userEmailRef = useRef(null);
    const userPasswordRef = useRef(null);

    const dispatch = useDispatch();

    async function loginHandler(params) {
        console.log(userEmailRef.current?.value);
        console.log(userPasswordRef.current?.value);

        let email = (userEmailRef.current?.value) ? userEmailRef.current?.value : "" ;
        let password = (userPasswordRef.current?.value) ? userPasswordRef.current?.value : "";


        if(email !== "" && password !== ""){
            // console.log("Can be authenticated");
            try {
                const token = await login(email, password);
                dispatch(authenticate(token));
                console.log("LoginPage token "+token);
            }
            catch(error){
                alert(
                    "Login failed failed: " +
                      (error.response ? error.response.data.error.message : error.message)
                  );
            }
        }
        else{
            Alert.alert("Not a valid values","Enter the correct credentials");
        }

    }

  return (
    <LinearGradient
      // Set the gradient colors (two teal shades)
      colors={["#b4dfd5", "#499187"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }} // Increases the gradient effect from top to bottom
      style={{ flex: 1 }}
    >
      <View className="flex-1 justify-center items-center p-4">
        <View className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <Text className="text-2xl font-bold mb-4 text-center">Login</Text>
          <TextInput
            placeholder="Email"
            ref={userEmailRef}
            onChangeText={(e) => (userEmailRef.current.value = e)}
            className="border border-gray-300 p-3 mb-4 rounded"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            ref={userPasswordRef}
            onChangeText={(e) => (userPasswordRef.current.value = e)}
            className="border border-gray-300 p-3 mb-6 rounded"
          />
          <TouchableOpacity className="bg-teal-500 p-3 rounded" onPress={loginHandler}>
            <Text className="text-white text-center font-bold">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignupScreen")}
            className="mt-4"
          >
            <Text className="text-teal-900 text-center">
              Don't have an account? Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

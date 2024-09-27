import {React, useRef} from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { createUser } from "../util/auth";
import AuthSlice from "../store/slice/AuthSlice";
import { authenticate } from "../store/slice/AuthSlice";
import { useDispatch } from "react-redux";


const SignupScreen = ({ navigation }) => {

    const userEmailRef = useRef(null);
    const userPasswordRef = useRef(null);
    const confirmuserPasswordRef = useRef(null);

    const dispatch = useDispatch();

    async function signupHandler() {
        // console.log(userEmailRef.current?.value);
        // console.log(userPasswordRef.current?.value);
        // console.log(confirmuserPasswordRef.current?.value);
        let email = (userEmailRef.current?.value) ? userEmailRef.current?.value : "" ;
        let password = (userPasswordRef.current?.value) ? userPasswordRef.current?.value : "";
        let confirmPassword = (confirmuserPasswordRef.current?.value) ? confirmuserPasswordRef.current?.value : "" ;


        if((email !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword )){
            // console.log("Can be authenticated");
            try {
                const token = await createUser(email, password);
                dispatch(authenticate(token));
            }
            catch(error){
                alert(
                    "Sign up failed: " +
                      (error.response ? error.response.data.error.message : error.message)
                  );
            }
        }
        else{
            Alert.alert("Not a valid values","Email length should be greated than 0 and password and confirm password slould match");
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
          <Text className="text-2xl font-bold mb-4 text-center">Signup</Text>
          <TextInput
            placeholder="Email"
            ref={userEmailRef}
            onChangeText={(e) => (userEmailRef.current.value = e)}
            className="border border-gray-300 p-3 mb-4 rounded"
          />
          <TextInput
            placeholder="Password"
            ref={userPasswordRef}
            onChangeText={(e) => (userPasswordRef.current.value = e)}
            secureTextEntry
            className="border border-gray-300 p-3 mb-4 rounded"
          />
          <TextInput
            placeholder="Confirm Password"
            ref={confirmuserPasswordRef}
            onChangeText={(e) => (confirmuserPasswordRef.current.value = e)}
            secureTextEntry
            className="border border-gray-300 p-3 mb-6 rounded"
          />
          <TouchableOpacity className="bg-teal-500 p-3 rounded" onPress={signupHandler}>
            <Text className="text-white text-center font-bold">Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            className="mt-4"
          >
            <Text className="text-teal-900 text-center">
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignupScreen;

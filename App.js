import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./store/redux/store";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { logout } from "./store/slice/AuthSlice";

const MyView = styled(View);
const MyText = styled(Text);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  const dispatch = useDispatch();
  function logoutHandler() {
    dispatch(logout());
  }
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity onPress={logoutHandler}>
                <Text>Logout</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}

function Root() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart";
            return <EvilIcons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "teal",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "transparent",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// Separate AppNavigator component that uses useSelector
function AppNavigator() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <Root /> : <AuthStack />}
    </NavigationContainer>
  );
}

// Main App component that wraps the Provider
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

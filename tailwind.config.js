/** @type {import('tailwindcss').Config} */
// import Card from './components/CArd'
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    // "./<custom directory>/**/*.{js,jsx,ts,tsx}",
    "./screens/Products.js",
    "./screens/ProductDetails.js",
    "./screens/Cart.js",
    "./screens/LoginScreen.js",
    "./screens/SignupScreen.js",
    "./components/Card.js",
    "./components/CartItem.js",
    "./components/CartSubTotal.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

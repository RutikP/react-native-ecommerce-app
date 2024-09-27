import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: '',
  isLoggedIn: false,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    authenticate(state, action) {
      // Set the token and update login status
      state.token = action.payload;  // action.payload contains the token
      state.isLoggedIn = true;
    //   console.log(state.token);
      // Optionally store the token in AsyncStorage (uncomment if needed)
      // AsyncStorage.setItem('token', action.payload);
    },
    logout(state) {
      // Clear the token and reset login status
      state.token = '';
      state.isLoggedIn = false;
      
      // Optionally remove the token from AsyncStorage (uncomment if needed)
      // AsyncStorage.removeItem('token');
    },
  },
});

export const { authenticate, logout } = AuthSlice.actions;

export default AuthSlice.reducer;

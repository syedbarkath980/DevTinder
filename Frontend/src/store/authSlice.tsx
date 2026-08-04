import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // will hold { firstName, lastName, email } once logged in
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Call this right before making the login API call
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Call this after the API call succeeds
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    // Call this if the API call fails
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Call this on logout
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;

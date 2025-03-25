import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, //  Refresh ke baad bhi user milega
  token: localStorage.getItem("token") || null, //  Refresh ke baad bhi token milega
  loading: false, //Add a loading state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      console.log("state", state, action);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false; // Stop loading
      //  Local Storage me save karein
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    loginFail: (state) => {
      state.loading = false; // Stop loading
    },
    logout: (state) => {
      console.log("Before Logout:", state);
      state.user = null;
      state.token = null;
      state.loading = false; // Stop loading
      console.log("After Logout:", state);

      //  Local Storage se remove karein
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, loginStart, loginFail, logout } =
  authSlice.actions;

/** why this  */
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectLoading = (state) => state.auth.loading; //Select loading state
/** why this  */
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import me from "../assets/me.jpg";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "Jame Marker",
      position: "General Manager",
      image: me,
    },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;

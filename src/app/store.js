import { configureStore } from "@reduxjs/toolkit";
import { toggleSlice } from "./toggleSlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        toggle: toggleSlice.reducer,
        auth: authSlice.reducer
    },
});
export default store;
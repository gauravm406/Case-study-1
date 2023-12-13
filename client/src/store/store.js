import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

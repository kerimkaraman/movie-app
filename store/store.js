import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupSlice";

export const store = configureStore({
  reducer: {
    signup: signupSlice,
  },
});

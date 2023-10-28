import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    namesurname: "",
    email: "",
    password: "",
  },
  reducers: {
    updateNameSurname: (state, action) => {
      state.namesurname = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
  },
});
export const { updateEmail, updatePassword, updateNameSurname } =
  signupSlice.actions;
export default signupSlice.reducer;

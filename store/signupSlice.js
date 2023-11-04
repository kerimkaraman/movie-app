import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    userID: "",
    namesurname: "",
    email: "",
    password: "",
  },
  reducers: {
    updateUserID: (state, action) => {
      state.userID = action.payload;
    },
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
export const { updateEmail, updatePassword, updateNameSurname, updateUserID } =
  signupSlice.actions;
export default signupSlice.reducer;

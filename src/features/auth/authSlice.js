import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("eventlyUser");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
    users: JSON.parse(localStorage.getItem("eventlyUsers") || "[]"),
    message: ""
  },
  reducers: {
    registerUser: (state, action) => {
      const exists = state.users.some(
        (user) => user.email.toLowerCase() === action.payload.email.toLowerCase()
      );

      if (exists) {
        state.message = "An account with this email already exists.";
        return;
      }

      state.users.push(action.payload);
      localStorage.setItem("eventlyUsers", JSON.stringify(state.users));
      state.user = {
        name: action.payload.name,
        email: action.payload.email
      };
      localStorage.setItem("eventlyUser", JSON.stringify(state.user));
      state.message = "Account created successfully.";
    },
    loginUser: (state, action) => {
      const foundUser = state.users.find(
        (user) =>
          user.email.toLowerCase() === action.payload.email.toLowerCase() &&
          user.password === action.payload.password
      );

      if (!foundUser) {
        state.message = "Email or password is incorrect. Register first if you are new.";
        return;
      }

      state.user = { name: foundUser.name, email: foundUser.email };
      localStorage.setItem("eventlyUser", JSON.stringify(state.user));
      state.message = "Login successful.";
    },
    logoutUser: (state) => {
      state.user = null;
      state.message = "";
      localStorage.removeItem("eventlyUser");
    },
    clearAuthMessage: (state) => {
      state.message = "";
    }
  }
});

export const { registerUser, loginUser, logoutUser, clearAuthMessage } = authSlice.actions;
export default authSlice.reducer;
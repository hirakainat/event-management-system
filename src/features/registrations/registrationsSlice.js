import { createSlice } from "@reduxjs/toolkit";

const registrationsSlice = createSlice({
  name: "registrations",
  initialState: JSON.parse(localStorage.getItem("eventlyRegistrations") || "[]"),
  reducers: {
    registerForEvent: (state, action) => {
      const alreadyRegistered = state.some(
        (item) =>
          item.userEmail === action.payload.userEmail &&
          item.event.id === action.payload.event.id
      );

      if (!alreadyRegistered) {
        state.push(action.payload);
        localStorage.setItem("eventlyRegistrations", JSON.stringify(state));
      }
    },
    cancelRegistration: (state, action) => {
      const updated = state.filter(
        (item) =>
          !(
            item.userEmail === action.payload.userEmail &&
            item.event.id === action.payload.eventId
          )
      );
      localStorage.setItem("eventlyRegistrations", JSON.stringify(updated));
      return updated;
    }
  }
});

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions;
export default registrationsSlice.reducer;
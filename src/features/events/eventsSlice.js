import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://app.ticketmaster.com/discovery/v2";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async ({ keyword = "", city = "", category = "" } = {}) => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

    if (!apiKey) {
      throw new Error("Add your Ticketmaster API key to the .env file.");
    }

    const params = new URLSearchParams({
      apikey: apiKey,
      size: "24",
      sort: "date,asc",
      startDateTime: new Date().toISOString().slice(0, 19) + "Z",
      includeTBA: "no",
      includeTBD: "no"
    });

    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (city.trim()) params.set("city", city.trim());
    if (category) params.set("classificationName", category);

    const response = await fetch(`${API_URL}/events.json?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Could not load events. Check your API key or try again.");
    }

    const data = await response.json();
    return data._embedded?.events || [];
  }
);

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id) => {
    const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

    if (!apiKey) {
      throw new Error("Add your Ticketmaster API key to the .env file.");
    }

    const response = await fetch(`${API_URL}/events/${id}.json?apikey=${apiKey}`);

    if (!response.ok) {
      throw new Error("Event not found.");
    }

    return response.json();
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    items: [],
    status: "idle",
    error: "",
    selected: null,
    selectedStatus: "idle"
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong.";
      })
      .addCase(fetchEventById.pending, (state) => {
        state.selectedStatus = "loading";
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchEventById.rejected, (state) => {
        state.selectedStatus = "failed";
      });
  }
});

export default eventsSlice.reducer;
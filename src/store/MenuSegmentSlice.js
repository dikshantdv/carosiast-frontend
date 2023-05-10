import { createSlice } from "@reduxjs/toolkit";

const initialMenuState = {
  menus: [
    {
      title: "Trending Cars",
      url: "http://44.202.0.125/cars/getTrending",
    },
    {
      title: "Latest Cars",
      url: "http://44.202.0.125/cars/getLatest",
    },
  ],
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initialMenuState,
  reducers: {
    replaceMenuData(state, action) {
      state.menus = action.payload;
    },
  },
});

export const menuActions = menuSlice.actions;

export default menuSlice;

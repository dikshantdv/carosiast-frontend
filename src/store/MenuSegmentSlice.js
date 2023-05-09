import { createSlice } from "@reduxjs/toolkit";

const initialMenuState = {
  menus: [
    {
      title: "Trending Cars",
      url: "https://carosiast-backend.onrender.com/cars/getTrending",
    },
    {
      title: "Latest Cars",
      url: "https://carosiast-backend.onrender.com/cars/getLatest",
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

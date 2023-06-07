import { createSlice } from "@reduxjs/toolkit";

const initialMenuState = {
  menus: [
    {
      title: "Trending Cars",
      url: "http://3.83.80.79//cars/getTrending",
    },
    {
      title: "Latest Cars",
      url: "http://3.83.80.79//cars/getLatest",
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

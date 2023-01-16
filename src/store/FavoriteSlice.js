import { createSlice } from "@reduxjs/toolkit";

const initialFavoriteState = {
  loading: false,
  cars: [
    {
      _id: "hyundai",
      logoUrl: require("../assets/logo/hyundai.png"),
    },
    {
      _id: "honda",
      logoUrl: require("../assets/logo/honda.png"),
    },
    {
      _id: "maruti-suzuki",
      logoUrl: require("../assets/logo/suzuki.png"),
    },
  ],
};

const favoriteSlice = createSlice({
  name: "brand",
  initialState: initialFavoriteState,
  reducers: {
    replaceFavoriteData(state, action) {
      state.cars = action.payload;
    },
    setFavoriteLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice;

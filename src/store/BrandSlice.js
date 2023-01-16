import { createSlice } from "@reduxjs/toolkit";

const initialBrandState = {
  brands: [
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
    {
      _id: "toyota",
      logoUrl: require("../assets/logo/toyota.png"),
    },
  ],
};

const brandSlice = createSlice({
  name: "brand",
  initialState: initialBrandState,
  reducers: {
    replaceBrandData(state, action) {
      state.brands = action.payload;
    },
    setBrandLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const brandActions = brandSlice.actions;

export default brandSlice;

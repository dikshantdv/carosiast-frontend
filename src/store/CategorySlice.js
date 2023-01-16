import { createSlice } from "@reduxjs/toolkit";

const initialCategoryState = {
  categories: [
    {
      _id: "hatchback",
      name: "Hatchback",
      categoryUrl: require('../assets/hatchback.png')
    },
    {
      _id: "suv",
      name: "SUV",
      categoryUrl: require('../assets/suv.png'),
    },
    {
      _id: "compact-suv",
      name: "CUV",
      categoryUrl: require('../assets/compact-suv.png')
    },
    {
      _id: "sedan",
      name: "Sedan",
      categoryUrl: require('../assets/sedan.png')
    },
    {
      _id: "compact-sedan",
      name: "C-Sedan",
      categoryUrl: require('../assets/compact-sedan.png')
    },
  ],
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {
    replaceCategoryData(state, action) {
      state.brands = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;

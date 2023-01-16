import { createSlice } from "@reduxjs/toolkit";

const initialCarListState = {
  loading: false,
  cars: [

  ],
};

const carListSlice = createSlice({
  name: "brand",
  initialState: initialCarListState,
  reducers: {
    replaceCarListData(state, action) {
      state.cars = action.payload;
    },
    setCarListLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const carListActions = carListSlice.actions;

export default carListSlice;

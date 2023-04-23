import { createSlice } from "@reduxjs/toolkit";

const initialDetailState = {
  coordinates: [26.815394, 75.8241193],
  cityName: 'Jaipur',
  loading: false,
  showroomLoading: false,
  car: {},
  selectedVariant: {},
  showrooms: [],
};

const detailSlice = createSlice({
  name: "detail",
  initialState: initialDetailState,
  reducers: {
    replaceDetailData(state, action) {
      state.car = action.payload;
    },
    replaceCoordinateData(state, action) {
      state.coordinates = action.payload;
    },
    replaceShowroomData(state, action) {
      state.showrooms = action.payload;
    },
    replaceCityName(state, action) {
      state.cityName = action.payload;
    },
    setDetailLoading(state, action) {
      state.loading = action.payload;
    },
    setShowroomLoading(state, action) {
      state.showroomLoading = action.payload;
    },
    setSelectedVariant(state, action) {
      state.selectedVariant = action.payload;
    },
  },
});

export const detailActions = detailSlice.actions;

export default detailSlice;

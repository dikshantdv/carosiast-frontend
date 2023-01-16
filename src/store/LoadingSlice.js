import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialAccountState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice;

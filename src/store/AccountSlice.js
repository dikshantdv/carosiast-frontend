import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {
  isLoggedIn: false,
  name: "",
  token: null,
  willGet: 0,
  willGive: 0,
  friendsId: null,
  _id: null,
  DpURL:
    "https://api.time.com/wp-content/uploads/2019/08/better-smartphone-photos.jpg",
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    replaceAccountName(state, action) {
      state.name = action.payload;
    },
    replaceAccountData(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state._id = action.payload._id;
      state.willGet = action.payload.willGet;
      state.willGive = action.payload.willGive;
      state.name = action.payload.name;
      state.friendsId = action.payload.friendsId;
    },
    replaceMoneyData(state, action) {
      state.willGet = action.payload.willGet;
      state.willGive = action.payload.willGive;
    },
    clearAccountData(state) {
      state.isLoggedIn = false;
      state.name = "";
      state.token = null;
      state.willGet = 0;
      state.willGive = 0;
      state.friendsId = null;
      state._id = null;
    },
    replaceSavedAccountData(state, action) {
      console.log(action.payload, "dsvxfdgvcxdfgvcxdfgvxc");
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state._id = action.payload._id;
      state.name = action.payload.name;
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice;

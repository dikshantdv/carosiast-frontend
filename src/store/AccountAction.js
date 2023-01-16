import { accountActions } from "./AccountSlice";
import { getFriendsData } from "./FriendActions";
import { loadingActions } from "./LoadingSlice";
import * as RootNavigation from "../hooks/RootNavigation";
import { getTransactions } from "./TransactionAction";
import { getSplits } from "./SplitAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUserData = (user) => {
  return async (dispatch) => {
    dispatch(loadingActions.setLoading(true));
    const sendRequest = async () => {
      const body = JSON.stringify(user);
      const response = await fetch(
        "https://splitbuddy-backend.onrender.com/user/createUser",
        {
          method: "POST",
          body,
          headers: { "content-type": "application/json" },
        }
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };

    const userData = await sendRequest();
    // if (userData.status === "already exists") {
    // dispatch(accountActions.replaceAccountData(userData.user));
    //   dispatch(loadingActions.setLoading(false));
    // }
    if (userData.status === "success") {
      dispatch(
        accountActions.replaceAccountData({
          ...userData.user,
          token: "Bearer " + userData.token,
        })
      );
      AsyncStorage.setItem("token", "Bearer " + userData.token);
      AsyncStorage.setItem("_id", userData.user._id);
      AsyncStorage.setItem("name", userData.user.name);

      dispatch(loadingActions.setLoading(false));
      dispatch(getTransactions("Bearer " + userData.token));
      dispatch(getSplits("Bearer " + userData.token));
      dispatch(getFriendsData("Bearer " + userData.token));
    }
  };
};

export const savedUserData = (userData) => {
  return async (dispatch) => {
    dispatch(
      accountActions.replaceSavedAccountData({
        ...userData,
      })
    );
    dispatch(getMoneyData(userData.token));
    dispatch(loadingActions.setLoading(false));
    dispatch(getTransactions(userData.token));
    dispatch(getSplits(userData.token));
    dispatch(getFriendsData(userData.token));
  };
};

export const setUserData = (user) => {
  return async (dispatch) => {
    dispatch(loadingActions.setLoading(true));
    const sendRequest = async () => {
      const body = JSON.stringify(user);
      const response = await fetch(
        "https://splitbuddy-backend.onrender.com/user/verifyOtp",
        {
          method: "POST",
          body,
          headers: { "content-type": "application/json" },
        }
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };

    const userData = await sendRequest();
    if (userData.status === "already exists") {
      dispatch(
        accountActions.replaceAccountData({
          ...userData.user,
          token: "Bearer " + userData.token,
        })
      );
      AsyncStorage.setItem("token", "Bearer " + userData.token);
      AsyncStorage.setItem("_id", userData.user._id);
      AsyncStorage.setItem("name", userData.user.name);
      dispatch(loadingActions.setLoading(false));
      dispatch(getFriendsData("Bearer " + userData.token));
      dispatch(getTransactions("Bearer " + userData.token));
      dispatch(getSplits("Bearer " + userData.token));
    }
    if (userData.status === "success") {
      dispatch(loadingActions.setLoading(false));
      setTimeout(
        () => RootNavigation.navigate("CreateProfile", { _id: user._id }),
        1
      );
    }
  };
};

export const updateUserData = (user, token) => {
  return async (dispatch) => {
    dispatch(loadingActions.setLoading(true));
    const sendRequest = async () => {
      const body = JSON.stringify(user);
      const response = await fetch(
        "https://splitbuddy-backend.onrender.com/user/updateUser",
        {
          method: "POST",
          body,
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        }
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };

    const userData = await sendRequest();

    if (userData.status === "success") {
      dispatch(accountActions.replaceAccountName(user.name));
      dispatch(loadingActions.setLoading(false));
    }
  };
};

export const logoutUser = (user) => {
  return async (dispatch) => {
    dispatch(accountActions.clearAccountData());
    console.log("dxvvcx ");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("_id");
    AsyncStorage.removeItem("name");
  };
};

export const getMoneyData = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://splitbuddy-backend.onrender.com/user/getMoneyData",
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        }
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      console.log(
        data,
        "################################################################"
      );
      return data;
    };

    const userData = await sendRequest();

    if (userData.status === "success") {
      dispatch(accountActions.replaceMoneyData(userData.user));
    }
  };
};

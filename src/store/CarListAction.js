import { carListActions } from "./CarListSlice";

export const setCarListData = (filter) => {
  return async (dispatch) => {
    dispatch(carListActions.setCarListLoading(true));
    const sendRequest = async () => {
      const response = await fetch(
        `https://carosiast-backend.onrender.com/cars?${filter}`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };

    const carListData = await sendRequest();

    dispatch(carListActions.replaceCarListData(carListData.cars));
    dispatch(carListActions.setCarListLoading(false));
  };
};

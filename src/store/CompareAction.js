import { compareActions } from "./CompareSlice";

export const getCompareData = (_id, number) => {
  return async (dispatch) => {
    dispatch(compareActions.setCompareLoading(true));
    const sendRequest = async () => {
      const response = await fetch(`http://44.202.0.125/cars/${_id}`);
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };

    const carData = await sendRequest();
    const sendVariantRequest = async () => {
      const response = await fetch(
        `http://44.202.0.125/cars/${_id}/variants/${carData.car.variants[0]._id}`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };
    const selectedVariant = await sendVariantRequest();
    if (number === 1) {
      dispatch(compareActions.replaceCarOneData(carData.car));
      dispatch(compareActions.replaceVariantOneData(selectedVariant.variant));
    } else {
      dispatch(compareActions.replaceCarTwoData(carData.car));
      dispatch(compareActions.replaceVariantTwoData(selectedVariant.variant));
    }
    dispatch(compareActions.setCompareLoading(false));
  };
};

export const getSelectedVariantData = (_id, carId, number) => {
  return async (dispatch) => {
    dispatch(compareActions.setCompareLoading(true));
    const sendVariantRequest = async () => {
      const response = await fetch(
        `http://44.202.0.125/cars/${carId}/variants/${_id}`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };
    const selectedVariant = await sendVariantRequest();
    if (number == 1) {
      dispatch(compareActions.replaceVariantOneData(selectedVariant.variant));
    } else {
      dispatch(compareActions.replaceVariantTwoData(selectedVariant.variant));
    }
    dispatch(compareActions.setCompareLoading(false));
  };
};

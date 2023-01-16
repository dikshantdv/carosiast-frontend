import { detailActions } from "./DetailSlice";

export const setDetailData = (_id, lat, lng) => {
  return async (dispatch) => {
    dispatch(detailActions.setDetailLoading(true));
    dispatch(detailActions.setShowroomLoading(true));

    const sendRequest = async () => {
      const response = await fetch(
        `https://carosiast-backend.onrender.com/cars/${_id}`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };

    const carData = await sendRequest();
    console.log(carData.car.variants[0]._id);
    const sendVariantRequest = async () => {
      const response = await fetch(
        `https://carosiast-backend.onrender.com/cars/${_id}/variants/${carData.car.variants[0]._id}`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };
    const selectedVariant = await sendVariantRequest();

    dispatch(detailActions.replaceDetailData(carData.car));
    dispatch(detailActions.setSelectedVariant(selectedVariant.variant));
    dispatch(detailActions.setDetailLoading(false));
    const sendShowroomRequest = async () => {
      const response = await fetch(
        `https://carosiast-backend.onrender.com/companies/${carData.car.company}/showrooms/within/50/center/${lat},${lng}`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };
    const showroomData = await sendShowroomRequest();
    console.log(showroomData);
    dispatch(detailActions.replaceShowroomData(showroomData.showrooms));
    dispatch(detailActions.setShowroomLoading(false));
  };
};

export const setSelectedVariantData = (_id, carId) => {
  return async (dispatch) => {
    dispatch(detailActions.setDetailLoading(true));
    const sendVariantRequest = async () => {
      const response = await fetch(
        `https://carosiast-backend.onrender.com/cars/${carId}/variants/${_id}`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };
    const selectedVariant = await sendVariantRequest();
    dispatch(detailActions.setSelectedVariant(selectedVariant.variant));
    dispatch(detailActions.setDetailLoading(false));
  };
};

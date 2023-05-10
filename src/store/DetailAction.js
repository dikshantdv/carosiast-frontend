import { detailActions } from "./DetailSlice";

export const setDetailData = (_id, lat, lng) => {
  return async (dispatch) => {
    dispatch(detailActions.setDetailLoading(true));
    dispatch(detailActions.setShowroomLoading(true));

    const sendRequest = async () => {
      const response = await fetch(`http://44.202.0.125/cars/${_id}`);
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
        `http://44.202.0.125/cars/${_id}/variants/${carData.car.variants[0]._id}`
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
        `http://44.202.0.125/companies/${carData.car.company}/showrooms/within/50/center/${lat},${lng}`
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
        `http://44.202.0.125/cars/${carId}/variants/${_id}`
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
export const setSelectedCityData = (cityName) => {
  return async (dispatch) => {
    const sendCityRequest = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=68bb7a7095aec3873d6c891c21c4fc55`
      );
      if (!response.ok) {
        return;
      }
      const data = await response.json();

      return data;
    };
    const selectedCity = await sendCityRequest();
    dispatch(detailActions.replaceCityName(cityName));
    dispatch(
      detailActions.replaceCoordinateData([
        selectedCity.coord.lat,
        selectedCity.coord.lon,
      ])
    );
  };
};

// carData with selected variant data
export const setSelectedCarAndVariantData = (_id, variantId, lat, lng) => {
  return async (dispatch) => {
    dispatch(detailActions.setDetailLoading(true));
    dispatch(detailActions.setShowroomLoading(true));

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
        `http://44.202.0.125/cars/${_id}/variants/${variantId}`
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
        `http://44.202.0.125/companies/${carData.car.company}/showrooms/within/50/center/${lat},${lng}`
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

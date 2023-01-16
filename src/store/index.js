import { configureStore } from "@reduxjs/toolkit";
import brandSlice from "./BrandSlice";
import carListSlice from "./CarListSlice";
import categorySlice from "./CategorySlice";
import compareSlice from "./CompareSlice";
import detailSlice from "./DetailSlice";
import loadingSlice from "./LoadingSlice";
import menuSlice from "./MenuSegmentSlice";

const store = configureStore({
  reducer: {
    detail: detailSlice.reducer,
    loading: loadingSlice.reducer,
    carList: carListSlice.reducer,
    brand: brandSlice.reducer,
    category: categorySlice.reducer,
    menu: menuSlice.reducer,
    compare: compareSlice.reducer,
  },
});

export default store;

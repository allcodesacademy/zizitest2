import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adsReducer from "./slices/adsSlice";
import { adsApi } from "./api/adsApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ads: adsReducer,
    [adsApi.reducerPath]: adsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adsApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

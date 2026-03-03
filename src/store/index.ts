import { configureStore } from '@reduxjs/toolkit';
import devicesReducer from './devicesSlice';
import { devicesApi } from './devicesApi';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(devicesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

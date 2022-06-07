//unsued because using RTKQ

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { llistApi } from '../services/apiRTKQ';

export const store = configureStore({
  reducer: {
    [llistApi.reducerPath]: llistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(llistApi.middleware),
});

setupListeners(store.dispatch);
import { configureStore } from '@reduxjs/toolkit';
import llistReducer from '../features/llist/llistSlice';

export const store = configureStore({
  reducer: {
    llist: llistReducer,
  },
});

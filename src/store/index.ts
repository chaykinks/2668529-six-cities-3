import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import offerReducer from './offer-slice/offer-slice';
import offersReducer from './offers-slice/offers-slice';
import userReducer from './user-slice/user-slice';

const api = createAPI();

export const store = configureStore({
  reducer: {
    OFFER: offerReducer,
    OFFERS: offersReducer,
    USER: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

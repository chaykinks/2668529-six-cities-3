import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {Offer} from '../../types/offer';
import {RequestStatus} from '../../const';

type OffersState = {
  offers: Offer[];
  favorites: Offer[];
  currentCity: string;
  offersRequestStatus: RequestStatus;
  favoritesRequestStatus: RequestStatus;
};

const initialState: OffersState = {
  offers: [],
  favorites: [],
  currentCity: 'Paris',
  offersRequestStatus: RequestStatus.Idle,
  favoritesRequestStatus: RequestStatus.Idle,
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  {extra: AxiosInstance}
>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>('/offers');
    return data;
  }
);

export const fetchFavorites = createAsyncThunk<
  Offer[],
  undefined,
  {extra: AxiosInstance}
>(
  'offers/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>('/favorite');
    return data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.offersRequestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersRequestStatus = RequestStatus.Success;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.offersRequestStatus = RequestStatus.Failed;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.favoritesRequestStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesRequestStatus = RequestStatus.Success;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.favoritesRequestStatus = RequestStatus.Failed;
      });
  }
});

export const {changeCity} = offersSlice.actions;
export default offersSlice.reducer;

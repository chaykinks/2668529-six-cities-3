import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {Offer} from '../../types/offer';
import {RootState} from '../index';

type OffersState = {
  offers: Offer[];
  currentCity: string;
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  offers: [],
  currentCity: 'Paris',
  isOffersLoading: false,
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  {extra: AxiosInstance; state: RootState}
>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>('/offers');
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
        state.isOffersLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersLoading = false;
      });
  }
});

export const {changeCity} = offersSlice.actions;
export default offersSlice.reducer;

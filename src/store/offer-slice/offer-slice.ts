import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {FullOffer, Offer} from '../../types/offer';
import {Review} from '../../types/review';
import {AxiosInstance} from 'axios';
import {RootState} from '../index';

type OfferState = {
  currentOffer: FullOffer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isCurrentOfferLoading: boolean;
  isNearbyOffersLoading: boolean;
  isReviewsLoading: boolean;
  isReviewSending: boolean;
  hasError: boolean;
};

const initialState: OfferState = {
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  isCurrentOfferLoading: false,
  isNearbyOffersLoading: false,
  isReviewsLoading: false,
  isReviewSending: false,
  hasError: false,
};

type ReviewData = {
  offerId: string;
  comment: string;
  rating: number;
};

export const fetchCurrentOffer = createAsyncThunk<
  FullOffer,
  string,
  {extra: AxiosInstance; state: RootState}
>(
  'offer/fetchCurrentOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<FullOffer>(`/offers/${id}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  {extra: AxiosInstance}
>(
  'offer/fetchNearbyOffers',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`/offers/${id}/nearby`);
    return data;
  }
);

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  {extra: AxiosInstance}
>(
  'offer/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`/comments/${id}`);
    return data;
  }
);

export const sendReview = createAsyncThunk<
  void,
  ReviewData,
  {extra: AxiosInstance; state: RootState}
>(
  'offer/sendReview',
  async ({offerId, comment, rating}, {extra: api, dispatch}) => {
    await api.post(`/comments/${offerId}`, {comment, rating,});
    await dispatch(fetchReviews(offerId));
  }
);

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentOffer.pending, (state) => {
        state.isCurrentOfferLoading = true;
        state.currentOffer = null;
      })
      .addCase(fetchCurrentOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchCurrentOffer.rejected, (state) => {
        state.isCurrentOfferLoading = false;
        state.hasError = true;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isNearbyOffersLoading = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isReviewsLoading = false;
      })
      .addCase(sendReview.pending, (state) => {
        state.isReviewSending = true;
      })
      .addCase(sendReview.fulfilled, (state) => {
        state.isReviewSending = false;
      })
      .addCase(sendReview.rejected, (state) => {
        state.isReviewSending = false;
      });
  }
});

export default offerSlice.reducer;

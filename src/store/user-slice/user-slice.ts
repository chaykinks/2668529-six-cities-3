import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AuthorizationStatus} from '../../const';
import {saveToken, dropToken} from '../../services/token';

type UserState = {
  authorizationStatus: AuthorizationStatus;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

type AuthData = {
  email: string;
  password: string;
};

type AuthInfo = {
  token: string;
  email: string;
  avatarUrl: string;
  isPro: boolean;
  name: string;
};

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {extra: AxiosInstance}
>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get('/login');
  }
);

export const login = createAsyncThunk<
  void,
  AuthData,
  {extra: AxiosInstance}
>(
  'user/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<AuthInfo>('/login', {email, password});
    saveToken(data.token);
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  {extra: AxiosInstance}
>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete('/logout');
    dropToken();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export default userSlice.reducer;

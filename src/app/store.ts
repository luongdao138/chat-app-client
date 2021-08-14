import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import channelSlice from '../features/channel/channelSlice';
import channelDetailSlice from '../features/channelDetail/channelDetailSlice';
import counterReducer from '../features/counter/counterSlice';
import messageSlice from '../features/message/messageSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    channel: channelSlice,
    channelDetail: channelDetailSlice,
    message: messageSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

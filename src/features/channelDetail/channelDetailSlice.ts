import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChannelDetail, SliceType } from './interface';

const initialState: SliceType = {
  detail: {} as ChannelDetail,
};

const channelDetailSlice = createSlice({
  name: 'channel_detail',
  initialState,
  reducers: {
    fetch: (state, { payload }: PayloadAction<ChannelDetail>) => {
      state.detail = payload;
    },
    join: (state, { payload }: PayloadAction<any>) => {
      state.detail.members = payload;
    },
  },
  extraReducers: {},
});

export const { fetch, join } = channelDetailSlice.actions;
export default channelDetailSlice.reducer;

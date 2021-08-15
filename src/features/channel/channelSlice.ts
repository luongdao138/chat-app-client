import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getChannels } from './action';
import { Channel, SliceType } from './interface';

const initialState: SliceType = {
  list: [],
  error: null,
  loading: false,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<Channel>) => {
      state.list.push(payload);
    },
    search: (state, { payload }: PayloadAction<Channel[]>) => {
      state.list = payload;
    },
  },
  extraReducers: {
    [getChannels.pending.type]: (state) => {
      state.loading = true;
    },
    [getChannels.fulfilled.type]: (
      state,
      { payload }: PayloadAction<Channel[]>
    ) => {
      state.loading = false;
      state.list = payload;
    },
    [getChannels.rejected.type]: (state) => {
      state.loading = false;
      state.error = 'Error';
    },
  },
});

export const { add, search } = channelSlice.actions;
export default channelSlice.reducer;

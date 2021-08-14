import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message, SliceType } from './interface';

const initialState: SliceType = {
  list: [],
};
const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchAll: (state, { payload }: PayloadAction<Message[]>) => {
      state.list = payload;
    },
    add: (state, { payload }: PayloadAction<Message>) => {
      state.list.push(payload);
    },
  },
  extraReducers: {},
});

export const { fetchAll, add } = messageSlice.actions;
export default messageSlice.reducer;

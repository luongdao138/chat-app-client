import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
export const getChannels = createAsyncThunk('channels/fetch', async () => {
  try {
    const res = await axiosClient().get('/channels');
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

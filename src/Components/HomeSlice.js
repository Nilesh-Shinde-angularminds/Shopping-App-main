import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    dataFromApi: [],
    count: 0,
  },

  reducers: {
    setDataFromApi: (state, action) => {
      state.dataFromApi = action.payload;
    },

      setCount: (state, action) => {
        state.count= action.payload
    }
  },
});


export const getAllProducts = () => async (dispatch, getState) => {
  const res = await axios.get(
    `http://interviewapi.ngminds.com/api/getAllProducts`
  );
  console.log(res.data.products)
  dispatch(setDataFromApi(res.data.products));
};

export const { setDataFromApi, setCount } = homeSlice.actions;
export default homeSlice.reducer
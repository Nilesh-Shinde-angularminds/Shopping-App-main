import { createSlice } from "@reduxjs/toolkit";

export const Cartslice = createSlice({
  name: "cart",
  initialState: {
    localStorageData: JSON.parse(localStorage.getItem("mainObj"))
      ? JSON.parse(localStorage.getItem("mainObj"))
      : [],
  },
  reducers: {
    setlocalStorageData:(state , action)=>{state.localStorageData = action.payload},
  },
});

export const {setlocalStorageData} = Cartslice.actions
export default Cartslice.reducer
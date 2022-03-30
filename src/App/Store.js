import { configureStore } from "@reduxjs/toolkit";
import HomeSlice, { homeSlice } from "../Components/HomeSlice";
import PaginationSlice from "../Components/PaginationSlice";
import CartSlice from "../Components/CartSlice";
export default configureStore({
    reducer: {
        HomeData: HomeSlice,
        PaginationData: PaginationSlice,
        CartData:CartSlice,
    }
})
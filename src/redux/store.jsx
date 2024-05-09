import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slicers/dataSlice";
import chartSlice from "./slicers/chartSlice";

const store=configureStore({
    reducer:{
        data:dataSlice,
        chart:chartSlice
    }
})

export default store
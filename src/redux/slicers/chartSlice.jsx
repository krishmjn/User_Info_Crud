import { createSlice } from "@reduxjs/toolkit";

const chartSlice=createSlice({
    name:"chart",
    initialState:[],
    reducers:{
        addDataChart(state,action){
                state.push(action.payload)
        }
    }
})

export const {addDataChart} =chartSlice.actions

export default chartSlice.reducer
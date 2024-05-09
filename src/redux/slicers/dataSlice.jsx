import { createSlice } from "@reduxjs/toolkit";


const dataSlice=createSlice({
    name:"data",
    initialState:[],
    reducers:{
        addData(state,action){
            state.push(action.payload)
        },
        removeData(state,action){
            state.splice(action.payload,1)
        },
        updateData(state,action){
            return state.map((data)=>{
                if(data.id===action.payload.id){
                    return action.payload
                }else{
                    return data
                }
            })
        }
    }
})


export const{addData,removeData,updateData} =dataSlice.actions
export default dataSlice.reducer 
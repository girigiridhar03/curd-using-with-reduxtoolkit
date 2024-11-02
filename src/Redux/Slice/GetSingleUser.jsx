import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getsingleUser = createAsyncThunk('getuser',async(id,{rejectWithValue})=>{
    
    try {

        const response = await fetch(`http://localhost:8080/users/${id}`,{
            method:'GET'
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error("Network call is not ok")
        }

        return data
        
    } catch (error) {
        return rejectWithValue(error.message)
    }

})



const initialState = {
    isLoading: false,
    isError : null,
    singleData : null
}


 const GetSingleUser = createSlice({
    name : 'getSingleUser',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getsingleUser.pending,(state)=>{
            state.isLoading = true;
           state.isError = null;
        })
        .addCase(getsingleUser.fulfilled,(state,action)=>{
             state.isLoading = false;
             state.singleData = action.payload;
        })
        .addCase(getsingleUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = action.payload
        })
    }
})


export default GetSingleUser.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"



export const deleteUser = createAsyncThunk('deluser',async(id,{rejectWithValue})=>{
     try {
        const response = await fetch(`http://localhost:8080/users/${id}`,{
            method:'DELETE'
        });
        const data = await response.json();

         if(!response.ok){
            throw new Error("Network call is not ok")
         }

         return data
     }
     catch (error) {
        return rejectWithValue(error.message)
     }
})


const initialState = {
    isLoading: false,
    isError : null,
    userData : [],
}

const deleteUserSlice = createSlice({
    name:'deleteuser',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(deleteUser.pending,(state)=>{
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteUser.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.userData.filter((user)=>user.id !== action.payload)
      })
      .addCase(deleteUser.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = action.payload
      })
    }
})

export default deleteUserSlice.reducer
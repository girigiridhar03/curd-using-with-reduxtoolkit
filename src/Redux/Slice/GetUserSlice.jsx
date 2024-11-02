import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchUsers = createAsyncThunk('getUsersList',async(_,{ rejectWithValue })=>{
    try {
        
        const response = await fetch('http://localhost:8080/users');
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
    isLoading:false,
    isError:null,
    getUsers:[],
}

const getUsers = createSlice({
    name:'getUser',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
           state.isLoading = true;
           state.isError = null;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
             state.isLoading = false;
             state.getUsers = action.payload;
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
             state.isLoading = false;
             state.isError = action.payload;
        })
    }
})


export default getUsers.reducer
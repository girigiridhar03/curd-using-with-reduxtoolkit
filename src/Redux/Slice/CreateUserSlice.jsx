import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import React from 'react'



export const postUserData = createAsyncThunk('postData',async(formData,{ rejectWithValue })=>{
      try {

        const response = await fetch('http://localhost:8080/users',{
            method:'POST',
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error('Network call is not ok')
        }

        return data;
        
      } catch (error) {
        return rejectWithValue(error.message);
      }
})

const initialState = {
    isLoading:false,
    isError:null,
    userData : []
}

const CreateUserSlice = createSlice({
    name:'createuser',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(postUserData.pending,(state)=>{
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(postUserData.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.userData.push(action.payload)
      })
      .addCase(postUserData.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = action.payload;
      })
    }
})


export default CreateUserSlice.reducer
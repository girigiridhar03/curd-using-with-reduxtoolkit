import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const editSingleUser = createAsyncThunk('editsingleuser',async({id,formData},{rejectWithValue})=>{

      console.log(id)
      try {

        const response = await fetch(`http://localhost:8080/users/${id}`,{
            method:'PATCH',
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error('Failed to Update User')
        }

        return data;
        
      } catch (error) {
        return rejectWithValue(error.message)
      }
})

const initialState = {
    isLoading : false,
    isError : null,
    editUser : null
}


const EditUserSlice = createSlice({
    name:'editUser',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(editSingleUser.pending,(state)=>{
        state.isLoading = true;
       })
       .addCase(editSingleUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.editUser = action.payload;
       })
       .addCase(editSingleUser.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = action.payload
       })
    }
})


export default EditUserSlice.reducer
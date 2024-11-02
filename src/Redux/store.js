import { configureStore } from "@reduxjs/toolkit";
import CreateUserReducer from './Slice/CreateUserSlice';
import GetUserReducer from './Slice/GetUserSlice';
import DeleteUserReducer from './Slice/DeleteUserSlice';
import GetSingleUserReducer from './Slice/GetSingleUser';
import EditSingleUserReducer from './Slice/EditUserSlice'

const store = configureStore({
    reducer:{
        createuser : CreateUserReducer,
        getUsers : GetUserReducer,
        deleteuser : DeleteUserReducer,
        getSingleUser : GetSingleUserReducer,
        editUser: EditSingleUserReducer
    }
})

export default store;
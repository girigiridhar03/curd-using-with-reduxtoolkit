import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../MainLayout/Layout'
import CreateUser from '../Components/CreateUser/CreateUser'
import UserList from '../Components/UsersList/UserList'
import EditUser from '../Components/EditUser/EditUser'

const AllRoutes = () => {
  return (
   <Routes>
      <Route element={<Layout />}>
         <Route path='/' element={<CreateUser />} />
         <Route path='/users' element={<UserList />} />
         <Route path='/edit/:id' element={<EditUser />} />
      </Route>
   </Routes>
  )
}

export default AllRoutes
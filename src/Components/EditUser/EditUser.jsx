import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getsingleUser } from '../../Redux/Slice/GetSingleUser';
import {editSingleUser} from '../../Redux/Slice/EditUserSlice';

const EditUser = () => {

    const {id} = useParams();
    const disptach = useDispatch();
    const {singleData,isLoading,isError} = useSelector((state)=>state.getSingleUser);
    const {editUser,isLoading:editLoading,isError:editError} = useSelector(state=>state.editUser)
    
    const [formData,setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      roll: '',
    });
    const [popBox,setPopBox] = useState(false);
    const navigate = useNavigate()

    useEffect(()=>{
       disptach(getsingleUser(id))
    },[disptach,id])
  
    useEffect(()=>{
       if(singleData){
        setFormData(singleData)
       }
    },[singleData])

    useEffect(()=>{

      if(editUser){
        setPopBox(true)
      }

    },[editUser])

    const handleOnChange = (e)=>{
       const {name,value} = e.target;

       setFormData((prev)=>(
         {
          ...prev,[name]:value
         }
       ))
    }


  
   
    const handleOnSumbit = (e)=>{
      e.preventDefault();

      disptach(editSingleUser({id,formData}));
    
    }

    const handleGoBack = ()=>{
       navigate('/users')
    }

    
  return (
    <div className="w-full h-[70vh] flex items-center justify-center flex-col gap-5 relative">
    
    {/* Pop Box */}

    {
      popBox && <div className="fixed w-[100%] h-[100vh] bg-[rgb(0,0,0,0.6)] flex items-center justify-center">
      <div className="w-[15%] bg-[#23376C] py-5 px-8 flex  flex-col gap-5 rounded-lg">
         <h1 className='text-center font-bold text-2xl'>Form Updated</h1>
        <button
        onClick={handleGoBack}
          className="bg-[#0F172A] w-auto mx-auto py-1 px-5 uppercase font-medium rounded-lg tracking-widest text-[14px] cursor-pointer"
        >
          GO BACK
        </button>
      </div>
    </div>
    }


    <h1 className="text-3xl font-semibold">Update Employee Details</h1>
    {
      singleData &&  <form
      onSubmit={handleOnSumbit}
      className="bg-[#3251a08e] w-[30%] flex flex-col py-5 px-6 rounded-xl gap-4"
    >
      <label htmlFor="name" className="text-lg font-medium">
        Employee Name:
      </label>
      <input
        className="bg-transparent border-2 border-[rgb(0,0,0,0.5)] py-2 px-4 rounded-xl outline-none"
        type="text"
        placeholder="John"
        name="name"
        value={formData?.name}
        onChange={handleOnChange}
        
      />
      <label htmlFor="phone" className="text-lg font-medium">
        Phone Number:
      </label>
      <input
        className="bg-transparent border-2 border-[rgb(0,0,0,0.5)] py-2 px-4 rounded-xl outline-none"
        type="tel"
        placeholder="+91 9876543210"
        name="phone"
        value={formData?.phone}
        onChange={handleOnChange}
       
      />
      <label htmlFor="email" className="text-lg font-medium">
        Email:
      </label>
      <input
        className="bg-transparent border-2 border-[rgb(0,0,0,0.5)] py-2 px-4 rounded-xl outline-none"
        type="email"
        placeholder="john@gmail.com"
        name="email"
        value={formData?.email}
        onChange={handleOnChange}
       
      />
      <label htmlFor="roll" className="text-lg font-medium">
        Employee Roll:
      </label>
      <input
        className="bg-transparent border-2 border-[rgb(0,0,0,0.5)] py-2 px-4 rounded-xl outline-none"
        type="text"
        placeholder="Frontend"
        name="roll"
        value={formData?.roll}
        onChange={handleOnChange}
      
      />
      <input
        type="submit"
        value="Update"
        className="inline-block mx-auto py-2 px-7  bg-[#0F172A] rounded-lg cursor-pointer font-semibol uppercase"
      />
    </form>
    }
  </div>
  )
}

export default EditUser
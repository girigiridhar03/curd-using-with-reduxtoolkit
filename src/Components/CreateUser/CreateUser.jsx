import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postUserData } from "../../Redux/Slice/CreateUserSlice";
import { useNavigate } from "react-router-dom";



const CreateUser = () => {
 const disptach = useDispatch();
  let init = {
    name: "",
    phone: "",
    email: "",
    roll: "",
  }
  const [formData, setFormData] = useState(init);
  const navigate = useNavigate();


  const handleOnChange = (e) => {
    let { name, value } = e.target;

    setFormData((prev)=>(
      {
        ...prev,[name]:value
      }
    ))
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    disptach(postUserData(formData));
    navigate('/users')
    setFormData(init)
  };

  return (
    <div className="w-full h-[70vh] flex items-center justify-center flex-col gap-5">
      <h1 className="text-3xl font-semibold">Employee Details</h1>
      <form
        onSubmit={handleSubmit}
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
          value={formData.name}
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
          value={formData.phone}
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
          value={formData.email}
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
          value={formData.roll}
          onChange={handleOnChange}
        />
        <input
          type="submit"
          value="Submit"
          className="inline-block mx-auto py-2 px-7  bg-[#0F172A] rounded-lg cursor-pointer font-semibol uppercase"
        />
      </form>
    </div>
  );
};

export default CreateUser;

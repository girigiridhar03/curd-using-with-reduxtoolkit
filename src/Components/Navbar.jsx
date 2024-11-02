import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchUsers } from "../Redux/Slice/GetUserSlice";

const Navbar = () => {
  const { getUsers, isLoading, isError } = useSelector(
    (state) => state.getUsers
  );
  const disptach = useDispatch();

  const [username, setusername] = useState("");
  const [name,setName] = useState('')

  useEffect(() => {
    disptach(fetchUsers());
  }, [disptach]);

  const handleOnChange = (e) => {
   setName(e.target.value)
    setusername(
      getUsers.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  return (
    <div className="bg-[#3251a08e] w-full flex items-center justify-between py-5 px-6 max-w-[1600px] mx-auto mt-3 rounded-2xl backdrop-blur-lg relative">
      <div>
        <h1 className="text-2xl font-medium cursor-pointer">USERS LIST</h1>
      </div>
      <div className="flex items-center gap-10">
        <NavLink to={"/"} className={"relative"}>
          <div className="uppercase font-medium cursor-pointer ">
            Create users
          </div>
        </NavLink>

        <NavLink to={"/users"} className={"relative"}>
          <div className="uppercase font-medium cursor-pointer">Users</div>
        </NavLink>
        <div>
          <input
            className="bg-transparent border-2 border-[rgb(0,0,0,0.5)] py-2 px-4 rounded-xl outline-none"
            type="text"
            placeholder="Search User..."
            name="name"
            value={name}
            onChange={handleOnChange}
          />
        </div>
      </div>

      {/* userlist box */}
      {name && (
        <div className="bg-[#3251a08e] absolute w-[25%] h-[300px] right-0 top-24 rounded-lg py-3 px-3 overflow-y-auto scroll-thin">
          <h2 className="text-lg border-b-2 inline-block font-bold">
            User List
          </h2>
          <div className="flex flex-col gap-3 mt-2">
            {username.length >0 ? (
              username.map((item, index) => (
                <div key={item.id} className="flex items-center gap-1">
                  <div>{index + 1}.</div>
                  <div>{item.name}</div>
                </div>
              ))
            ) : (
              <h1 className="text-center">Not Found User !</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux/Slice/GetUserSlice";
import { deleteUser } from "../../Redux/Slice/DeleteUserSlice";
import { getsingleUser } from "../../Redux/Slice/GetSingleUser";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { getUsers, isLoading, isError } = useSelector(
    (state) => state.getUsers
  );

  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteuser
  );

  const {
    isLoading: singleUserLoading,
    isError: singleUserError,
    singleData,
  } = useSelector((state) => state.getSingleUser);

  const disptach = useDispatch();
  const [popBox, setPopBox] = useState(false);
  const [page,setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    disptach(fetchUsers());
  }, [disptach]);

  useEffect(() => {
    if (!deleteError && !deleteLoading) {
      disptach(fetchUsers());
    }
  }, [deleteError, deleteLoading, disptach]);





  const handleOnClick = (id) => {
    disptach(deleteUser(id));
  };



  const handleView = (id) => {
    disptach(getsingleUser(id));

  setPopBox(true)
  
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="w-full - h-[80vh] flex items-center justify-center relative">
      {/* Pop Model */}

      {popBox && (
        <div className="fixed z-50 w-[100%] h-[100vh] bg-[rgb(0,0,0,0.6)] flex items-center justify-center">
          <div className="w-[25%] bg-[#23376C] py-5 px-8 flex  flex-col gap-5 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="font-bold text-lg">Name:</div>
              <div className="capitalize">{singleData?.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-bold text-lg">Email:</div>
              <div className="capitalize">{singleData?.email}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-bold text-lg">Phone:</div>
              <div className="capitalize">{singleData?.phone}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-bold text-lg">Roll:</div>
              <div className="capitalize">{singleData?.roll}</div>
            </div>
            <button
              onClick={() => setPopBox(false)}
              className="bg-[#0F172A] w-auto mx-auto py-1 px-5 uppercase font-medium rounded-lg tracking-widest text-[14px] cursor-pointer"
            >
              close
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#23376C] w-[85%] h-[90%] rounded-xl py-9 pl-20 relative">
        <table className="w-[100%]">
          <thead>
            <tr>
              <th className="text-center">S.No</th>
              <th className="text-center">Employee Name</th>
              <th className="text-center">Phone Number</th>
              <th className="text-center">Email</th>
              <th className="text-center">Roll</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getUsers.length > 0 &&
              getUsers.slice((page - 1) * 10, page * 10).map((user, index) => (
                <tr key={user.id}>
                  <td className="text-center pt-6">{index + 1}.</td>
                  <td className="text-center pt-6">{user.name}</td>
                  <td className="text-center pt-6">{user.phone}</td>
                  <td className="text-center pt-6">
                    {user.email.length > 12
                      ? `${user.email.substring(0, 13)}...`
                      : user.email}
                  </td>
                  <td className="text-center pt-6">{user.roll}</td>
                  <td className="flex items-center gap-5 justify-center pt-6">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-green-400 py-1 rounded-lg cursor-pointer px-3"
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 py-1 rounded-lg cursor-pointer px-3"
                      onClick={() => handleOnClick(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleView(user.id)}
                      className="bg-blue-400 py-1 rounded-lg cursor-pointer px-3"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="mt-5 flex items-center justify-center w-full fixed bottom-40 left-0 gap-3">
        {getUsers.length > 0 &&
            [...Array(Math.ceil(getUsers.length / 10))].map((_, index) => (
              <div
                key={index}
                onClick={() => setPage(index + 1)}
                className={`border w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer ${
                  page === index + 1 ? "bg-[#0F172A] text-white" : ""
                }`}
              >
                {index + 1}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;

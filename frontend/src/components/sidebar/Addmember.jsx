import React, { useState, useRef } from "react";
import { MdGroupAdd } from "react-icons/md";
import useLogout from "../../hooks/useLogout";
import useGetUser from "../../hooks/useGetUser";
import { IoSearchSharp } from "react-icons/io5";
import CreateGroup from "./CreateGroup";
import toast from "react-hot-toast";
import { useCreateGroup } from "../../hooks/useCreateGroup";


export default function Addmember() {
  const { logout } = useLogout();
  const { user } = useGetUser();
  const [dropdownVisibility, setDropdownvisibility] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [ShowCreateGroup, setShowCreategoup] = useState(false)

  const [groupInformation, setgroupInformation] = useState({
    groupName: "",
    groupDescription: 'This is group Chat',
    groupImage: "",
    groupMembers: []
  })

  const handleDropdown = () => {
    if (!dropdownVisibility) {
      setDropdownvisibility(true);
    }
  };

  const handleItemClick = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected && prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      }
      else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleNext = () => {
    if (selectedUsers.length == 0) {
      toast.error("Please select atleast one user!")
    }
    else {
      setDropdownvisibility(false);
      setShowCreategoup(true)
      console.log(selectedUsers);
    }
  };

  const handleCancle = () => {
    setDropdownvisibility(false);
    setSelectedUsers([])
  };

  const handleCreate = async (groupInfo) => {
    setDropdownvisibility(false);
    const updatedGroupInfo = {
      ...groupInfo,
      groupImage: groupInfo.groupImage || groupInformation.groupImage,
      groupDescription: groupInfo.groupDescription || groupInformation.groupDescription,
    };
    updatedGroupInfo.groupMembers = selectedUsers;
    useCreateGroup(updatedGroupInfo);
    setShowCreategoup(false);
  };

  const handleSearch = () => {

  };

  return (
    <div>
      <div className={`dropdown ${dropdownVisibility ? 'dropdown-open' : ''}`} >
        <div className="btn btn-sm btn-ghost" onClick={handleDropdown}><div>
          <MdGroupAdd className="w-6 h-6 text-white cursor-pointer" />
        </div>
        </div>
        {dropdownVisibility && (
          <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-75 p-1 m-3 shadow"> 
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 py-2 px-1"
          > <input
                type="text"
                placeholder="Search…"
                className="input input-bordered rounded-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-circle bg-sky-500 text-white"
              >
                <IoSearchSharp className="w-6 h-6 outline-none" />
              </button>
            </form>
            <h1 className="font-bold text-l ml-5">Add person to Group</h1>
            <div style={{maxHeight:"250px"}} className="overflow-auto">
            {user &&
              user.map((user) => {
                return (
                  <li key={user._id}>
                    <div
                      onClick={() => {
                        handleItemClick(user._id);
                      }}
                    > <div>
                        <img
                          src={user.profilePic}
                          alt="user avatar"
                          className="w-8 8-7"
                        />
                      </div>
                      <div>
                        <h2 className="text-md font-bold pl-1">
                          {user.fullName}
                        </h2>
                      </div>
                      <div>
                        <input
                          className="w-4 h-4"
                          type="checkbox"
                          name="person"
                          id="person"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
            <div className="m-1">
              <button
                className="btn btn-sm bg-sky-500 text-black px-5 mr-1.5 ml-2" style={{ width: "45%" }}
                onClick={handleNext}
              >Next</button>
              <button
                className="btn btn-sm bg-sky-500 text-black px-5"
                onClick={handleCancle} style={{ width: "45%" }}
              >Cancle</button>
            </div>
          </ul>
        )}
        {ShowCreateGroup && (<CreateGroup handleCancle={() => {
          setShowCreategoup(false)
          setDropdownvisibility(true)
        }} handleCreate={handleCreate} ShowCreateGroup setShowCreategoup />)}
      </div>
    </div>
  );
}

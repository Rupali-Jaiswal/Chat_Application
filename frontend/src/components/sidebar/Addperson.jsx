import React, { useState } from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import useLogout from "../../hooks/useLogout";
import useGetUser from "../../hooks/useGetUser";
import useAddFriend from "../../hooks/useAddFriend";
import { set } from "mongoose";

export default function Addperson() {
  const { logout } = useLogout();
  const { user, loading } = useGetUser();
  const [dropdownVisibility, setDropdownvisibility] = useState(false);
  const [searchValue, setSearchValue] = useState("")

  const handleDropdown = () => {
    setDropdownvisibility(!dropdownVisibility)
    setSearchValue("")
  }

  const handleAddPerson=()=>{
    const success= useAddFriend()
    if (success){
      setDropdownvisibility(false)
    }
    setSearchValue("")
  }

  return (
    <div>
      {!loading ? (
        <div>
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost" onClick={handleDropdown}>
              <div>
                <MdOutlinePersonAddAlt className="w-6 h-6 text-white cursor-pointer" />
              </div>
            </div>
            {dropdownVisibility && (
              <ul tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-70  shadow">
                <form className="px-1 mt-2">
                  <span className="font-bold text-l ml-1 mb-1">Enter Username or fullname</span>
                  <input type="text" name="friendName" id="friendName" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Type here" className="input input-bordered rounded-full" />
                  <div className="flex mt-5 mb-1">
                    <button type="button" className="basis-1/2 btn btn-sm bg-sky-500 text-black" onClick={handleAddPerson}>Add Person</button>
                    <button type="button" className="basis-1/2 btn btn-sm bg-sky-500 text-black " onClick={handleDropdown} >Cancle</button>
                  </div>
                </form>
              </ul>
            )}
          </div>
        </div>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}

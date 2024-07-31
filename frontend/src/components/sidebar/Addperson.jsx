import React, { useState } from "react";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import useLogout from "../../hooks/useLogout";
import useGetUser from "../../hooks/useGetUser";
export default function Addperson() {
  const { logout } = useLogout();
  const { user, loading } = useGetUser();
  const [dropdownVisibility, setDropdownvisibility] = useState(false);
  const handleDropdown=()=>{
    setDropdownvisibility(!dropdownVisibility)
  }
  const handleItemClick = () => {
    setDropdownvisibility(!dropdownVisibility)
  };
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
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-60 p-2 shadow"
              >
               
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

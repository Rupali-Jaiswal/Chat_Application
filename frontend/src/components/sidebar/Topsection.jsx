import React from "react";
import Logout from "./LogoutButton";
import Addperson from "./Addperson";
import Addmember from "./Addmember";
export default function topsection() {
  return (
    <div>
      <div className="flex justify-between mt-2">
       <div><Logout  /></div>
       <div className="flex justify-between">
       <div className=""><Addperson /></div>
       <div className=""><Addmember/></div>
       </div>
      </div>
    </div>
  );
}

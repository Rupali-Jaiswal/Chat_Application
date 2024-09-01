import { useState } from "react";
import Conversations from "./Conversations";
import GroupChats from "./GroupChats";
import SearchInput from "./SearchInput";
import Topsection from "./Topsection";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";


const Sidebar = () => {
	const [isChatsActive, setIsChatsActive] = useState(true);
	const [isGroupChatsActive, setIsGroupChatsActive] = useState(false);
	const handleTabClick = (tab) => {
		if (tab === "chats") {
			setIsChatsActive(true);
			setIsGroupChatsActive(false);
		} else {
			setIsChatsActive(false);
			setIsGroupChatsActive(true);
		}
	};

	return (
		<div>
			<div className=' border-r border-slate-500 p-4 flex flex-col' style={{height:"100%", width:"100%"}}>
				<Topsection />
				<SearchInput />
				<div className="flex flex-row">
					<span className={`basis-1/2  flex justify-center items-center py-2 cursor-pointer text-white  ${isChatsActive ? 'border-b-4 border-sky-500' : ''}`} onClick={() => handleTabClick("chats")}
						role="tab"
						aria-label="Chats" >< BsFillChatSquareTextFill className="w-5 h-5" />
					</span>
					<span className={`basis-1/2  flex justify-center items-center py-2 cursor-pointer text-white ${isGroupChatsActive ? 'border-b-4 border-sky-500' : ''}`} onClick={() => handleTabClick("groupChats")}
						role="tab"
						aria-label="Chats"><MdGroups2 className="w-6 h-6" /></span>
				</div>
				<div className='divider my-0 py-0 h-1' />
				{isChatsActive && (<Conversations />)}
				{isGroupChatsActive && (<GroupChats />)}
			</div>
		</div>
	);
};
export default Sidebar;




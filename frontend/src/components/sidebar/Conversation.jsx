import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { MdDelete } from "react-icons/md";
import useGroupConv from "../../zustand/useGroupConv";

const Conversation = ({ conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
    const { selectedGroup, setSelectedGroup } = useGroupConv()

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded py-1.5 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`} onClick={() => {setSelectedConversation(conversation)
				setSelectedGroup(null)
			}}
			><div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-10 rounded-full'>
						<img src={conversation.profilePic}  />
					</div>
				</div>
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'><MdDelete/></span>
					</div>
				</div>
			</div>
			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;


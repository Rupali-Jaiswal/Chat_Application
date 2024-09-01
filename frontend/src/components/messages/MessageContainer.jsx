import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import useGroupConv from "../../zustand/useGroupConv";
import Groupmessages from "./Groupmessages";
import GroupmsgInput from "./GroupmsgInput";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { selectedGroup, setSelectedGroup } = useGroupConv()

	useEffect(() => {
		return () => {
			setSelectedGroup(null)
			setSelectedConversation(null)
		};
	}, [setSelectedConversation, setSelectedGroup]);

	return (
		<div className='md:min-w-[450px] flex flex-col mt-2'>
			{(!selectedConversation && !selectedGroup) ? (
				<NoChatSelected />
			) : (
				<>
					{selectedConversation && <><div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
						<Messages />
						<MessageInput /></>}
					{selectedGroup && <><div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='text-gray-900 font-bold'>{selectedGroup.groupName}</span>
					</div>
						<Groupmessages/>
						<GroupmsgInput /></>}
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};


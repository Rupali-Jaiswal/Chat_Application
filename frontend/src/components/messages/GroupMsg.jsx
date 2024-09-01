import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useGroupConv from "../../zustand/useGroupConv";

const GroupMsg = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedGroup } =useGroupConv();
	const fromMe = message.sender === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = selectedGroup.groupImage
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	// const shakeClass = message.shouldShake ? "shake" : "";
	return (
		<div className={`chat ${chatClassName}`} >
			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default GroupMsg

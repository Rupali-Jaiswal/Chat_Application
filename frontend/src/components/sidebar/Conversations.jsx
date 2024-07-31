import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();
    return (
        <div className="overflow-auto">
                {conversations.map((conversation, idx) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        lastIdx={idx === conversations.length - 1}
                    />
                ))}
                {loading && (
                    <div className='flex justify-center p-2'>
                        <span className='loading loading-spinner'></span>
                    </div>
                )}
        </div>
    );
};

export default Conversations;
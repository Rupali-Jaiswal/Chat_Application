import React from 'react'
import useGroupConv from '../../zustand/useGroupConv'
import { MdDelete } from "react-icons/md";
import useConversation from '../../zustand/useConversation';

export default function GroupChat(props) {
    const group=props.group
    const { setSelectedGroup } = useGroupConv()
	const { setSelectedConversation } = useConversation();
    

    return (
        <div onClick={()=>{setSelectedGroup(group) 
        setSelectedConversation(null)}}>
            <div className='flex flex-row hover:bg-sky-500 rounded px-2 py-2 cursor-pointer' >
                <img src={group.groupImage} alt="" className='rounded-full w-10 h-10' />
                <div className='flex flex-col flex-1 pt-1 ml-2'>
                    <div className='flex gap-3 justify-between items-center'>
                        <h2 className='font-bold text-gray-200'>{group.groupName}</h2>
                        <span className='text-xl'><MdDelete /></span>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1' />
        </div>
    )
}

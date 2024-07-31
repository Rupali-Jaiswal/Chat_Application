import React from 'react'
import { useGetGroups } from '../../hooks/useGetGroups'
import { MdDelete } from "react-icons/md";
// import './styles.css'; // Import the CSS file for the custom scrollbar

export default function GroupChats() {
  const { groups, error } = useGetGroups()
  if (error) {
    return <h2>Error: {error.message}</h2>
  }

  return (
      <div className='overflow-auto'>
        {groups && groups.map((group) => (
          <div key={group._id} className=' ' >
            <div className='flex flex-row hover:bg-sky-500 rounded p-2 py-2 cursor-pointer'>
              <img src={group.groupImage} alt="" className='rounded-full w-10 h-10 ml-1' />
              <div className='flex flex-col flex-1 pt-1 ml-2'>
                <div className='flex gap-3 justify-between items-center'>
                  <h2 className='font-bold text-gray-200'>{group.groupName}</h2>
                  <span className='text-xl'><MdDelete /></span>
                </div>
              </div>
            </div>
            <div className='divider my-0 py-0 h-1' />
          </div>
        ))
        }
      </div>
  )
}

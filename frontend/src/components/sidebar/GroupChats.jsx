import React from 'react'
import { useGetGroups } from '../../hooks/useGetGroups'
import GroupChat from './GroupChat';

export default function GroupChats() {
  const { groups, error } = useGetGroups()
  if (error) {
    return <h2>Error: {error.message}</h2>
  }
	
  return (
      <div className='overflow-auto'>
        {groups && groups.map((group) => (
          <GroupChat key={group._id} group={group} />
        ))
        }
      </div>
  )
}

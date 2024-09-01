import React, { useRef ,useEffect} from 'react'
import useGetGroupMsg from '../../hooks/useGetGroupMsg'
import GroupMsg from './GroupMsg'
import MessageSkeleton from '../skeletons/MessageSkeleton'

export default function Groupmessages() {
  const {loading, groupMessages} = useGetGroupMsg()
  const lastMessageRef=useRef()

  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [groupMessages]);
  

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && groupMessages.length > 0 &&
				groupMessages.map((msg) => (
					<div key={msg._id} ref={lastMessageRef}>
						<GroupMsg message={msg} />
					</div>
				))}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && groupMessages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
    </div>
  )
}

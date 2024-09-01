import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import useSendGroupMsg from '../../hooks/useSendGroupMsg'

export default function GroupmsgInput() {
  const [groupmessage, setgroupMessage]=useState("")
  const {loading,sendGroupMsg}=useSendGroupMsg()

  const handleSubmit=async(e)=>{
    e.preventDefault();
		if (!groupmessage) return;
		await sendGroupMsg(groupmessage)
		setgroupMessage("");
  }

  return (
    <div><form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={groupmessage}
          onChange={(e) => setgroupMessage(e.target.value)}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
        </button>
      </div>
    </form></div>
  )
}

import { useEffect, useState } from "react";
import useGroupConv from "../zustand/useGroupConv";

const useGetGroupMsg=()=>{
    const [loading, setLoading] = useState(false);
    const {selectedGroup,groupMessages,setgroupMessages}=useGroupConv()

    useEffect(()=>{
        const getGroupMsg = async()=>{
            setLoading(true)
            const id=selectedGroup._id
            if(!id){
                toast.error("Message cannot be empty");
                return;
            }
            try{
                const res = await fetch(`api/group/${id}/get-messages`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        }
                })
                if(!res.ok) toast.error("Invalid response")
                    const data = await res.json()
                if(data.error) toast.error(data.error)
                setgroupMessages(data)
            } catch(error){
                toast.error(error.message)
                console.log('error')
            } finally{
                setLoading(false)
            }
        }
        if (selectedGroup?._id) getGroupMsg();
    },
    [selectedGroup,setgroupMessages])
    return {loading, groupMessages}
}

export default useGetGroupMsg;

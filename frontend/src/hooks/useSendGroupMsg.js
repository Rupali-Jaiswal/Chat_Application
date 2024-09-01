import { useState } from "react"
import useGroupConv from "../zustand/useGroupConv";
import toast from "react-hot-toast";


const useSendGroupMsg =  () => {
    const [loading, setLoading] = useState(false);
    const { groupMessages, setgroupMessages, selectedGroup } = useGroupConv()

    const sendGroupMsg = async (msg) => {
        if (!msg) {
            toast.error("Message cannot be empty");
            return;
        }
        setLoading(true);
        try {
            const id = selectedGroup?._id
            if (!id) {
                toast.error("This group is not defined");
                return;
            }
            const res = await fetch(`api/group/${id}/send-message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: msg })
            })
            if (!res.ok) toast.error("Invalid response")
            const data = await res.json()
            if (data.error) toast.error(data.error)
            setgroupMessages([...groupMessages, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };
    return { loading, sendGroupMsg }
}

export default useSendGroupMsg
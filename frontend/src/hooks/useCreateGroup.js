import toast from "react-hot-toast"

export const useCreateGroup = async ({ groupName, groupDescription, groupImage, groupMembers }) => {
    try {
        if (!groupName || !groupDescription || !groupImage || !groupMembers) {
            throw new Error("Invalid input");
          }
        const res = await fetch("/api/group/createGroup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ groupName, groupDescription, groupImage, groupMembers }),
            credentials: "include"
        })
        if(!res.ok){
            console.log(res.status,res.error)
            throw new Error("Invalid response")
        }
        const data = await res.json()
        if (data.error) {
            console.log(data.error)
            throw new Error(data.error)
        }
            toast.success("Group Created Successfully")
            console.log(data)
            return data
    } catch (error) {
        console.log(error.message)
        toast.error(error.message)
    }
}

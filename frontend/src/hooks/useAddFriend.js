import toast from "react-hot-toast"

const useAddFriend=async()=>{
   try {
    const friendNameInput = document.getElementById('friendName');
    if (!friendNameInput) {
        throw new Error('Please Enter Name');
    }
    const text = friendNameInput.value;  
    if (!text) {
        toast.error('Please enter a friend name');
        return { success: false, message: 'Please Enter Name' };
    }
    const res=await fetch("/api/users/addFriend",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
            },
            credentials:"include",
            body:JSON.stringify({username:text})
    })
    if(res.ok){
        toast.success('Friend added successfully');
        return { success: true };
    }
    else {
    const data=await res.json()
    console.log(data)
    toast.error(data.message)
    return { success: false, message: data.message }
    };
   } catch (error) {
    console.log(error.message)
    throw new Error(error.message)
   }
}

export default useAddFriend
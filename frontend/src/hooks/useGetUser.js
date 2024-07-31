import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetUser = () => {
    const [loading, setLoading] = useState(false);
    const [user,setUser]=useState(null)
    useEffect(() => {
        const getUser = async () => {
			setLoading(true);
            try {
                const data = await fetch('/api/users/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include"
                })
                const userdata =await data.json()
                if (userdata.error) {
                    throw new Error(userdata.error)
                }
                setUser(userdata)
                console.log(user)
            } catch (error) {
                toast.error(error.message);
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        getUser()
    }, [])
    return {user, loading}
    
}

export default useGetUser
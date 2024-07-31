import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useGetGroups = () => {
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch('/api/group/getAllGroup', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                if (data.error) {
                    throw new Error(`Invalid json data: ${data.error}`);
                }

                if (!Array.isArray(data.groups)) {
                    console.log(typeof (data))
                    throw new Error('Invalid response data');
                }
                setGroups(data.groups);
            } catch (error) {
                setError(error.message);
                console.log(error.message);
                toast.error(error.message)
            }
        };
        fetchGroups();
    }, []);

    return { groups, error };
};
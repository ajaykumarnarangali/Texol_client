import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContex';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {

                const res = await fetch(url, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }

                const json = await res.json();
                if (json.success == false) {
                    setError(json.message)
                }
                setData(json.questions);
            } catch (err) {
                // console.log(err);
                setError(err.message);
            }
        };

        fetchData();
    }, [url]);

    return { data, error };
};

export default useFetch;

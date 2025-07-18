import { useState } from 'react';

const useLogin = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (formData) => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                credentials:'include',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await res.json();
            console.log(result,'20');
            if (result?.success == false) {
                console.log(result.message);
                setError(result.message);
                return;
            }
            setData(result);
            return result;
        } catch (err) {
            setError({ message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return { login, error, data, loading };
};

export default useLogin;

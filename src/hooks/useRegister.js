import { useState } from 'react';

const useRegister = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const register = async (formData) => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await res.json();
            if (result.success == false) {
                setError(result.message);
                return;
            }
            setData(result);
            return result.success;
        } catch (err) {
            setError({ message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return { register, error, data, loading };
};

export default useRegister;

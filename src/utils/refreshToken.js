
export const refreshToken = async (setToken, setTokenExpires) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh-token`, {
            method: 'POST',
            credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
            setToken(data.access_token);
            setTokenExpires(Date.now() * 15 * 60 * 1000);
        } else {
            setToken(null);
        }
        return data.access_token;
    } catch {
        setToken(null);
    }
};

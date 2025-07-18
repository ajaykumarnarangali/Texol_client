export const fetchUser = async (token, setUser) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/get-user`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (data.success) {
            setUser(data.user);
        } else {
            setUser(null);
        }
    } catch (err) {
        // console.error('Failed to fetch user:', err);
        setUser(null);
    } 
};

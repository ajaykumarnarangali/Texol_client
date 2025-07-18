
export const saveTestResult = async (payload,token) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/result-history`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            return true
        }
        return false;
    } catch (err) {
        console.log(err);
    }
}

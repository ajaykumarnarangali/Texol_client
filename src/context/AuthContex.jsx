import { createContext, useEffect, useState, useRef, useContext } from "react";
import { refreshToken } from "../utils/refreshToken";
import { fetchUser } from '../utils/fetchUser'

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExpires, setTokenExpires] = useState(Date.now());
    const [loading, setLoading] = useState(true);

    const hasInitialized = useRef(false);

    useEffect(() => {
        const init = async () => {
            if (hasInitialized.current) return;
            hasInitialized.current = true;
            try {
                const newToken = await refreshToken(setToken, setTokenExpires);
                if (newToken) {
                    await fetchUser(newToken, setUser);
                }
            } catch (err) {
                // console.error("Auth Init Failed", err);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    const Login = async (newToken) => {
        setLoading(true);
        try {
            setToken(newToken);
            setTokenExpires(Date.now() + 15 * 60 * 1000);
            await fetchUser(newToken, setUser);
        } catch (err) {
            // console.error('Login error', err);
        } finally {
            setLoading(false);
        }
    };

    const clear = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("result");
    };

    return (
        <AuthContext.Provider value={{ user, token, clear, Login, loading, tokenExpires }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
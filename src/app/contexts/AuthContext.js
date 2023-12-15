import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userInfo, setUser] = useState(null);

    useEffect(() => {
        const getStoredUserInfo = () => {
            if (typeof window !== 'undefined') {
                const storedUserInfo = localStorage.getItem('userInfo');
                return storedUserInfo ? JSON.parse(storedUserInfo) : null;
            }
            return null;
        }

        setUser(getStoredUserInfo());
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (userInfo) {
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            } else {
                localStorage.removeItem('userInfo');
            }
        }
    }, [userInfo]);

    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export { AuthProvider, AuthContext }

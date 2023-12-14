import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const isLocalStorageAvailable = typeof localStorage !== 'undefined';

    const storedUserInfo = isLocalStorageAvailable ? localStorage.getItem('userInfo') : null;
    const [userInfo, setUser] = useState(storedUserInfo ? JSON.parse(storedUserInfo) : null);

    useEffect(() => {
        if (isLocalStorageAvailable) {
            if (userInfo) {
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            } else {
                localStorage.removeItem('userInfo');
            }
        }
    }, [userInfo, isLocalStorageAvailable]);

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

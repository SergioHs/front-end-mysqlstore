import React, {createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userInfo, setUser] = useState(null);

    const login =(userData) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ userInfo, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export { AuthProvider, AuthContext }
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();


export const AuthContextProvider = props => {
    const [authStatus, setAuthStatus] = useState(false);
    const [userData, setUserData] = useState(null);

    const login = (data) => {
        setAuthStatus(true);
        setUserData(data);
    };

    const logout = () => {
        setAuthStatus(false);
        setUserData(null);
    };

    return (
        <AuthContext.Provider value={{ authStatus, userData, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

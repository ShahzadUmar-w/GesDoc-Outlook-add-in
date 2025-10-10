// context/UserContext.jsx
import React, { createContext, useEffect, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(() => localStorage.getItem("username"));

    useEffect(() => {
        if (username) localStorage.setItem("username", username);
        else localStorage.removeItem("username");
    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

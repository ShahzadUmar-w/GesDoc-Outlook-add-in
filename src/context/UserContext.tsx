// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserContextType {
    username: string | null;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState(() => {
        return localStorage.getItem("username");
    });

    useEffect(() => {
        if (username) {
            localStorage.setItem("username", username);
        } else {
            localStorage.removeItem("username");
        }
    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used inside UserProvider");
    return context;
};

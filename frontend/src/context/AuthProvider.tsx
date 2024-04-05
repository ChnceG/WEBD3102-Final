import React, { createContext, useState } from 'react';

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    authenticated: boolean;
    userId: string | null;
    login: () => void;
    logout: () => void;
    setUserId: (userId: string) => void;
}
  
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState('');
  
    const login = () => {
        setAuthenticated(true);
    };

    const logout = () => {
        setAuthenticated(false);
        setUserId('');
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ authenticated, userId, login, logout, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
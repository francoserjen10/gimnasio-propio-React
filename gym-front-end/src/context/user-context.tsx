'use client'
import { IUserResponse } from "@/interfaces/user";
import { getUserService } from "@/services/auth/login-service";
import { createContext, useContext, useEffect, useState } from "react";

interface IUserContextType {
    user: IUserResponse | null;
    setUser: (user: IUserResponse | null) => void;
    isLoading: boolean;
}

const UserContext = createContext<IUserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUserResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserService();
                setUser(userData);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debe ser usado dentro de un UserProvider");
    }
    return context;
}
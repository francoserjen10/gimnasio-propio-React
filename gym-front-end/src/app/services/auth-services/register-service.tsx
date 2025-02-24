import axiosInstance from "../../conexion-db/axios";
import { isAxiosError } from "axios";

export const registerService = async (name: string, lastName: string, phoneNumber: string, birthDate: Date, dni: number, email: string, password: string, emergencyContact: string, direction: string) => {
    try {
        const response = await axiosInstance.post("/register/", { name, lastName, phoneNumber, birthDate, dni, email, password, emergencyContact, direction }, { withCredentials: true, });
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error en registerService:", error.response?.data?.message || "Error desconocido en la creacion de usuario");
            throw new Error(error.response?.data?.message || "Error en la creacion de usuario");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Error inesperado en el servicio de registro");
        }
    }
};
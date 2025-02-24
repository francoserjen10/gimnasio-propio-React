import axiosInstance from "../../conexion-db/axios";
import { isAxiosError } from "axios";

export const loginService = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post("/login/access", { email, password }, { withCredentials: true, });
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error en loginService:", error.response?.data?.message || "Error desconocido en la autenticación");
            throw new Error(error.response?.data?.message || "Error en la autenticación");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Error inesperado en el servicio de login");
        }
    }
};
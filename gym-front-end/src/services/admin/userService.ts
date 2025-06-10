import { isAxiosError } from "axios";
import axiosInstance from "../db/axios"

export const userListService = async () => {
    try {
        const response = await axiosInstance.get("/admin", { withCredentials: true });
        return response.data.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error en userServices:", error.response?.data?.message || "Error desconocido al obtener el listado de usuarios");
            throw new Error(error.response?.data?.message || "Error al obtener el listado de usuarios");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Error inesperado en el servicio de listado de usuarios");
        }
    }
}
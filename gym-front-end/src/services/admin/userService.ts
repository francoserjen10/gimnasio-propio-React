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

export const deleteUserByIdService = async (userId: number | undefined) => {
    try {
        const response = await axiosInstance.delete(`/admin/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            console.error("Error al eliminar usuario:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error al eliminar el usuario.");
        } else {
            throw new Error("Error inesperado al eliminar el usuario.");
        }
    }
}
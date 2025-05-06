import axiosInstance from "../db/axios";

export const logOut = async () => {
    try {
        await axiosInstance.post("/logout", { withCredentials: true, });
        alert('Sesion cerrada');
    } catch (error) {
        console.error("Error al hacer la petición:", error);
    }
};
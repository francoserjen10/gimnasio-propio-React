"use client";
import { IUserResponse } from "@/interfaces/user";
import { deleteUserByIdService, userListService } from "@/services/admin/userService";
import { useEffect, useState } from "react";
import styles from './scrollbar.module.css';

export default function UserTableForAdmin() {
    const [users, setUsers] = useState<IUserResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response: IUserResponse[] = await userListService();
            if (Array.isArray(response)) {
                setUsers(response);
            } else {
                setError("El formato de datos recibido no es válido.");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    }

    const deleteUserById = async (userId: number | undefined) => {
        try {
            await deleteUserByIdService(userId);
            fetchUsers();
            // Insertar un mensaje de confirmacion si quiere eliminarlo o no por las dudas que se haya equiviocado de usuario o boton
            alert("Usuario eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }

    return (
        <>
            <div className="p-6 text-white max-w-full">
                <h2 className="text-2xl font-bold mb-4">Listado de Usuarios</h2>

                {loading && <p className="text-gray-300">Cargando usuarios...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && users.length === 0 && (
                    <p className="text-gray-400">No hay usuarios para mostrar</p>
                )}

                {!loading && users.length > 0 && (
                    <div className={`max-h-[72vh] rounded-lg shadow-md border border-gray-700 ${styles['scroll-container']}`}>
                        <table className="min-w-full bg-gray-900 text-white">
                            <thead className="bg-gray-700 text-left text-sm uppercase tracking-wider sticky top-0">
                                <tr>
                                    <th className="px-6 py-3">Nombre</th>
                                    <th className="px-6 py-3">Apellido</th>
                                    <th className="px-6 py-3">Teléfono</th>
                                    <th className="px-6 py-3">Nacimiento</th>
                                    <th className="px-6 py-3">DNI</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Accion</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {users.map((user) => (
                                    <tr key={user.usuario_id} className="hover:bg-gray-800">
                                        <td className="px-6 py-4">{user.name}</td>
                                        <td className="px-6 py-4">{user.lastName}</td>
                                        <td className="px-6 py-4">{user.phoneNumber}</td>
                                        <td className="px-6 py-4">
                                            {user.birthDate instanceof Date
                                                ? user.birthDate.toLocaleDateString()
                                                : String(user.birthDate)}
                                        </td>
                                        <td className="px-6 py-4">{user.dni}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4 flex justify-center items-center">
                                            {
                                                <button type="button" onClick={async () => {
                                                    await deleteUserById(user.usuario_id);
                                                }} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 me-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

// Botones en lugar de rol: Eliminar y actualizar.
// Filtro de búsqueda
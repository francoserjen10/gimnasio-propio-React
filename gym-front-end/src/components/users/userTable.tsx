"use client";
import { IUserResponse } from "@/interfaces/user";
import { userListService } from "@/services/admin/userService";
import { useEffect, useState } from "react";
import styles from './scrollbar.module.css';

export default function UserTableForAdmin() {
    const [users, setUsers] = useState<IUserResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
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
        fetchUsers();
    }, []);

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
                                    <th className="px-6 py-3">Rol</th>
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
                                        <td className="px-6 py-4">{user.rolId}</td>
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
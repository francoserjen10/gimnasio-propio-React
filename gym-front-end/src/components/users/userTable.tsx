"use client";
import { IUserResponse } from "@/interfaces/user";
import { userListService } from "@/services/admin/userService";
import { useEffect, useState } from "react";

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
            <div>
                <h2>Listado de Usuarios</h2>

                {loading && <p>Cargando usuarios...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {!loading && !error && users.length === 0 && (
                    <p>No hay usuarios para mostrar</p>
                )}

                {!loading && users.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Telefono</th>
                                <th>Fecha de nacimiento</th>
                                <th>DNI</th>
                                <th>Email</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.usuario_id}>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.birthDate instanceof Date ? user.birthDate.toLocaleDateString() : String(user.birthDate)}</td>
                                    <td>{user.dni}</td>
                                    <td>{user.email}</td>
                                    <td>{user.rolId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
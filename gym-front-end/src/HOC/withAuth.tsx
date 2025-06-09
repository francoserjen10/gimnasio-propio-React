"use client"
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

/**
 * Higher-Order Component (HOC) para proteger rutas basadas en roles de usuario.
 *
 * @template T - Props del componente envuelto.
 * @param WrappedComponent - Componente que se desea proteger.
 * @param allowedRoles - Arreglo de IDs de roles autorizados para acceder al componente.
 * @returns Un componente funcional que verifica el rol del usuario antes de renderizar el componente protegido.
 *
 * @example
 * // Proteger una página solo para administradores (rolId = 1)
 * export default withAuth(AdminPage, [1]);
 */
export function withAuth<T extends object>(
    WrappedComponent: React.ComponentType<T>,
    allowedRoles: number[]
) {
    return function AuthWrapper(props: T) {
        const { user, isLoading } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (!isLoading) {
                if (!user) {
                    // Usuario no autenticado: redirigir al login
                    router.push("/auth/login");
                } else if (user.rolId !== undefined && !allowedRoles.includes(user.rolId)) {
                    // Usuario autenticado pero sin rol autorizado: redirigir a página sin permiso
                    router.push("/unauthorized");
                }
            }
        }, [user, isLoading, router]);

        // Mostrar mensaje de carga o bloqueo de acceso mientras se valida el usuario
        if (isLoading || !user || (user.rolId !== undefined && !allowedRoles.includes(user.rolId))) {
            return <p>Cargando o sin acceso...</p>;
        }

        // Usuario autorizado: renderizar el componente original
        return <WrappedComponent {...props} />;
    }
}
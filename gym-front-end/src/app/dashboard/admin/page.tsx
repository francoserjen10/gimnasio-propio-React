"use client";
import { useUser } from "@/context/user-context";
import { withAuth } from "@/HOC/withAuth";
import { logOut } from "@/services/auth/logout-service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

function HomeAdmin() {
    const router: AppRouterInstance = useRouter();
    const { user, setUser } = useUser();

    return (
        <>
            <h1>Bienvenidos {user?.name} {user?.lastName}</h1>

            <button onClick={async () => {
                setUser(null);
                await logOut();
                router.push("/auth/login");
            }}>
                Cerrar sesion
            </button>
        </>
    );
}

export default withAuth(HomeAdmin, [1]);
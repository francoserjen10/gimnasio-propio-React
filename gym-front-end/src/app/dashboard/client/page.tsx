"use client";
import { useUser } from "@/context/user-context";
import { withAuth } from "@/HOC/withAuth";
import { logOut } from "@/services/auth/logout-service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

function HomeClient() {
    const router: AppRouterInstance = useRouter();
    const { setUser } = useUser();

    return (
        <>
            <h1>Usuario</h1>

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

export default withAuth(HomeClient, [2]);
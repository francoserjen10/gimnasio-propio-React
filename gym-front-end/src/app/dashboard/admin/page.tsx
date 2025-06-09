"use client";
import { useUser } from "@/context/user-context";
import { withAuth } from "@/HOC/withAuth";

function HomeAdmin() {
    const { user, setUser } = useUser();

    return (
        <>
            <h1>Bienvenidos {user?.name} {user?.lastName}</h1>
        </>
    );
}

export default withAuth(HomeAdmin, [1]);
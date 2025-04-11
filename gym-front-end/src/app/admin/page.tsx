"use client";
import { withAuth } from "@/HOC/withAuth";

function HomeAdmin() {
    return (
        <h1>ADMINISTRADOR</h1>
    );
}

export default withAuth(HomeAdmin, [1]);
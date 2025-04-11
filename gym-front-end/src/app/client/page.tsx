"use client";
import { withAuth } from "@/HOC/withAuth";

function HomeClient() {
    return (
        <h1>Usuario</h1>
    );
}

export default withAuth(HomeClient, [2]);
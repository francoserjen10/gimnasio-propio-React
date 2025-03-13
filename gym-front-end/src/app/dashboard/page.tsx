"use client";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/login");
            } else if (user.rolId === 1) {
                router.push("/admin");
            } else {
                router.push("/client");
            }
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return <p>Cargando usuario...</p>;
    }

    return null;
}

"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import LogoutButton from "../logOutButton";

export function SidebarAdmin() {
    const router: AppRouterInstance = useRouter();

    const menuItems = [
        { id: "clientes", label: "Clientes", path: "/dashboard/admin" },
        { id: "turnos", label: "Turnos", path: "/dashboard/admin" },
        { id: "reservas", label: "Reservas", path: "/dashboard/admin" },
    ];

    return (
        <>
            <aside className="h-screen w-70 bg-gray-800 text-white flex flex-col shadow-lg">
                <div className="text-2xl font-bold px-6 py-4 border-b border-gray-700">
                    <h1>NO EXCUSES CLUB</h1>
                </div>
                <nav className="flex flex-col p-4 gap-2 flex-grow">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors hover:bg-gray-700`}
                            onClick={() => {
                                router.push(item.path);
                            }}
                        >
                            <span className="text-lg">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="border-t border-gray-700">
                    <LogoutButton />
                </div>
            </aside>
        </>
    );
}
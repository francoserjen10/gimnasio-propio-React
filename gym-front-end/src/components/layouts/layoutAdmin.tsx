"use client";
import { SidebarAdmin } from "../sidebars/sidebarAdmin";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <SidebarAdmin />
            <main className="flex-1 overflow-auto bg-gray-900 text-white">
                <div className="sticky top-0 z-10 border-b border-gray-700 px-6 py-4 shadow-md">
                    <h1 className="text-2xl font-bold text-center">Panel Administrativo</h1>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
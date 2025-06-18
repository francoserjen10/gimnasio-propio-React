"use client";
import { SidebarAdmin } from "../sidebars/sidebarAdmin";
import { HeaderAdmin } from "../headers/headerAdmin";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <SidebarAdmin />
            <main className="flex-1 overflow-auto bg-gray-900 text-white">
                <HeaderAdmin />
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
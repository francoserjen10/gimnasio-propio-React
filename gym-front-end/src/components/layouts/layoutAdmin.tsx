"use client";
import { SidebarAdmin } from "../sidebars/sidebarAdmin";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <SidebarAdmin />
            <main className="flex-1 overflow-auto bg-gray-900">{children}</main>
        </div>
    );
}
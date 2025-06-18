import { useUser } from "@/context/user-context";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeaderAdmin() {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className="sticky top-0 border-b border-gray-700 px-6 py-3 shadow-md bg-gray-900 z-50">
                <div className="relative flex items-center justify-between">
                    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold text-white">
                        Panel Administrativo
                    </h1>
                    <div className="ml-auto relative" ref={dropdownRef}>
                        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                            <Image
                                src={"/images/user.png"}
                                alt="Administrador"
                                width={35}
                                height={35}
                                className="rounded-full"
                            />
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-60 bg-white text-black rounded-md shadow-lg z-50">
                                <div className="px-4 py-4 border-b">
                                    <p>
                                        {user ? `${user.name} ${user.lastName}` : "Cargando..."}
                                    </p>
                                    <p>
                                        {user ? `${user.email}` : "Cargando..."}
                                    </p>
                                </div>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                                    Ver perfil
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
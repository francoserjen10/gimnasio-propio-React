import { useUser } from "@/context/user-context";
import { logOut } from "@/services/auth/logout-service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

    const router: AppRouterInstance = useRouter();
    const { setUser } = useUser();

    return (
        <>
            <div className="w-full px-6 py-4">
                <button onClick={async () => {
                    setUser(null);
                    await logOut();
                    router.push("/auth/login");
                }}
                    className="flex items-center gap-2 font-medium rounded-lg text-white hover:bg-gray-700 px-3 py-2 w-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Cerrar sesion
                </button>
            </div>
        </>
    );
}
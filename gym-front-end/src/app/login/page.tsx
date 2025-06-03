'use client'
import { loginService } from "@/services/auth/login-service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/utils/validation/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user-context";
import Toast from "./toast";

export default function Login() {

    const { user, setUser, isLoading } = useUser();
    const router: AppRouterInstance = useRouter();
    const [loginError, setLoginError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            const response = await loginService(data.email, data.password);
            setUser(response.user);
            setToast({ message: 'Inicio de sesión exitoso 💪', type: 'success' });
            reset();
            setLoginError(null);
        } catch (error) {
            const mensaje = error instanceof Error ? error.message : "Se ha producido un error";
            setLoginError(mensaje);
            setToast({ message: `Error: ${mensaje}`, type: 'error' });
            if (error instanceof Error) {
                setLoginError(error.message);
            } else {
                setLoginError("Se ha producido un error");
            }
        }
    };

    useEffect(() => {
        if (!isLoading && user) {
            if (user.rolId === 1) {
                router.push("/admin");
            } else if (user.rolId === 2) {
                router.push("/client");
            }
        }
    }, [user, isLoading, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md bg-[#111] rounded-2xl shadow-2xl p-10 text-white">
                <h1 className="text-4xl font-extrabold text-center text-lime-400 mb-8 uppercase tracking-wider">Iniciar Sesión</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full bg-[#222] text-white p-3 rounded-md border border-[#333] focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="Contraseña"
                            className="w-full bg-[#222] text-white p-3 rounded-md border border-[#333] focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lime-400 text-black font-bold py-3 rounded-md hover:bg-lime-500 transition duration-300 uppercase tracking-wide"
                    >
                        Ingresar
                    </button>
                </form>

                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

                <p className="text-center mt-8 text-sm text-gray-400">
                    ¿No tenés cuenta?
                    <button
                        onClick={() => router.push('/register')}
                        className="ml-2 text-lime-400 hover:underline"
                    >
                        Registrarse
                    </button>
                </p>
            </div>
        </div>
    );
}
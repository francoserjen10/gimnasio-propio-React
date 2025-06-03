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

export default function Login() {

    const { user, setUser, isLoading } = useUser();
    const router: AppRouterInstance = useRouter();
    const [loginError, setLoginError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            const response = await loginService(data.email, data.password);
            setUser(response.user);
            alert('Inicio de sesion exitoso');
            reset();
            setLoginError(null);
        } catch (error) {
            console.error("Error al hacer la petición:", error);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Inicio de Sesión</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            placeholder="tucorreo@email.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                        <input
                            {...register("password")}
                            type="password"
                            className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            placeholder="********"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    {loginError && (
                        <p className="text-red-600 text-sm text-center">{loginError}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        ¿No tenés cuenta?{" "}
                        <button
                            onClick={() => router.push('/register')}
                            className="text-blue-600 hover:underline"
                        >
                            Registrate
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
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
        <div>
            <h1>Inicio de Sesion</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("email")}
                    type="text"
                    placeholder="email"
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    {...register("password")}
                    type="password"
                    placeholder="password"
                />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit">Enviar</button>
            </form>
            {loginError && <p>{loginError}</p>}
            <p>¿No tenes cuenta?</p>
            <button onClick={() => router.push('/register')}>Registrate</button>
        </div>
    );
}
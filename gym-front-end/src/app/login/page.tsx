'use client'
import { loginService } from "@/app/services/auth-services/login-service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {

    const router: AppRouterInstance = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            await loginService(data.email, data.password);
            alert('Inicio de sesion exitoso');
            reset();
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    }

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
            <p>¿No tenes cuenta?</p>
            <button onClick={() => router.push('/register')}>Registrate</button>
        </div>
    );
}
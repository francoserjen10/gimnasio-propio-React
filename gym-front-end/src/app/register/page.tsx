'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { registerService } from "../services/auth-services/register-service";
import { registrationSchema } from "../schemas/registrarion-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function register() {

    const router: AppRouterInstance = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(registrationSchema),
    });

    const onSubmit = async (data: z.infer<typeof registrationSchema>) => {
        try {
            await registerService(data.name, data.lastName, data.phoneNumber, data.birthDate, Number(data.dni), data.email, data.password, data.emergencyContact, data.direction);
            reset();
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    }

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("name")}
                    type="text"
                    name="name"
                    placeholder="Nombre"
                />
                {errors.name && <p>{errors.name.message}</p>}

                <input
                    {...register("lastName")}
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}

                <input
                    {...register("phoneNumber")}
                    type="text"
                    name="phoneNumber"
                    placeholder="Numero de telefono"
                />
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

                <input
                    {...register("birthDate")}
                    type="Date"
                    name="birthDate"
                    placeholder="Fecha de nac"
                />
                {errors.birthDate && <p>{errors.birthDate.message}</p>}

                <input
                    {...register("dni")}
                    type="number"
                    name="dni"
                    placeholder="D.N.I"
                />
                {errors.dni && <p>{errors.dni.message}</p>}

                <input
                    {...register("email")}
                    type="text"
                    name="email"
                    placeholder="email"
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    {...register("password")}
                    type="password"
                    name="password"
                    placeholder="password"
                />
                {errors.password && <p>{errors.password.message}</p>}

                <input
                    {...register("emergencyContact")}
                    type="text"
                    name="emergencyContact"
                    placeholder="Telefono de emergencia"
                />
                {errors.emergencyContact && <p>{errors.emergencyContact.message}</p>}

                <input
                    {...register("direction")}
                    type="text"
                    name="direction"
                    placeholder="Direccion"
                />
                {errors.direction && <p>{errors.direction.message}</p>}

                <button type="submit">Enviar</button>
            </form>
            <p>¿Ya tenes cuenta?</p>
            <button onClick={() => router.push('/login')}>Inicio de sesion</button>
        </div>
    );
}
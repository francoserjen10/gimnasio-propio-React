'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { registerService } from "@/services/auth/register-service";
import { registrationSchema } from "../../utils/validation/registrarion-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IUser } from "@/interfaces/user";

export default function Register() {

    const router: AppRouterInstance = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(registrationSchema),
    });

    const onSubmit = async (data: z.infer<typeof registrationSchema>) => {
        try {
            const formattedDate: IUser = {
                ...data,
                dni: Number(data.dni),
            }
            await registerService(formattedDate.name, formattedDate.lastName, formattedDate.phoneNumber, formattedDate.birthDate, formattedDate.dni, formattedDate.email, formattedDate.password, formattedDate.emergencyContact, formattedDate.direction);
            alert(`Usuario ${data.name} registrado con éxito`);
            reset();
            router.push('/login');
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-2xl bg-[#111] rounded-2xl shadow-2xl p-10 text-white">
                <h1 className="text-4xl font-extrabold text-center text-lime-400 mb-8 uppercase tracking-wider">Registro Gym</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {[
                        { name: "name", type: "text", placeholder: "Nombre" },
                        { name: "lastName", type: "text", placeholder: "Apellido" },
                        { name: "phoneNumber", type: "text", placeholder: "Teléfono" },
                        { name: "birthDate", type: "date", placeholder: "Fecha de nacimiento" },
                        { name: "dni", type: "number", placeholder: "D.N.I" },
                        { name: "email", type: "email", placeholder: "Correo electrónico" },
                        { name: "password", type: "password", placeholder: "Contraseña" },
                        { name: "emergencyContact", type: "text", placeholder: "Contacto de emergencia" },
                        { name: "direction", type: "text", placeholder: "Dirección" }
                    ].map((field, i) => (
                        <div key={i}>
                            <input
                                {...register(field.name as any)}
                                type={field.type}
                                placeholder={field.placeholder}
                                className="w-full bg-[#222] text-white p-3 rounded-md border border-[#333] focus:outline-none focus:ring-2 focus:ring-lime-400"
                            />
                            {errors[field.name as keyof typeof errors] && (
                                <p className="text-red-400 text-sm mt-1">{errors[field.name as keyof typeof errors]?.message as string}</p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-lime-400 text-black font-bold py-3 rounded-md hover:bg-lime-500 transition duration-300 uppercase tracking-wide"
                    >
                        Crear cuenta
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-gray-400">
                    ¿Ya tenés cuenta?
                    <button
                        onClick={() => router.push('/login')}
                        className="ml-2 text-lime-400 hover:underline"
                    >
                        Iniciar sesión
                    </button>
                </p>
            </div>
        </div>
    );
}
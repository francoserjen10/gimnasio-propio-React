'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerService } from "../services/auth-services/register-service";

export default function register() {

    const router: AppRouterInstance = useRouter();
    const [formData, setFormData] = useState({ name: "", lastName: "", phoneNumber: "", birthDate: "", dni: "", email: "", password: "", emergencyContact: "", direction: "" });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await registerService(
                formData.name,
                formData.lastName,
                formData.phoneNumber,
                new Date(formData.birthDate),
                Number(formData.dni),
                formData.email,
                formData.password,
                formData.emergencyContact,
                formData.direction);
            setFormData({
                name: "",
                lastName: "",
                phoneNumber: "",
                birthDate: "",
                dni: "",
                email: "",
                password: "",
                emergencyContact: "",
                direction: ""
            });
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    }

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Numero de telefono"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <input
                    type="Date"
                    name="birthDate"
                    placeholder="Fecha de nac"
                    value={formData.birthDate}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="dni"
                    placeholder="D.N.I"
                    value={formData.dni}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange} />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="emergencyContact"
                    placeholder="Telefono de emergencia"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="direction"
                    placeholder="Direccion"
                    value={formData.direction}
                    onChange={handleChange}
                />
                <button type="submit">Enviar</button>
            </form>
            <p>¿Ya tenes cuenta?</p>
            <button onClick={() => router.push('/login')}>Inicio de sesion</button>
        </div>
    );
}
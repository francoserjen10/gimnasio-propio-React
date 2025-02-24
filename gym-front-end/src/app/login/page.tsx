'use client'
import { loginService } from "@/app/services/auth-services/login-service";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function login() {

    const router: AppRouterInstance = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });

    //Manejar los cambios del formulario
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await loginService(formData.email, formData.password);
            setFormData({ email: "", password: "" });
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    }

    return (
        <div>
            <h1>holaaa</h1><form onSubmit={handleSubmit}>
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
                <button type="submit">Enviar</button>
            </form>
            <p>¿Ya tenes cuenta?</p>
            <button onClick={() => router.push('/register')}>Registrate</button>
        </div>
    );
}
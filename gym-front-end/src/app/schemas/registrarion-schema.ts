import { z } from 'zod'

export const registrationSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    phoneNumber: z.string()
        .min(7, "El número de teléfono debe tener al menos 7 dígitos")
        .max(15, "El número de teléfono es demasiado largo")
        .regex(/^\d+$/, "El número de teléfono solo puede contener números"),
    birthDate: z.coerce.date({ required_error: "La fecha de nacimiento es obligatoria" })
        .refine(date => date <= new Date(), "La fecha de nacimiento no puede ser en el futuro"),
    dni: z.string()
        .min(7, "El DNI debe tener al menos 7 dígitos")
        .max(8, "El DNI no puede tener más de 8 dígitos")
        .regex(/^\d+$/, "El DNI solo puede contener números"),
    email: z.string().email("El email no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    emergencyContact: z.string()
        .min(7, "El contacto de emergencia debe tener al menos 7 dígitos")
        .max(15, "El contacto de emergencia es demasiado largo")
        .regex(/^\d+$/, "El contacto de emergencia solo puede contener números"),
    direction: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
});
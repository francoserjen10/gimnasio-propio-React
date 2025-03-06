import { z } from 'zod'

export const registrationSchema = z.object({
    name: z.string().nonempty("El campo tiene que ser llenado"),
    lastName: z.string().nonempty("El campo tiene que ser llenado"),
    phoneNumber: z.string()
        .nonempty("El campo tiene que ser llenado")
        .regex(/^\d+$/, "El número de teléfono solo puede contener números"),
    birthDate: z.coerce.date({ required_error: "La fecha de nacimiento es obligatoria" }),
    dni: z.string()
        .nonempty("El campo tiene que ser llenado")
        .regex(/^\d+$/, "El DNI solo puede contener números"),
    email: z.string()
        .nonempty("El campo tiene que ser llenado")
        .email("El email no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    emergencyContact: z.string()
        .nonempty("El contacto de emergencia es obligatorio")
        .regex(/^\d+$/, "El contacto de emergencia solo puede contener números"),
    direction: z.string().nonempty("La dirección es obligatoria"),
});
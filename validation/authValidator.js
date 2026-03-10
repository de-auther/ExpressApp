import {z} from 'zod';

export const signUpSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password:z.string().min(6),
    phone_number:z.number().positive().int()
});


export const loginSchema = z.object({
    email:z.string().email(),
    password: z.string().min(6)
});
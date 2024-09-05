"use server";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Champs invalides" };
    }

    const { email, password, name } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return { error: "Utilisateur déjà existant" };

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    await generateVerificationToken(email);

    return { success: "Compte créé avec succès !" };
};

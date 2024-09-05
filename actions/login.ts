"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { sign } from "crypto";
import { AuthError } from "next-auth";
import { z } from "zod";

interface ChromeResponse {
    extensionId?: string;
}

const handleLoginSuccess = (token: string) => {
    if (
        typeof window !== "undefined" &&
        typeof chrome !== "undefined" &&
        chrome.runtime
    ) {
        chrome.runtime.sendMessage(
            { action: "getExtensionId" },
            (response: ChromeResponse) => {
                if (response && response.extensionId) {
                    const extensionId = response.extensionId;
                    window.location.href = `chrome-extension://${extensionId}/redirection.html?token=${token}`;
                } else {
                    console.error("Failed to get extension ID");
                }
            }
        );
    } else {
        console.error("Chrome runtime is not available.");
    }
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);
    if (!validateFields.success) {
        return { error: "Champs invalides" };
    }
    const { email, password } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.password || !existingUser.email) {
        return { error: "Identifiants invalides" };
    }

    handleLoginSuccess("dcsdcsdcsdcsdcsdc");

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Identifiants invalides" };
                default:
                    return { error: "Une erreur est survenue" };
            }
        }
        throw error;
    }
};

"use client";
import { Car } from "lucide-react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { startTransition, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {

    const searchParams = useSearchParams();
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Vous avez déjà un compte avec cet email"
            : "";

    const [isPending, setIsPending] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(data).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    };
    
    return (
        <CardWrapper
            headerLabel="Connexion"
            backButtonLabel="Vous n'avez pas de compte"
            backButtonHref="/auth/register"
            showSocialLogin
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            disabled={isPending}
                                            placeholder="John.doe@exemple.com"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.email?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">
                                        Mot de passe
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isPending}
                                            placeholder="********"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {
                                            form.formState.errors.password
                                                ?.message
                                        }
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />

                    <Button
                        className="w-full bg-customColor"
                        type="submit"
                        disabled={isPending}
                    >
                        Se connecter
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

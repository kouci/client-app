"use client";
import { Car } from "lucide-react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";
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
import { startTransition, useState, useTransition } from "react";
import { start } from "repl";
import { register } from "@/actions/register";

export const RegisterForm = () => {
    const [isPending, setIsPending] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(data).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Créer votre compte"
            backButtonLabel="Vous avez déjà un compte ?"
            backButtonHref="/auth/login"
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="name"
                                            disabled={isPending}
                                            placeholder="John Doe"
                                        />
                                    </FormControl>
                                    <FormMessage>
                                        {form.formState.errors.name?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
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
                                        {form.formState.errors.password?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Button
                        className="w-full bg-customColor"
                        type="submit"
                        disabled={isPending}
                    >
                        Créer un compte
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

"use slinet ";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./Back-button";
import { Social } from "./Social";
import { Header } from "./header";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocialLogin: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel} />
            </CardFooter>
        </Card>
    );
};

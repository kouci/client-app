import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface CardProps {
    label: string;
}

export const Header = ({ label }: CardProps) => {
    return (
        <div className="w-full flex flex-col gap-y-6 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold", font.className)}>
                {label}
            </h1>
        </div>
    );
};

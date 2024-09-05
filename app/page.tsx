import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import {cn} from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";


const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center bg-gradient-to-t from-slate-500-400 to-slate-900">
            {/* Contenu de votre composant */}
            <div className="space-y-6 text-center">
                <h1 className={cn("text-6xl font-semibold text-white drop-shadow-sm", font.className)}>
                    Auth
                </h1>
                <p>A simple authentication service</p>
                <div>
                  <LoginButton >
                  <Button variant="secondary" className="w-full">
                    Sign in
                  </Button>
                  </LoginButton>
                </div>
            </div>
        </main>
    );
}

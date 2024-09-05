import { Header } from "./header";
import { BackButton } from "@/components/auth/Back-button";
import {
   Card,
   CardFooter,
   CardHeader
} from "@/components/ui/card";


export const ErrorCard = () => {
    return  (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label='Oops! Somthing went wrong'/>
            </CardHeader>
            <CardFooter>
                <BackButton href="/auth/login" label="Back to login" />
            </CardFooter>
        </Card>
    )

}
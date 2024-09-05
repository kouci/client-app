import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextApiRequest } from "next";

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "./routes";
import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return true;
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("auth/login", nextUrl));
    }
    if (isPublicRoute) {
        return Response.redirect(new URL("auth/login", nextUrl));
    }
    return null;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

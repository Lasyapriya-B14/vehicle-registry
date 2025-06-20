import { getToken } from "next-auth/jwt";

import type { NextRequest } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const role = token?.role || null;
  const status = token?.status || null;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (token) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }
    return;
  }

  if (!token && !isPublicRoute) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (role == "ADMIN" && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/admin", request.url));
  }

  if (role !== "ADMIN" && request.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  if (token && status === "Incomplete" && role !== "ADMIN") {
    if (
      !request.nextUrl.pathname.startsWith("/api") &&
      request.nextUrl.pathname !== "/dashboard/profile" &&
      request.nextUrl.pathname !== "/"
    ) {
      return Response.redirect(new URL("/dashboard/profile", request.url));
    } else if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextUrl.pathname !== "/dashboard/profile" &&
      request.nextUrl.pathname !== "/"
    ) {
      return Response.redirect(new URL("/dashboard/profile", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

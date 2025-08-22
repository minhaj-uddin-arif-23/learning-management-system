import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isUserRoute = pathname.startsWith("/user");

  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

  if (!token && (isAdminRoute || isUserRoute)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};

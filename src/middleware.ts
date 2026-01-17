import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });


  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (!token && isDashboard) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("error", "login_required");
    return NextResponse.redirect(loginUrl);
  }

if (token && req.nextUrl.pathname === "/") {
  return NextResponse.redirect(new URL("/dashboard", req.url));
}


  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

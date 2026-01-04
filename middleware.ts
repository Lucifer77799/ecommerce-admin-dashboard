import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    try {
      const decoded = verifyToken(token);

      // Optional: role check
      if (decoded.role !== "admin") {
        return NextResponse.redirect(
          new URL("/login", req.url)
        );
      }
    } catch {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

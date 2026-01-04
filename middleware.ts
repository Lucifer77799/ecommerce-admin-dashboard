import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  // 1️⃣ Not logged in → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2️⃣ Logged in but not admin → block dashboard
  if (role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Protect ALL dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};

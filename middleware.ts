import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get("admin")?.value === "true";
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !isAdmin && req.nextUrl.pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

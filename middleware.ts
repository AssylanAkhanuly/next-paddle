import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are protected (require authentication)
  const isProtectedPath = path.startsWith("/dashboard")

  // Define which paths are auth paths (login, register)
  const isAuthPath = path === "/login" || path === "/register"

  const token = request.cookies.get("auth-token")?.value

  // Check if the user is authenticated
  const isAuthenticated = token ? verifyToken(token) : false

  // If the path is protected and the user is not authenticated, redirect to login
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If the user is authenticated and trying to access auth paths, redirect to dashboard
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Verify JWT token
function verifyToken(token: string) {
  try {
    verify(token, process.env.JWT_SECRET || "your-secret-key")
    return true
  } catch (error) {
    return false
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}

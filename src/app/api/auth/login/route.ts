import { NextResponse } from "next/server"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    // Find the user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Check if password matches
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Create a JWT token
    const token = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    // Set the token in a cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    // Return the user without the password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input data", errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

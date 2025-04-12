"use server"

import { cookies } from "next/headers"
import { hash, compare } from "bcrypt"
import { sign, verify } from "jsonwebtoken"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

type RegisterInput = z.infer<typeof registerSchema>

export async function register(input: RegisterInput) {
  try {
    // Validate input
    const { name, email, password } = registerSchema.parse(input)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    // Hash the password
    const hashedPassword = await hash(password, 10)

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Return success
    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof z.ZodError) {
      return { error: "Invalid input data" }
    }

    return { error: "Failed to register user" }
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type LoginInput = z.infer<typeof loginSchema>

export async function login(input: LoginInput) {
  try {
    // Validate input
    const { email, password } = loginSchema.parse(input)

    // Find the user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return { error: "Invalid email or password" }
    }

    // Check if password matches
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return { error: "Invalid email or password" }
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

    // Return success
    return { success: true }
  } catch (error) {
    console.error("Login error:", error)

    if (error instanceof z.ZodError) {
      return { error: "Invalid input data" }
    }

    return { error: "Failed to login" }
  }
}

export async function logout() {
  // Clear the auth token cookie
  cookies().delete("auth-token")
  redirect("/login")
}

export async function getUserFromToken() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      id: string
      email: string
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return user
  } catch (error) {
    return null
  }
}

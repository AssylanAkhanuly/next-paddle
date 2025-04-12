import type React from "react"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/dashboard" className="text-lg font-semibold">
            My App
          </Link>
        </div>
      </header>
      <main className="container px-4 py-6 md:px-6 md:py-8">{children}</main>
    </div>
  )
}

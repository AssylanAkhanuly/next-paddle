import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Welcome</h1>
          <p className="mt-3 text-slate-600">Sign in to your account or create a new one</p>
        </div>

        <div className="flex flex-col space-y-4">
          <Link href="/login" className="w-full">
            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </Link>
          <Link href="/register" className="w-full">
            <Button variant="outline" className="w-full" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

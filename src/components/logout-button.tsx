"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { logout } from "@/lib/auth-actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LogoutButton() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    setIsLoading(true)

    try {
      await logout()

      toast({
        title: "Success!",
        description: "You have been logged out successfully.",
      })

      // The logout function already redirects, but we'll refresh just in case
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleLogout} disabled={isLoading} className="w-full">
      {isLoading ? "Signing out..." : "Sign Out"}
    </Button>
  )
}

"use client"

// Simplified version of the toast hook
import { useState } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    setToasts((prev) => [...prev, props])

    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 3000)

    return props
  }

  return {
    toast,
    toasts,
  }
}

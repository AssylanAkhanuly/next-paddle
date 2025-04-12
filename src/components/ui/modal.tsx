"use client";

import { X } from "lucide-react";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Modal({
  isOpen,
  onClose,
  onOpen,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  className,
  size = "md",
}: ModalProps) {
  // Map size to width class
  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    full: "sm:max-w-screen-lg",
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        console.log(open)
        return open ? onOpen?.() : onClose();
      }}
    >
      <DialogContent
        className={cn("overflow-hidden p-0", sizeClasses[size], className)}
      >
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-6 w-6 rounded-full opacity-70 transition-opacity hover:opacity-100"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}

        {(title || description) && (
          <DialogHeader className="px-6 pt-6">
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className="px-6 py-4">{children}</div>

        {footer && <DialogFooter className="px-6 pb-6">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

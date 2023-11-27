import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-zinc-500 px-4 py-2.5 placeholder:text-neutral-400 tracking-wider flex w-full rounded-md sm:text-sm md:text-base lg:text-lg file:border-0 file:bg-transparent file:text-sm file:font-medium outline-0 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-cyan-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

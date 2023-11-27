"use client"

import * as React from "react"

import SVGGoogleIcon from '@/components/svg/google-icon'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoadingButton from '@/components/ui/loading-button'
import { cn } from "@/lib/utils"
import { Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const isLoading = false;

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1.5">
            <Label className="" htmlFor="email">
              E-mail
            </Label>
            <Input
              id="email"
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} className='border-b-2 border-transparent bg-white text-black hover:bg-zinc-300 hover:text-white hover:border-b-cyan-500'>
            <LoadingButton hasLoading={isLoading}>
              <Mail className='h-4 w-4 ' />
            </LoadingButton>
            Entre com E-mail
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-zinc-200">
            Ou continue com
          </span>
        </div>
      </div>

      <Button
        type="button"
        disabled={isLoading}
        className='bg-white text-black hover:brightness-100'
        onClick={() => signIn('google')}
      >
        <LoadingButton hasLoading={isLoading}>
          <SVGGoogleIcon />
        </LoadingButton>
        Google
      </Button>
    </div>
  )
}
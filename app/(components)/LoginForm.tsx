'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa6'
import { Button } from '@/components/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { twMerge } from 'tailwind-merge'

export default function LoginForm() {
  async function onClick(provider: 'google' | 'github') {
    await signIn(provider)
  }

  return (
    <Card className="w-80">
      <CardHeader className="text-center">
        <h1 className="text-[24px] tracking-[10px] font-bold">TODO</h1>
        <h2 className="text-sm font-normal text-lt_list_text_light dark:text-dt_list_text_light">
          Sign in to your account
        </h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-x-4">
          <IconButton onClick={() => onClick('google')}>
            <FcGoogle className="w-full h-full" />
          </IconButton>
          <IconButton onClick={() => onClick('github')}>
            <FaGithub className="w-full h-full" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  )
}

function IconButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <Button
      className={twMerge(
        'flex w-full h-10 px-2 py-2 items-center justify-center',
        'border border-lt_list_text/10 shadow-sm bg-transparent hover:bg-lt_veryLightGrayishBlue',
        'dark:bg-transparent dark:border dark:border-dt_list_text/25 dark:hover:bg-dt_list_bg'
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

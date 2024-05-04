import { signIn, signOut } from '@/auth'
import { Button } from '@/components/Button'

export function SignInButton({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn()
      }}
    >
      <Button className={className} type="submit">
        Sign in
      </Button>
    </form>
  )
}

export function SignOutButton({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button className={className} type="submit">
        Sign Out
      </button>
    </form>
  )
}

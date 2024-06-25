import { signIn, signOut } from '@/auth'
import { Button } from '@/components/Button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import LoginForm from '@/app/(components)/LoginForm'

export function SignInButton({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} type="submit">
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 w-auto bg-transparent border-none">
        <LoginForm />
      </DialogContent>
    </Dialog>
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

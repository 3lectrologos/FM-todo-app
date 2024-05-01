import { twJoin, twMerge } from 'tailwind-merge'
import ThemeToggle from '@/app/ThemeToggle'
import Link from 'next/link'
import { auth } from '@/auth'
import { SignInButton, SignOutButton } from '@/components/buttons'

export default function Title({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        `flex flex-row items-center justify-between`,
        className
      )}
    >
      <span
        className={`text-[26px] tracking-[10px] tablet:text-[40px] tablet:tracking-[15px] leading-[120%] font-bold text-white`}
      >
        TODO
      </span>
      <div className={`flex flex-row items-center gap-x-6`}>
        <ThemeToggle />
        <AuthMenu />
      </div>
    </div>
  )
}

async function AuthMenu({ className }: { className?: string }) {
  const session = await auth()

  if (session) {
    return (
      <div
        className={twJoin(
          `text-sm flex flex-row items-center gap-x-3`,
          `bg-lt_veryLightGray dark:bg-dt_list_bg pl-1.5 pr-2 py-1 rounded-l-[33px] rounded-r-lg`,
          className
        )}
      >
        <div className={`bg-slate-300 rounded-full overflow-hidden`}>
          {session.user?.image && (
            <img
              src={session.user?.image}
              alt={`user avatar`}
              width={40}
              height={40}
              referrerPolicy="no-referrer"
            />
          )}
        </div>
        <div
          className={`flex flex-col w-20 gap-y-1 items-center text-lt_list_text dark:text-dt_list_text`}
        >
          <span
            className={`text-xs font-medium text-slate-600 max-w-20 truncate`}
          >
            {session.user?.name ? session.user.name : 'anonymous'}
          </span>
          <SignOutButton
            className={twMerge(
              `text-xs w-20 px-2 py-0`,
              `bg-inherit dark:bg-inherit hover:bg-inherit dark:hover:bg-inherit hover:underline dark:hover:underline`,
              `text-lt_list_text dark:text-dt_list_text`
            )}
          />
        </div>
      </div>
    )
  }
  return (
    <div className={twMerge(``, className)}>
      <SignInButton />
    </div>
  )
}

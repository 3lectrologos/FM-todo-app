import { twJoin, twMerge } from 'tailwind-merge'
import ThemeToggle from '@/app/(theme)/ThemeToggle'
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
        className={`text-[26px] tracking-[10px] tablet:text-[40px] tablet:tracking-[15px] leading-[120%] pt-1.5 tablet:pt-2.5 font-bold text-white`}
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
          `text-sm flex flex-row items-center gap-x-1 tablet:gap-x-3`,
          `bg-lt_veryLightGray dark:bg-dt_list_bg rounded-l-[33px] rounded-r-md`,
          `p-1.5 tablet:p-2`,
          className
        )}
      >
        <div
          className={twMerge(
            `bg-slate-300 rounded-full overflow-hidden`,
            `w-6 h-6 tablet:w-10 tablet:h-10`
          )}
        >
          {session.user?.image && (
            <img
              src={session.user?.image}
              alt={`user avatar`}
              referrerPolicy="no-referrer"
            />
          )}
        </div>
        <div
          className={`flex flex-col w-14 tablet:w-20 gap-y-0 tablet:gap-y-0.5 items-center text-lt_list_text dark:text-dt_list_text`}
        >
          <span
            className={`text-xs font-medium text-slate-600 max-w-20 truncate hidden tablet:block`}
          >
            {session.user?.name ? session.user.name : 'anonymous'}
          </span>
          <SignOutButton
            className={twMerge(
              `hover:underline active:underline`,
              `text-lt_list_text dark:text-dt_list_text`,
              `font-medium text-xs tablet:text-sm pt-1 tablet:pt-0`
            )}
          />
        </div>
      </div>
    )
  }
  return (
    <div className={twMerge(``, className)}>
      <SignInButton className={``} />
    </div>
  )
}

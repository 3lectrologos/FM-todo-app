import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          `bg-lt_veryLightGray font-medium rounded-md`,
          `hover:bg-lt_veryLightGrayishBlue transition-colors active:scale-95`,
          `dark:bg-dt_list_bg dark:text-dt_lightGrayishBlue dark:hover:bg-dt_list_bg/80`,
          `text-[13px] tablet:text-[14px] leading-[120%] tracking-[-0.2px]`,
          `text-lt_list_text dark:text-dt_list_text`,
          `px-3 py-2 tablet:px-4 tablet:py-2.5`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }

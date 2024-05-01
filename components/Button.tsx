import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          `bg-lt_veryLightGray textStyle-normal font-medium rounded-md px-3 py-2`,
          `hover:bg-lt_veryLightGrayishBlue transition-colors active:scale-95`,
          `dark:bg-dt_list_bg dark:text-dt_lightGrayishBlue dark:hover:bg-dt_list_bg/80`,
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

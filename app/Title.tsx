import { twMerge } from 'tailwind-merge'

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
      <div>TB</div>
    </div>
  )
}

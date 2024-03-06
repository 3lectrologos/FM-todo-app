import { twMerge } from 'tailwind-merge'
import { RxPlus } from 'react-icons/rx'
import { useState } from 'react'

export default function NewItem({
  className,
  onAdd,
}: {
  className?: string
  onAdd: (_text: string) => void
}) {
  const [text, setText] = useState('')

  function handleAdd() {
    if (!text) return
    onAdd(text)
    setText('')
  }

  return (
    <div className={twMerge(`relative w-full`, className)}>
      <div
        className={twMerge(
          `absolute top-1/2 -translate-y-1/2 left-5 tablet:left-6`,
          `w-5 h-5 tablet:w-6 tablet:h-6 rounded-full`,
          `border border-lt_circle_gray dark:border-dt_circle_gray`
        )}
      />
      <input
        className={twMerge(
          `w-full h-12 tablet:h-16 flex-grow pl-[52px] tablet:pl-[72px] pr-16 tablet:pr-20`,
          `bg-white dark:bg-dt_list_bg rounded-[5px]`,
          `text-lt_list_text dark:text-dt_list_text textStyle-list`,
          `placeholder-lt_list_text_light dark:placeholder-dt_list_text_light`,
          `shadow-lt_list dark:shadow-dt_list`,
          `outline-none focus-visible:ring-2 focus-visible:ring-lt_list_text dark:focus-visible:ring-dt_list_text_light`
        )}
        type="text"
        placeholder="Create a new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAdd()
          }
        }}
      />
      <button
        className={twMerge(
          `absolute top-1/2 -translate-y-1/2 right-4 tablet:right-5`,
          `flex items-center justify-center w-5 h-5 tablet:w-7 tablet:h-7 rounded-md tablet:rounded-lg`,
          `bg-lt_darkGrayishBlue/5`,
          `border border-lt_list_text_light/50 dark:border-dt_list_text_light/50`,
          `transition-colors hover:bg-lt_darkGrayishBlue/15 active:scale-90`
        )}
        onClick={() => handleAdd()}
      >
        <RxPlus
          className={`w-4 h-4 tablet:w-6 tablet:h-6 text-lt_list_text_light dark:border-dt_list_text_light`}
        />
      </button>
    </div>
  )
}

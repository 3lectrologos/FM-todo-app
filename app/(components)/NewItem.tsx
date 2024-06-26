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
          `w-full h-12 tablet:h-16 flex-grow pl-[52px] tablet:pl-[72px] pr-14 tablet:pr-20`,
          `bg-white dark:bg-dt_list_bg rounded-[5px]`,
          `text-lt_list_text dark:text-dt_list_text textStyle-list`,
          `placeholder-lt_list_text_light dark:placeholder-dt_list_text_light`,
          `border border-lt_list_text_light/5 dark:border-dt_list_text_light/5`,
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
          `absolute top-1/2 -translate-y-1/2 right-5 tablet:right-6`,
          `flex items-center justify-center w-5 h-5 tablet:w-[26px] tablet:h-[26px]  rounded-md tablet:rounded-lg`,
          `bg-lt_list_text_light/35`,
          `transition-colors hover:bg-lt_list_text_light/60 active:scale-90`
        )}
        onClick={() => handleAdd()}
        aria-label="Add item"
      >
        <RxPlus
          className={`w-4 h-4 tablet:w-5 tablet:h-5 text-white dark:text-dt_pattern_bg`}
        />
      </button>
    </div>
  )
}

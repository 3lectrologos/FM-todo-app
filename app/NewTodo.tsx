import { twMerge } from 'tailwind-merge'
import { RxPlus } from 'react-icons/rx'
import { useState } from 'react'

export default function NewTodo({
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
          `w-full h-12 tablet:h-16 flex-grow pl-[52px] tablet:pl-[72px] pr-5 tablet:pr-6`,
          `bg-white dark:bg-dt_list_bg rounded-[5px]`,
          `text-lt_list_text dark:text-dt_list_text text-[12px] tracking-[-0.167px] tablet:text-[18px] tablet:tracking-[-0.25px]`,
          `shadow-lt_list dark:shadow-dt_list`
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
          `flex items-center justify-center w-6 h-6 tablet:w-8 tablet:h-8 rounded-lg`,
          `bg-lt_darkGrayishBlue/5`,
          `border border-lt_circle_gray dark:border-dt_circle_gray`
        )}
        onClick={() => handleAdd()}
      >
        <RxPlus className={`w-6 h-6 text-lt_veryDarkGrayishBlue`} />
      </button>
    </div>
  )
}

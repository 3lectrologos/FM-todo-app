import { twMerge } from 'tailwind-merge'
import { RxCross2 } from 'react-icons/rx'
import { useMotionValue } from 'framer-motion'
import { useRaisedShadow } from '@/app/useRaisedShadow'
import { motion, Reorder } from 'framer-motion'
import { useState } from 'react'

export default function Item({
  item,
  index,
  className,
  removeItem,
  toggleCompleted,
  animationDuration,
}: {
  item: TodoItem
  index: number
  className?: string
  removeItem: (id: string) => void
  toggleCompleted: (id: string) => void
  animationDuration: number
}) {
  const y = useMotionValue(0)
  const { boxShadow } = useRaisedShadow(y)
  const [dragging, setDragging] = useState(false)

  return (
    <motion.div
      className={twMerge(
        `group`,
        index === 0 ? `rounded-t-[5px]` : ``,
        className
      )}
      exit={{ scaleX: 0.8, scaleY: 0, opacity: 0 }}
      transition={{ duration: animationDuration }}
    >
      <Reorder.Item
        className={twMerge(
          `overflow-hidden tablet:h-16`,
          index === 0 ? `rounded-t-[5px]` : ``
        )}
        value={item}
        transition={{ duration: animationDuration }}
        style={{ position: 'relative', y, boxShadow }}
        layout="position"
        onDragStart={() => {
          setDragging(true)
        }}
        onDragEnd={() => {
          setDragging(false)
        }}
      >
        <ItemBody
          item={item}
          removeItem={removeItem}
          layout="position"
          toggleCompleted={toggleCompleted}
          moving={dragging}
        />
      </Reorder.Item>
    </motion.div>
  )
}

function ItemBody({
  item,
  removeItem,
  toggleCompleted,
  moving,
  ...props
}: {
  item: TodoItem
  removeItem: (id: string) => void
  toggleCompleted: (id: string) => void
  moving: boolean
  [_key: string]: any
}) {
  return (
    <motion.div className={`relative w-full`} {...props}>
      <button
        className={twMerge(
          `absolute top-1/2 -translate-y-1/2 left-5 tablet:left-6`,
          `w-5 h-5 tablet:w-6 tablet:h-6 rounded-full`,
          `border border-lt_circle_gray dark:border-dt_circle_gray`,
          item.completed && `border-none`
        )}
        onClick={() => toggleCompleted(item.id)}
      >
        {item.completed && <CompletedSVG />}
      </button>
      <div
        className={twMerge(
          `w-full bg-white dark:bg-dt_list_bg flex items-center h-12 tablet:h-16 pl-[52px] tablet:pl-[72px] pr-16 tablet:pr-20`,
          `textStyle-list text-lt_list_text dark:text-dt_list_text`
        )}
      >
        <p
          className={twMerge(
            `truncate transition-colors duration-500`,
            item.completed &&
              `text-lt_list_text_extra_light dark:text-dt_list_text_extra_light line-through`
          )}
        >
          {item.text}
        </p>
      </div>
      <button
        className={twMerge(
          `absolute top-1/2 -translate-y-1/2 right-5 tablet:right-6`,
          `flex items-center justify-center w-4 h-4 tablet:w-6 tablet:h-6 rounded-lg`,
          `tablet:bg-lt_darkGrayishBlue/5`,
          `tablet:border tablet:border-lt_list_text_light/50 tablet:dark:border-dt_list_text_light/50`,
          `tablet:scale-0 tablet:opacity-0`,
          `tablet:group-hover:scale-100 tablet:group-hover:opacity-100`,
          `tablet:hover:bg-highlight/15`,
          `tablet:[transition:transform_0.15s_0.05s,opacity_0.15s_0.05s,background-color_0.15s_0s]`,
          `active:scale-90`,
          moving && `hidden`
        )}
        onClick={() => removeItem(item.id)}
      >
        <RxCross2
          className={`w-4 h-4 text-lt_list_text_light dark:text-dt_list_text_light`}
        />
      </button>
    </motion.div>
  )
}

function CompletedSVG() {
  const initDuration = 0.25

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: initDuration },
        scale: { duration: initDuration, type: 'spring', bounce: 0.7 },
      }}
    >
      <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_267)" />
      <motion.path
        d="M8 12.3041L10.6959 15L16.6959 9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: {
            delay: initDuration * 0.75,
            duration: 0.25,
            ease: 'easeInOut',
          },
          opacity: { delay: initDuration * 0.75, duration: 0.01 },
        }}
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_267"
          x1="-12"
          y1="12"
          x2="12"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#55DDFF" />
          <stop offset="1" stopColor="#C058F3" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}

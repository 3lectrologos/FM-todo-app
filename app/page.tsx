'use client'

import Title from '@/app/Title'
import NewTodo from '@/app/NewTodo'
import { useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { motion, Reorder } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { RxCross2 } from 'react-icons/rx'
import { GiPartyPopper } from 'react-icons/gi'

type ItemContent = { id: number; text: string; completed: boolean }

export default function Home() {
  const [items, setItems] = useState<ItemContent[]>([])

  const MAX_ID = 10000
  const [idPool, setIdPool] = useState(
    new Set(Array.from({ length: MAX_ID }, (_, i) => i))
  )

  function addItem(text: string) {
    const minUniqueID = idPool.values().next().value
    setIdPool((idPool) => {
      idPool.delete(minUniqueID)
      return idPool
    })
    setItems((items) => [...items, { id: minUniqueID, text, completed: false }])
  }

  function toggleCompleted(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  function removeItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id))
    setIdPool((idPool) => {
      idPool.add(id)
      return idPool
    })
  }

  const layoutDuration = 0.1

  return (
    <main
      className={`flex-grow flex flex-col w-full py-12 px-6 tablet:px-0 tablet:py-[70px] tablet:w-[540px]`}
    >
      <Title className={`mb-8 tablet:mb-10`} />
      <NewTodo className={`mb-4 tablet:mb-6`} onAdd={addItem} />
      <LayoutGroup id="todo-list">
        <motion.div
          className={twMerge(
            `bg-lt_circle_gray dark:bg-dt_circle_gray rounded-[5px]`,
            `shadow-lt_list dark:shadow-dt_list`
          )}
          layout
          transition={{ duration: layoutDuration }}
        >
          {items.length === 0 && (
            <div
              className={`flex flex-row gap-x-3 h-24 text-lt_list_text_light dark:text-dt_list_text_light items-center justify-center mb-px rounded-t-[5px]`}
            >
              <span>Looks like you have nothing left to do!</span>
              <GiPartyPopper className={`w-5 h-5`} />
            </div>
          )}
          {items.length > 0 && (
            <ItemList
              items={items}
              setItems={setItems}
              toggleCompleted={toggleCompleted}
              removeItem={removeItem}
              animationDuration={layoutDuration}
            />
          )}
          <motion.div>
            <motion.div
              className={twMerge(
                `w-full bg-white dark:bg-dt_list_bg h-[50px] max-h-16 flex flex-row items-center px-6`,
                `rounded-b-[5px]`
              )}
              layout
              transition={{ duration: layoutDuration }}
            >
              <span
                className={`text-center text-[14px] leading-[120%] tracking-[-0.2px] text-lt_list_text_very_light dark:text-dt_list_text_very_light`}
              >
                {items.length} items left
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutGroup>
    </main>
  )
}

function ItemList({
  items,
  setItems,
  toggleCompleted,
  removeItem,
  animationDuration,
}: {
  items: ItemContent[]
  setItems: (items: ItemContent[]) => void
  toggleCompleted: (id: number) => void
  removeItem: (id: number) => void
  animationDuration: number
}) {
  return (
    <Reorder.Group
      className={`flex flex-col gap-y-px mb-px`}
      axis="y"
      values={items}
      onReorder={setItems}
    >
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            className={twMerge(``, index === 0 ? `rounded-t-[5px]` : ``)}
            key={item.id}
            exit={{ scaleX: 0.8, scaleY: 0, opacity: 0 }}
            transition={{ duration: animationDuration }}
          >
            <Reorder.Item
              className={twMerge(
                `overflow-hidden cursor-grab tablet:h-16`,
                index === 0 ? `rounded-t-[5px]` : ``
              )}
              value={item}
              transition={{ duration: animationDuration }}
              style={{ position: 'relative' }}
              layout="position"
            >
              <ItemBody
                item={item}
                removeItem={removeItem}
                layout="position"
                toggleCompleted={toggleCompleted}
              />
            </Reorder.Item>
          </motion.div>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  )
}

function ItemBody({
  item,
  removeItem,
  toggleCompleted,
  ...props
}: {
  item: ItemContent
  removeItem: (id: number) => void
  toggleCompleted: (id: number) => void
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
        {item.id} --
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
          `flex items-center justify-center w-6 h-6 tablet:w-6 tablet:h-6 rounded-lg`,
          `bg-lt_darkGrayishBlue/5`,
          `border border-lt_list_text_light/50 dark:border-dt_list_text_light/50`,
          `transition-colors hover:bg-highlight/25 active:scale-90`
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

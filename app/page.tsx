'use client'

import Title from '@/app/Title'
import NewTodo from '@/app/NewTodo'
import { useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { motion, Reorder } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

type ItemContent = { id: number; text: string }

export default function Home() {
  const [items, setItems] = useState<ItemContent[]>(
    Array.from({ length: 1 }, (_, i) => ({
      id: i,
      text: `Item ${i}`,
    }))
  )

  function addItem(text: string) {
    setItems((items) => [...items, { id: items.length, text }])
  }

  function removeItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  const layoutDuration = 0.1

  return (
    <main
      className={`flex-grow flex flex-col w-full py-12 px-6 tablet:px-0 tablet:py-[70px] tablet:w-[540px]`}
    >
      <Title className={`mb-8 tablet:mb-10`} />
      <NewTodo className={`mb-8 tablet:mb-10`} onAdd={addItem} />
      <LayoutGroup id="todo-list">
        <motion.div
          className={twMerge(
            `bg-lt_circle_gray rounded-[5px]`,
            `shadow-lt_list dark:shadow-dt_list`
          )}
          layout
          transition={{ duration: layoutDuration }}
        >
          {items.length === 0 && (
            <div
              className={`flex flex-col h-24 bg-white/50 text-lt_list_text/50 items-center justify-center mb-px rounded-t-[5px]`}
            >
              Looks like you have nothing to do!
            </div>
          )}
          {items.length > 0 && (
            <ItemList
              items={items}
              setItems={setItems}
              removeItem={removeItem}
              animationDuration={layoutDuration}
            />
          )}
          <motion.div>
            <motion.div
              className={twMerge(
                `w-full bg-white h-16 max-h-16 flex flex-row justify-center items-center px-6`,
                `rounded-b-[5px]`
              )}
              layout
              transition={{ duration: layoutDuration }}
            >
              <span className={`text-center`}>{`options`}</span>
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
  removeItem,
  animationDuration,
}: {
  items: ItemContent[]
  setItems: (items: ItemContent[]) => void
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
              <ItemBody item={item} removeItem={removeItem} layout="position" />
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
  ...props
}: {
  item: ItemContent
  removeItem: (id: number) => void
  [_key: string]: any
}) {
  return (
    <motion.div
      className={`w-full bg-white h-16 max-h-16 flex flex-row justify-between items-center px-6`}
      {...props}
    >
      <span>{item.text}</span>
      <button className={`w-6 h-6`} onClick={() => removeItem(item.id)}>
        x
      </button>
    </motion.div>
  )
}

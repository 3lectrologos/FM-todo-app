'use client'

import Title from '@/app/Title'
import NewTodo from '@/app/NewTodo'
import { useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { motion, Reorder } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

export default function Home() {
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => String(i))
  )

  function removeItem(id: string) {
    setItems((items) => items.filter((item) => item !== id))
  }

  const layoutDuration = 0.2

  return (
    <main
      className={`flex flex-col w-full py-12 px-6 tablet:px-0 tablet:py-[70px] tablet:w-[540px]`}
    >
      <Title className={`mb-8 tablet:mb-10`} />
      <NewTodo className={`mb-8 tablet:mb-10`} />
      <LayoutGroup id="todo-list">
        <motion.div
          className={twMerge(
            `bg-lt_circle_gray rounded-[5px]`
            //`shadow-lt_list dark:shadow-dt_list`
          )}
          layout
          transition={{ duration: layoutDuration }}
          style={{
            boxShadow: '35px 35px 50px -15px rgba(194, 195, 214, 0.8)',
          }}
        >
          <motion.div
            className={`flex flex-col gap-y-px`}
            layout
            transition={{ duration: layoutDuration }}
            //axis="y"
            //values={items}
            //onReorder={setItems}
          >
            <AnimatePresence>
              {items.map((id, index) => (
                <motion.div
                  layout="position"
                  key={id}
                  //value={id}
                  exit={{ scaleX: 0.8, scaleY: 0, opacity: 0 }}
                  transition={{ duration: layoutDuration }}
                  style={{ position: 'relative' }}
                >
                  <div
                    key={id}
                    className={twMerge(
                      `grow-0 flex flex-row items-center justify-between w-full tablet:h-16 px-4 bg-white text-dt_veryDarkDesaturatedBlue`,
                      //`border-b border-lt_circle_gray dark:border-dt_circle_gray`,
                      `cursor-grab`,
                      index === 0 ? `rounded-t-[5px]` : ``
                    )}
                  >
                    <span className={`text-dt_veryDarkDesaturatedBlue`}>
                      Hello, this is {id}
                    </span>
                    <button onClick={() => removeItem(id)}>x</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div
            layout="position"
            transition={{ duration: layoutDuration }}
            className={`h-[50px] rounded-b-[5px] bg-white mt-px`}
          ></motion.div>
        </motion.div>
      </LayoutGroup>
    </main>
  )
}

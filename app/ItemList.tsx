import { useMemo, useState } from 'react'
import { LayoutGroup, motion, Reorder, AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { GiPartyPopper } from 'react-icons/gi'
import Item from '@/app/Item'

type ListMode = 'all' | 'active' | 'completed'

export default function ItemList({
  className = '',
  items,
  toggleCompleted,
  removeItem,
  setItems,
  clearCompleted,
  animationDuration = 0.1,
}: {
  className?: string
  items: ItemContent[]
  toggleCompleted: (id: number) => void
  removeItem: (id: number) => void
  setItems: (items: ItemContent[]) => void
  clearCompleted: () => void
  animationDuration?: number
}) {
  const [listMode, setListMode] = useState<ListMode>('all')
  const activeItems = useMemo(
    () => items.filter((item) => !item.completed),
    [items]
  )
  const completedItems = useMemo(
    () => items.filter((item) => item.completed),
    [items]
  )
  const shownItems = useMemo(() => {
    if (listMode === 'active') return activeItems
    if (listMode === 'completed') return completedItems
    return items
  }, [listMode, items, activeItems, completedItems])

  return (
    <LayoutGroup id="todo-list">
      <motion.div
        className={twMerge(
          `relative flex flex-col bg-lt_circle_gray dark:bg-dt_circle_gray rounded-[5px] pb-[50px]`,
          `shadow-lt_list dark:shadow-dt_list`,
          className
        )}
        layout
        transition={{ duration: animationDuration }}
      >
        {shownItems.length === 0 && (
          <div
            className={`flex-grow flex flex-row gap-x-3 text-lt_list_text_light dark:text-dt_list_text_light items-center justify-center mb-px rounded-t-[5px]`}
          >
            <span>Looks like you have nothing left to do!</span>
            <GiPartyPopper className={`w-5 h-5`} />
          </div>
        )}
        {shownItems.length > 0 && (
          <Reorder.Group
            className={`flex flex-col gap-y-px mb-px`}
            axis="y"
            values={shownItems}
            onReorder={(orderedItems) => {
              setItems(reorderItems(items, orderedItems, listMode))
            }}
          >
            <AnimatePresence>
              {shownItems.map((item, index) => (
                <Item
                  item={item}
                  index={index}
                  removeItem={removeItem}
                  toggleCompleted={toggleCompleted}
                  animationDuration={animationDuration}
                  key={item.id}
                />
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
        <ListFooter
          className={`absolute bottom-0 h-[50px]`}
          animationDuration={animationDuration}
          listMode={listMode}
          setListMode={setListMode}
          clearCompleted={clearCompleted}
          activeLength={activeItems.length}
        />
      </motion.div>
    </LayoutGroup>
  )
}

function ListFooter({
  className = '',
  animationDuration,
  listMode,
  setListMode,
  clearCompleted,
  activeLength,
}: {
  className?: string
  animationDuration: number
  listMode: ListMode
  setListMode: (mode: ListMode) => void
  clearCompleted: () => void
  activeLength: number
}) {
  return (
    <motion.div
      className={twMerge(
        `w-full bg-white dark:bg-dt_list_bg flex flex-row justify-between items-center px-6`,
        `rounded-b-[5px]`,
        `text-[14px] leading-[120%] tracking-[-0.2px] text-lt_list_text_very_light dark:text-dt_list_text_very_light`,
        className
      )}
      layout
      transition={{ duration: animationDuration }}
    >
      <span className={``}>
        {activeLength} {activeLength === 1 ? 'item' : 'items'} left
      </span>
      <div className={`flex flex-row gap-x-5 justify-center items-center`}>
        <TextButton
          className={`font-bold`}
          active={listMode === 'all'}
          onClick={() => {
            setListMode('all')
          }}
        >
          All
        </TextButton>
        <TextButton
          className={`font-bold`}
          active={listMode === 'active'}
          onClick={() => {
            setListMode('active')
          }}
        >
          Active
        </TextButton>
        <TextButton
          className={`font-bold`}
          active={listMode === 'completed'}
          onClick={() => {
            setListMode('completed')
          }}
        >
          Completed
        </TextButton>
      </div>
      <TextButton onClick={clearCompleted}>Clear Completed</TextButton>
    </motion.div>
  )
}

function TextButton({
  className = '',
  active = false,
  onClick,
  children,
}: {
  className?: string
  active?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      className={twMerge(
        `text-[14px] leading-[120%] tracking-[-0.2px] text-lt_list_text_very_light dark:text-dt_list_text_very_light`,
        !active &&
          `transition-colors hover:text-lt_list_text dark:hover:text-lt_circle_gray active:opacity-90 active:scale-95`,
        active && `text-active dark:text-active`,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function reorderItems(
  items: ItemContent[],
  orderedItems: ItemContent[],
  mode: ListMode
): ItemContent[] {
  if (mode === 'all') {
    return orderedItems
  } else if (mode === 'active') {
    const orderedIterator = orderedItems.values()
    return items.map((item) =>
      item.completed ? item : orderedIterator.next().value
    )
  } else if (mode === 'completed') {
    const orderedIterator = orderedItems.values()
    return items.map((item) =>
      !item.completed ? item : orderedIterator.next().value
    )
  }
  return items
}

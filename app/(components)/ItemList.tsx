import { useMemo, useState } from 'react'
import { LayoutGroup, motion, Reorder, AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { GiPartyPopper } from 'react-icons/gi'
import Item from '@/app/(components)/Item'

type ListMode = 'all' | 'active' | 'completed'

export default function ItemList({
  className = '',
  items,
  toggleCompleted,
  removeItem,
  reorderItem,
  clearCompleted,
  animationDuration = 0.1,
}: {
  className?: string
  items: TodoItem[]
  toggleCompleted: (id: string) => void
  removeItem: (id: string) => void
  reorderItem: (id: string, oldIndex: number, newIndex: number) => void
  clearCompleted: () => void
  animationDuration?: number
}) {
  const [listMode, setListMode] = useState<ListMode>('all')
  const [orderedItems, setOrderedItems] = useState<TodoItem[]>(items)
  const activeItems = useMemo(
    () => orderedItems.filter((item) => !item.completed),
    [orderedItems]
  )
  const completedItems = useMemo(
    () => orderedItems.filter((item) => item.completed),
    [orderedItems]
  )
  const shownItems = useMemo(() => {
    if (listMode === 'active') return activeItems
    if (listMode === 'completed') return completedItems
    return orderedItems
  }, [listMode, orderedItems, activeItems, completedItems])

  // NOTE: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevItems, setPrevItems] = useState<TodoItem[]>(items)
  if (items !== prevItems) {
    setPrevItems(items)
    setOrderedItems(items)
  }

  function handleReorderBackend() {
    const indices = getReorderedIndex(items, orderedItems, listMode)
    if (!indices) return
    reorderItem(items[indices.oldIndex].id, indices.oldIndex, indices.newIndex)
  }

  return (
    <LayoutGroup id="todo-list">
      <motion.div
        className={twMerge(
          `relative flex flex-col rounded-[5px] pb-[50px]`,
          `border border-lt_list_text_light/5 dark:border-dt_list_text_light/5`,
          `shadow-lt_list dark:shadow-dt_list`,
          `bg-lt_veryLightGrayishBlue dark:bg-dt_pattern_bg`,
          className
        )}
        layout
        transition={{ duration: animationDuration }}
      >
        <div
          className={`absolute w-full h-full rounded-[5px] diag-pattern opacity-20`}
        >
          <div
            className={twMerge(
              `w-full h-full rounded-[5px] bg-gradient-to-b`,
              `from-lt_veryLightGrayishBlue from-60% to-100%`,
              `dark:from-dt_circle_gray dark:from-60% dark:to-100%`
            )}
          ></div>
        </div>
        {shownItems.length === 0 && (
          <div
            className={`flex-grow flex flex-col gap-y-2 text-lt_list_text_light dark:text-dt_list_text_light items-center justify-center rounded-t-[5px] px-8 py-6 textStyle-normal`}
          >
            <span
              className={twMerge(`text-center text-[12px] tablet:text-[14px]`)}
            >
              Looks like you have nothing left to do!
            </span>
            <GiPartyPopper
              className={`w-6 h-6 tablet:w-8 tablet:h-8 inline-block`}
            />
          </div>
        )}
        {shownItems.length > 0 && (
          <Reorder.Group
            className={`flex flex-col gap-y-px mb-px`}
            axis="y"
            values={shownItems}
            onReorder={(subItems) => {
              const newItems = getReorderedItems(
                orderedItems,
                subItems,
                listMode
              )
              setOrderedItems(newItems)
            }}
            onMouseUp={handleReorderBackend}
            onTouchEnd={handleReorderBackend}
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
        `relative w-full bg-white dark:bg-dt_list_bg flex flex-row justify-between items-center px-6`,
        `rounded-b-[5px]`,
        `textStyle-normal text-lt_list_text_very_light dark:text-dt_list_text_very_light`,
        className
      )}
      layout
      transition={{ duration: animationDuration }}
    >
      <span className={`text-[12px] tablet:text-[14px]`}>
        {activeLength} {activeLength === 1 ? 'item' : 'items'} left
      </span>
      <div
        className={twMerge(
          `flex flex-row gap-x-5 justify-center items-center`,
          `absolute w-full h-12 bg-white dark:bg-dt_list_bg -bottom-4 translate-y-full left-1/2 -translate-x-1/2 rounded-[5px]`,
          `shadow-lt_list dark:shadow-dt_list tablet:drop-shadow-none`,
          `tablet:w-auto tablet:bg-none tablet:h-auto tablet:bottom-auto tablet:translate-y-0`
        )}
      >
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
      <TextButton
        className={`text-[12px] tablet:text-[14px]`}
        onClick={clearCompleted}
      >
        Clear Completed
      </TextButton>
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
        `text-lt_list_text_very_light dark:text-dt_list_text_very_light`,
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

function getReorderedIndex(
  items: TodoItem[],
  orderedItems: TodoItem[],
  mode: ListMode
) {
  const newItems = getReorderedItems(items, orderedItems, mode)
  return getMovedItemIndex(items, newItems)
}

function getReorderedItems(
  items: TodoItem[],
  orderedItems: TodoItem[],
  mode: ListMode
) {
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

// Get the old and new index of the first item that changed position
function getMovedItemIndex(oldItems: TodoItem[], newItems: TodoItem[]) {
  // Find the first and last index where the items of oldItems and newItems differ
  const firstIndex = oldItems.findIndex(
    (item, index) => item !== newItems[index]
  )
  let lastIndex = -1
  for (let i = oldItems.length - 1; i >= 0; i--) {
    if (oldItems[i] !== newItems[i]) {
      lastIndex = i
      break
    }
  }

  if (firstIndex === -1 || lastIndex === -1) return undefined

  // Figure out if it was the first or last item that changed position
  console.log(firstIndex, lastIndex)
  if (
    newItems.findIndex((item) => item === oldItems[firstIndex]) === lastIndex
  ) {
    return {
      oldIndex: firstIndex,
      newIndex: lastIndex,
    }
  } else if (
    newItems.findIndex((item) => item === oldItems[lastIndex]) === firstIndex
  ) {
    return {
      oldIndex: lastIndex,
      newIndex: firstIndex,
    }
  } else {
    throw new Error('Invalid reorder. Did more than one item change position?')
  }
}

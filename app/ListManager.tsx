'use client'

import NewItem from '@/app/(components)/NewItem'
import { useState } from 'react'
import ItemList from '@/app/(components)/ItemList'
import { twMerge } from 'tailwind-merge'
import { createId } from '@paralleldrive/cuid2'
import { createItem } from '@/app/itemActions'

export default function ListManager({
  className,
  list,
}: {
  className?: string
  list: TodoItem[]
}) {
  const [items, setItems] = useState<TodoItem[]>(list)

  async function addItem(text: string) {
    const item: TodoItem = {
      id: createId(),
      order: items.length,
      text,
      completed: false,
    }
    await createItem(item)
    setItems((items) => [...items, item])
  }

  function toggleCompleted(id: string) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  function removeItem(id: string) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function clearCompleted() {
    setItems((items) => items.filter((item) => !item.completed))
  }

  return (
    <div className={twMerge(`flex flex-col`, className)}>
      <NewItem className={`mb-4 tablet:mb-6`} onAdd={addItem} />
      <ItemList
        className={`flex-grow`}
        items={items}
        toggleCompleted={toggleCompleted}
        removeItem={removeItem}
        setItems={setItems}
        clearCompleted={clearCompleted}
        animationDuration={0.1}
      />
    </div>
  )
}

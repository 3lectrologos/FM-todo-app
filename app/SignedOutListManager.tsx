'use client'

import ItemList from '@/app/(components)/ItemList'
import { twMerge } from 'tailwind-merge'
import NewItem from '@/app/(components)/NewItem'
import { useState } from 'react'
import { createId } from '@paralleldrive/cuid2'

export function SignedOutListManager({ className }: { className?: string }) {
  const [items, setItems] = useState<TodoItem[]>([])

  function addItem(text: string) {
    const id = createId()
    setItems([...items, { id, text, completed: false, lexorank: '' }])
  }

  function removeItem(id: string) {
    setItems(items.filter((item) => item.id !== id))
  }

  function toggleCompleted(id: string) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  function clearCompleted() {
    setItems(items.filter((item) => !item.completed))
  }

  function reorderItem(id: string, oldIndex: number, newIndex: number) {
    const newItems = [...items]
    const [removed] = newItems.splice(oldIndex, 1)
    newItems.splice(newIndex, 0, removed)
    setItems(newItems)
  }

  return (
    <div className={twMerge(`flex flex-col`, className)}>
      <NewItem className={`mb-4 tablet:mb-6`} onAdd={addItem} />
      <ItemList
        className={`flex-grow`}
        items={items}
        toggleCompleted={toggleCompleted}
        removeItem={removeItem}
        reorderItem={reorderItem}
        clearCompleted={clearCompleted}
        animationDuration={0.1}
      />
    </div>
  )
}

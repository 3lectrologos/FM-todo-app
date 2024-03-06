'use client'

import NewItem from '@/app/NewItem'
import { useState } from 'react'
import ItemList from '@/app/ItemList'
import { twMerge } from 'tailwind-merge'

export default function ListManager({ className }: { className?: string }) {
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

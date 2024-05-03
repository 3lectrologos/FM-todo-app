'use client'

import NewItem from '@/app/(components)/NewItem'
import ItemList from '@/app/(components)/ItemList'
import { twMerge } from 'tailwind-merge'
import { createId } from '@paralleldrive/cuid2'
import {
  createItem,
  deleteCompletedItems,
  deleteItem,
  updateItem,
} from '@/app/itemActions'
import { LexoRank } from 'lexorank'

export default function ListManager({
  className,
  list,
}: {
  className?: string
  list: TodoItem[]
}) {
  async function addItem(text: string) {
    const newLexoRank =
      list.length === 0
        ? LexoRank.middle()
        : LexoRank.parse(list[list.length - 1].lexorank).genNext()
    const item: TodoItem = {
      id: createId(),
      lexorank: newLexoRank.toString(),
      text,
      completed: false,
    }
    console.log(item)
    await createItem(item)
  }

  async function toggleCompleted(id: string) {
    const item = list.find((item) => item.id === id)
    if (!item) {
      throw new Error(`Item with id ${id} not found`)
    }
    await updateItem({ ...item, completed: !item.completed })
  }

  async function removeItem(id: string) {
    await deleteItem(id)
  }

  async function clearCompleted() {
    await deleteCompletedItems()
  }

  return (
    <div className={twMerge(`flex flex-col`, className)}>
      <NewItem className={`mb-4 tablet:mb-6`} onAdd={addItem} />
      <ItemList
        className={`flex-grow`}
        items={list}
        toggleCompleted={toggleCompleted}
        removeItem={removeItem}
        clearCompleted={clearCompleted}
        animationDuration={0.1}
      />
    </div>
  )
}

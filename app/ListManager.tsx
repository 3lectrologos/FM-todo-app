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
import { startTransition, useOptimistic } from 'react'

type AddAction = {
  type: 'add'
  item: TodoItem
}

type RemoveAction = {
  type: 'remove'
  id: string
}

type ClearCompletedAction = {
  type: 'clearCompleted'
}

type ToggleCompletedAction = {
  type: 'toggleCompleted'
  id: string
}

type SetAction = {
  type: 'set'
  list: TodoItem[]
}

type ListAction =
  | AddAction
  | RemoveAction
  | ToggleCompletedAction
  | SetAction
  | ClearCompletedAction

export default function ListManager({
  className,
  list,
}: {
  className?: string
  list: TodoItem[]
}) {
  const [optimisticList, setOptimisticList] = useOptimistic(
    list,
    (oldList, action: ListAction) => {
      if (action.type === 'add') {
        return [...oldList, action.item]
      } else if (action.type === 'remove') {
        return oldList.filter((item) => item.id !== action.id)
      } else if (action.type === 'toggleCompleted') {
        return oldList.map((item) =>
          item.id === action.id ? { ...item, completed: !item.completed } : item
        )
      } else if (action.type == 'clearCompleted') {
        return oldList.filter((item) => !item.completed)
      } else if (action.type === 'set') {
        return action.list
      } else {
        return oldList
      }
    }
  )

  async function addItem(text: string) {
    const newLexoRank =
      optimisticList.length === 0
        ? LexoRank.middle()
        : LexoRank.parse(
            optimisticList[optimisticList.length - 1].lexorank
          ).genNext()
    const item: TodoItem = {
      id: createId(),
      lexorank: newLexoRank.toString(),
      text,
      completed: false,
    }
    startTransition(() => setOptimisticList({ type: 'add', item }))
    await createItem(item)
  }

  async function toggleCompleted(id: string) {
    const item = optimisticList.find((item) => item.id === id)
    if (!item) {
      throw new Error(`Item with id ${id} not found`)
    }
    startTransition(() => setOptimisticList({ type: 'toggleCompleted', id }))
    await updateItem({ ...item, completed: !item.completed })
  }

  async function removeItem(id: string) {
    startTransition(() => setOptimisticList({ type: 'remove', id }))
    await deleteItem(id)
  }

  async function clearCompleted() {
    startTransition(() => setOptimisticList({ type: 'clearCompleted' }))
    await deleteCompletedItems()
  }

  async function reorderItem(id: string, oldIndex: number, newIndex: number) {
    let loLexoRank: LexoRank
    let hiLexoRank: LexoRank

    if (oldIndex < newIndex) {
      loLexoRank = LexoRank.parse(optimisticList[newIndex].lexorank)
      hiLexoRank =
        newIndex === optimisticList.length - 1
          ? LexoRank.parse(
              optimisticList[optimisticList.length - 1].lexorank
            ).genNext()
          : LexoRank.parse(optimisticList[newIndex + 1].lexorank)
    } else {
      loLexoRank =
        newIndex === 0
          ? LexoRank.parse(optimisticList[0].lexorank).genPrev()
          : LexoRank.parse(optimisticList[newIndex - 1].lexorank)
      hiLexoRank = LexoRank.parse(optimisticList[newIndex].lexorank)
    }

    const newLexoRank = loLexoRank.between(hiLexoRank)
    const item = optimisticList.find((item) => item.id === id)
    if (!item) {
      throw new Error(`Item with id ${id} not found`)
    }
    startTransition(() => {
      const newList = optimisticList.map((item) =>
        item.id === id ? { ...item, lexorank: newLexoRank.toString() } : item
      )
      newList.sort((a, b) => (a.lexorank < b.lexorank ? -1 : 1))
      setOptimisticList({
        type: 'set',
        list: newList,
      })
    })
    await updateItem({ ...item, lexorank: newLexoRank.toString() })
  }

  return (
    <div className={twMerge(`flex flex-col`, className)}>
      <NewItem className={`mb-4 tablet:mb-6`} onAdd={addItem} />
      <ItemList
        className={`flex-grow`}
        items={optimisticList}
        toggleCompleted={toggleCompleted}
        removeItem={removeItem}
        reorderItem={reorderItem}
        clearCompleted={clearCompleted}
        animationDuration={0.1}
      />
    </div>
  )
}

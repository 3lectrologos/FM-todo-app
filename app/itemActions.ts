'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function createItem(item: TodoItem) {
  const session = await auth()
  if (!session || !session.user) {
    return
  }
  const user = session.user

  await prisma.todoList.upsert({
    where: {
      userId: user.id || '',
    },
    update: {
      todos: {
        create: {
          id: item.id,
          text: item.text,
          completed: false,
          order: item.order,
        },
      },
    },
    create: {
      userId: user.id || '',
      todos: {
        create: {
          id: item.id,
          text: item.text,
          completed: false,
          order: item.order,
        },
      },
    },
  })

  revalidatePath('/')
}

export async function getItems(): Promise<TodoItem[]> {
  const session = await auth()
  if (!session || !session.user) {
    return [] as TodoItem[]
  }
  const user = session.user

  const list = await prisma.todoList.findUnique({
    where: {
      userId: user.id || '',
    },
    select: {
      todos: {
        select: {
          id: true,
          text: true,
          completed: true,
          order: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  })
  return (list?.todos || []) as TodoItem[]
}

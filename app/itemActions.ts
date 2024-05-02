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
      userId: user.id,
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
      userId: user.id!,
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

export async function deleteItem(id: string) {
  const session = await auth()
  if (!session || !session.user) {
    return
  }
  // TODO: This is ignored now, because there is no row-level security for todo items.
  const user = session.user

  await prisma.todo.delete({
    where: {
      id,
    },
  })

  revalidatePath('/')
}

export async function deleteCompletedItems() {
  const session = await auth()
  if (!session || !session.user) {
    return
  }
  const user = session.user

  const list = await prisma.todoList.findUnique({
    where: {
      userId: user.id,
    },
  })

  await prisma.todo.deleteMany({
    where: {
      listId: list?.id,
      completed: true,
    },
  })

  revalidatePath('/')
}

export async function updateItem(item: TodoItem) {
  const session = await auth()
  if (!session || !session.user) {
    return
  }
  // TODO: This is ignored now, because there is no row-level security for todo items.
  const user = session.user

  await prisma.todo.update({
    where: {
      id: item.id,
    },
    data: {
      text: item.text,
      completed: item.completed,
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
      userId: user.id,
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

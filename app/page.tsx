'use client'

import Title from '@/app/Title'
import NewTodo from '@/app/NewTodo'

export default function Home() {
  return (
    <main className="flex flex-col">
      <Title className={`mb-8 tablet:mb-10`} />
      <NewTodo />
    </main>
  )
}

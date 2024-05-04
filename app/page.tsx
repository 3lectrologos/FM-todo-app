import Title from '@/app/(components)/Title'
import { ListManager } from '@/app/ListManager'
import { getItems } from '@/app/itemActions'
import { SignedOutListManager } from '@/app/SignedOutListManager'
import { auth } from '@/auth'

export default async function Container() {
  const session = await auth()
  const list = await getItems()

  return (
    <main
      className={`flex-grow flex flex-col w-full py-12 px-6 tablet:px-0 tablet:pt-[70px] pb-12 tablet:w-[540px]`}
    >
      <Title className={`mb-6 tablet:mb-10`} />
      {session ? (
        <ListManager list={list} className={`flex-grow mb-24 tablet:mb-12`} />
      ) : (
        <SignedOutListManager className={`flex-grow mb-24 tablet:mb-12`} />
      )}
      <span
        className={`textStyle-normal text-center text-lt_list_text_light dark:text-dt_list_text_light`}
      >
        Drag and drop to reorder list
      </span>
    </main>
  )
}

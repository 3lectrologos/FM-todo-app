import Title from '@/app/Title'
import ListManager from '@/app/ListManager'

export default function Container() {
  return (
    <main
      className={`flex-grow flex flex-col w-full py-12 px-6 tablet:px-0 tablet:pt-[70px] pb-12 tablet:w-[540px]`}
    >
      <Title className={`mb-8 tablet:mb-10`} />
      <ListManager className={`flex-grow mb-8 tablet:mb-12`} />
      <span
        className={`textStyle-normal text-center text-lt_list_text_light dark:text-dt_list_text_light`}
      >
        Drag and drop to reorder list
      </span>
    </main>
  )
}

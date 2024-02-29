import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import { twMerge } from 'tailwind-merge'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TODO app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={josefinSans.className}>
        <div
          className={twMerge(
            `flex flex-col items-center min-h-dvh bg-lt_veryLightGray dark:bg-dt_veryDarkDesaturatedBlue`,
            `bg-[url('/images/bg-mobile-light.jpg')] tablet:bg-[url('/images/bg-desktop-light.jpg')]`,
            `dark:bg-[url('/images/bg-mobile-dark.jpg')] tablet:dark:bg-[url('/images/bg-desktop-dark.jpg')]`,
            `bg-no-repeat`
          )}
        >
          <div
            className={`w-full py-12 px-6 tablet:px-0 tablet:py-[70px] tablet:w-[540px]`}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

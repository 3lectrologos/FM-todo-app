import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import { twMerge } from 'tailwind-merge'
import ThemeProviderWrapper from '@/app/ThemeProviderWrapper'

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
    <html lang="en" suppressHydrationWarning>
      <body className={josefinSans.className}>
        <ThemeProviderWrapper>
          <div
            className={twMerge(
              `flex flex-col items-center min-h-dvh bg-lt_veryLightGray dark:bg-dt_veryDarkDesaturatedBlue`,
              `bg-[url('/images/bg-mobile-light.jpg')] tablet:bg-[url('/images/bg-desktop-light.jpg')]`,
              `dark:bg-[url('/images/bg-mobile-dark.jpg')] tablet:dark:bg-[url('/images/bg-desktop-dark.jpg')]`,
              `bg-top bg-no-repeat`
            )}
          >
            {children}
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}

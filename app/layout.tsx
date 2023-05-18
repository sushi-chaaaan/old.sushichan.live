import 'modern-css-reset'
import '@/styles/globals.scss'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { fontVariables } from '@/lib/font'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={fontVariables}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

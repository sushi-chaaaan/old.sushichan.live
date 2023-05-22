import 'ress'
import '@/styles/globals.scss'
import '@/styles/syntax-highlight.scss'

import { Metadata } from 'next'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import Favicons from '@/components/meta/favicons'
import { fontVariables } from '@/lib/font'

export const metadata: Metadata = {
  metadataBase: new URL('https://sushichan.live'),
  title: {
    default: 'すし.らいぶ',
    template: '%s - すし.らいぶ',
  },
  description: 'インターネット寿司屋',
  openGraph: {
    url: '/',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary',
    site: '@sushi_chan_sub',
  },
}

export default function RootLayout({
  children,
}: {
  modal: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <Favicons />
      <body className={fontVariables}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

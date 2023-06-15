// import Link from 'next/link'

import Link from 'next/link'

import styles from '@/app/home.module.scss'
import MainContainer from '@/components/common/mainContainer'
import Section from '@/components/section'
import { getFilePathRecursive } from '@/lib/fs'

export default async function Home() {
  getFilePathRecursive(`${process.cwd()}/posts`).map((path) => {
    console.log(path)
  })

  return (
    <MainContainer>
      <Section>
        <p>
          このサイトはβ版です。
          <br />
          現在
          <Link className={styles.link} href="/blog">
            ブログ
          </Link>
          のみ実装されています。
        </p>
        {/* <Link href="/css-fukuwarai">
          <p>CSS福笑い(α版,スマホ未対応)</p>
        </Link> */}
      </Section>
    </MainContainer>
  )
}

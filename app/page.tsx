import styles from '@/app/home.module.scss'
import Link from '@/components/common/link'
import MainContainer from '@/components/common/mainContainer'
import Section from '@/components/section'

export default async function Home() {
  return (
    <MainContainer>
      <Section>
        <p>
          このサイトはβ版です。
          <br />
          現在
          <Link
            className={styles.link}
            href="/blog"
            options={{ textDecoration: 'underline' }}
          >
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

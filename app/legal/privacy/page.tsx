import { notFound } from 'next/navigation'
import { z } from 'zod'

import s from '@/app/legal/privacy/page.module.scss'
import Article from '@/components/article'
import BackButton from '@/components/button/backButton'
import MainContainer from '@/components/common/mainContainer'
import { compileMDX, getMDX } from '@/lib/mdx'

export default async function Page() {
  const privacyMDX = getMDX({
    mdx: {
      sourceDirectory: 'md',
      fileName: 'privacy',
      extension: 'mdx',
    },
    schema: z.object({}),
  })
  if (!privacyMDX) {
    notFound()
  }

  const privacyPolicy = await compileMDX({
    isRaw: false,
    mdxFile: privacyMDX.fileMetaData,
  })

  return (
    <MainContainer className={s.page}>
      <Article>{privacyPolicy}</Article>
      <BackButton />
    </MainContainer>
  )
}

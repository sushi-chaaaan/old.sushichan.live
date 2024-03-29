import { notFound } from 'next/navigation'
import { z } from 'zod'

import Section from '@/components/base/section'
import { compileMDX, getMDX } from '@/lib/mdx'

export const metadata = {
  title: 'about',
  description: 'Introduce myself',
}

export default async function Page() {
  const mdx = getMDX({
    mdx: {
      sourceDirectory: 'md',
      fileName: 'works',
    },
    schema: z.object({}),
  })
  if (!mdx) {
    notFound()
  }
  const content = await compileMDX({ isRaw: false, mdxFile: mdx.fileMetaData })
  return <Section>{content}</Section>
}

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import styles from '@/app/blog/post/[...slug]/page.module.scss'
import FrontMatter from '@/components/blog/frontMatter'
import Section from '@/components/blog/section'
import MDXImage from '@/components/mdx/image'
import NotFoundMeta from '@/components/meta/notFound'
import {
  compileMDX,
  getAllMDXSlugs,
  getMDXExistence,
  getMDXFrontMatter,
} from '@/lib/mdx'

type PageProps = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const mdxPath = slug.join('/')
  const mdx = getMDXExistence(mdxPath)
  if (!mdx.exists) {
    return NotFoundMeta
  }
  const mdxMetaData = getMDXFrontMatter(mdxPath, mdx.extension)

  return {
    title: mdxMetaData.title,
    description: mdxMetaData.description,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllMDXSlugs()
  return slugs?.map((slug) => ({ slug: slug.split('/') }))
}

export default async function Page({ params: { slug } }: PageProps) {
  const mdxPath = slug.join('/')
  const mdx = getMDXExistence(mdxPath)
  if (!mdx.exists) {
    notFound()
  }

  // list of Custom Components used in mdx
  const customComponents = {
    // FIXME: 型パズルに敗北...
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: (props: any) => <MDXImage {...props} />,
  }

  const { content, frontMatter } = await compileMDX(
    mdxPath,
    mdx.extension,
    customComponents
  )
  return (
    <div className={styles['article-root']}>
      {frontMatter && (
        <Section>
          <FrontMatter {...frontMatter} />
        </Section>
      )}
      <Section>{content}</Section>
    </div>
  )
}

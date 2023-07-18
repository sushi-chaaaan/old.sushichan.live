import { compileMDX as compileMDXFile } from 'next-mdx-remote/rsc'
// import rehypeAutoLinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkUnwrapImages from 'remark-unwrap-images'
// 挙動がおかしいので使わない
// import stringWidth from 'string-width'
import { type PluggableList } from 'unified'

import { MDXComponents } from '@/components/mdx'
import { type MDXCompilerOption, readMDXFile } from '@/lib/mdx'
import rehypeImageOpt from '@/lib/mdx/rehype-image'

const remarkDefaultPlugins: PluggableList = [
  [
    remarkGfm,
    // {
    //   stringLength: stringWidth,
    // },
  ],
  remarkEmoji,
  remarkMath,
  remarkUnwrapImages,
]

const rehypeDefaultPlugins: PluggableList = [
  rehypeSlug,
  // rehypeAutoLinkHeadings,
  rehypeKatex,
  rehypeImageOpt,
  [
    rehypePrettyCode,
    {
      theme: 'one-dark-pro',
      keepBackground: true,
    },
  ],
]

// compile MDX file to React Component
export const compileMDX = async ({
  feature: { generateToc = false } = {},
  ...params
}: MDXCompilerOption) => {
  const mdxContent = params.isRaw
    ? params.rawContent
    : await readMDXFile(params.mdxFile)

  // TODO この文字列の段階で任意の何かでページを分割できるようにする

  const { content } = await compileMDXFile({
    components: MDXComponents,
    source: mdxContent,
    options: {
      mdxOptions: {
        remarkPlugins: remarkDefaultPlugins,
        rehypePlugins: (() => {
          const plugins = [...rehypeDefaultPlugins]
          if (generateToc) {
            plugins.push([
              rehypeToc,
              {
                headings: ['h2'],
              },
            ])
          }
          return plugins
        })(),
      },
      // if this set to false,
      // frontMatter will appear as content
      parseFrontmatter: true,
    },
  })
  return content
}

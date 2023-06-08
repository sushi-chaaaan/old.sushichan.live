import fs from 'fs'
import matter from 'gray-matter'
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
import stringWidth from 'string-width'
import { type PluggableList } from 'unified'

import { MDXComponents } from '@/components/mdx'
import {
  fileHasExtension,
  getFileModifiedTime,
  recursiveGetFilepath,
} from '@/lib/fs'
import rehypeImageOpt from '@/lib/rehype-image'

export type mdxMetaData = {
  title: string
  description: string
  date: Date
  updated?: Date
  thumbnail: string
  tags?: string[]
}

export type fetchedMDXData = {
  content: string
  path: string
  extension: 'mdx' | 'md'
}

export type mdxMetaDataWithFile = mdxMetaData & {
  file: {
    fileName: string
    extension: 'mdx' | 'md'
  }
}

type MDXExistence =
  | {
      exists: true
      fileName: string
      extension: 'mdx' | 'md'
    }
  | {
      exists: false
    }

type MDXCompilerFeature = {
  feature?: {
    generateToc?: boolean
  }
}

type MDXCompilerOption =
  | (
      | {
          isRaw: false
          fileName: string
          extension: 'mdx' | 'md'
        }
      | {
          isRaw: true
          rawContent: string
        }
    ) &
      MDXCompilerFeature

// path to directory
const homeDir = process.cwd()

const remarkDefaultPlugins: PluggableList = [
  [
    remarkGfm,
    {
      stringLength: stringWidth,
    },
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
    : await getMDXContent(params.fileName, params.extension)

  const { content } = await compileMDXFile<mdxMetaData>({
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

export const getMDXExistence = (fileName: string): MDXExistence => {
  if (fs.existsSync(`${homeDir}/${fileName}.mdx`)) {
    return {
      fileName: fileName,
      exists: true,
      extension: 'mdx',
    }
  }

  if (fs.existsSync(`${homeDir}/${fileName}.md`)) {
    return {
      fileName: fileName,
      exists: true,
      extension: 'md',
    }
  }
  return {
    exists: false,
  }
}

export const getMDXContent = async (
  fileName: string,
  extension: 'mdx' | 'md'
): Promise<string> => {
  const mdxPath = `${homeDir}/${fileName}.${extension}`
  return await fs.promises.readFile(mdxPath, 'utf8')
}

export const getMDXFrontMatter = async (
  fileName: string,
  extension: 'mdx' | 'md'
): Promise<mdxMetaDataWithFile> => {
  const mdxPath = `${homeDir}/${fileName}.${extension}`

  const { data } = matter.read(mdxPath)
  const mtime = await getFileModifiedTime(mdxPath)

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    updated: mtime,
    thumbnail: data?.thumbnail,
    tags: data?.tags,
    file: {
      fileName: fileName,
      extension: extension,
    },
  }

  // return data as mdxMetaData
}

export const getAllMDXSlugs = async ({
  ignorePattern = /^_/,
  maxCount,
}: {
  ignorePattern?: RegExp
  maxCount?: number
}) => {
  return (
    await recursiveGetFilepath(`${homeDir}/posts`, ignorePattern, maxCount)
  )
    .filter((file) => fileHasExtension(file, ['md', 'mdx']))
    .map((file) => file.replace(/.mdx?$/, ''))
}

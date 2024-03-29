import { z } from 'zod'

// eslint-disable-next-line no-restricted-imports
import type { MDXFrontMatterBaseSchema } from '../utils/zod'

export type MDXFileMetaData = {
  sourceDirectory: string
  fileName: string
  extension: 'mdx' | 'md'
}

export type PartialMDXFileMetaData = Omit<MDXFileMetaData, 'extension'> & {
  extension?: 'mdx' | 'md' | undefined
}

export type MDXSourceDirectory = {
  sourceDirectory: string
}

// TODO: migrate MDX handler to merge received schema with MDXFrontMatterBaseSchema
export type MDXFrontMatterBase = z.infer<typeof MDXFrontMatterBaseSchema>

export type MDX<T extends object> = {
  fileMetaData: MDXFileMetaData
  frontMatter: T & MDXFrontMatterBase
}

type PluginOption<T> = {
  use?: boolean
  options?: T
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type RemarkOptions = {}

export type RehypeOptions = {
  rehypeToc?: PluginOption<import('rehype-toc').Options>
}

type MDXSourceOption =
  | {
      isRaw: false
      mdxFile: MDXFileMetaData
    }
  | {
      isRaw: true
      rawContent: string
    }

type MDXPluginOptions = {
  remark?: RemarkOptions
  rehype?: RehypeOptions
}

type MDXCompilerOption = {
  options?: {
    pluginOptions?: MDXPluginOptions
    format?: 'mdx' | 'md' | undefined
  }
}

export type MDXOption = MDXSourceOption & MDXCompilerOption

export type MDXRoute = {
  absolutePath: string
  relativePathFromCwd: string

  directory: string
  fileName: string
  extension: '.mdx' | '.md'

  normalizedRoute: string
}

export type MDXConfig = {
  path?: string
  tags?: string[]
}

type MDXDirectoryMetaData = {
  absolutePath: string
  relativePathFromCwd: string
  baseRoutes: string[]
}

export type MDXDirectoryType = {
  directoryMetaData: MDXDirectoryMetaData

  config: MDXConfig | undefined
  routes: MDXRoute[]
  children: MDXDirectoryType[]
}

export interface MDXDirectoryInterface extends MDXDirectoryType {
  getAllMDXRoutes(): MDXRoute[]
}

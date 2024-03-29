import { ImageResponse } from 'next/server'

import { getBlogMDX } from '@/app/blog/lib/mdx'

// Image metadata
const size = {
  width: 1200,
  height: 630,
}

// Image generation
export async function GET(
  request: Request,
  {
    params: { slug },
  }: {
    params: { slug: string[] }
  },
) {
  const mdxPath = slug.join('/')
  const mdx = getBlogMDX(mdxPath)
  if (!mdx) {
    return
  }
  const { thumbnail, title } = mdx.frontMatter

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={title}
        decoding="async"
        height={size.height}
        src={thumbnail}
        style={{ objectFit: 'cover' }}
        width={size.width}
      />
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}

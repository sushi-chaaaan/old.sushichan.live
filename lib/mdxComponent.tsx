import MDXImage from '@/components/mdx/image'

// list of Custom Components used in mdx
export const customComponents = {
  // FIXME: 型パズルに敗北...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: (props: any) => <MDXImage {...props} />,
}
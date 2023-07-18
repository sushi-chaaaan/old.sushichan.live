import WithBudoux from '@/components/common/budoux'
import Link from '@/components/common/link'
// import { TbArrowUpRight } from 'react-icons/tb'
type Props = React.ComponentProps<'a'> & {
  children: React.ReactNode
}

const MDXLink = ({ children, href, ...rest }: Props) => {
  if (!href) return null

  const isExternal = !href.startsWith('#') && !href.startsWith('/')

  return (
    <>
      <Link
        /* FIXME */
        /* @ts-expect-error 型パズルに敗北...*/
        href={href}
        options={{ color: 'blue' }}
        target={isExternal ? '_blank' : '_self'}
        {...rest}
      >
        {typeof children !== 'string' ? (
          children
        ) : (
          <WithBudoux>{children}</WithBudoux>
        )}
      </Link>
    </>
  )
}

export default MDXLink

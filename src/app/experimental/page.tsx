import UrlCard from '@/components/ui/card/urlCard'
import Tabs from '@/components/ui/tabs'

export default async function Page() {
  return (
    <>
      <Tabs
        items={[
          {
            label: {
              internal: 'dev',
              external: 'As developer',
            },
            content: <div>Profile as Developer</div>,
          },
          {
            label: {
              internal: 'otaku',
              external: 'As オタク',
            },
            content: <div>Profile as Otaku</div>,
          },
        ]}
      />
      <UrlCard url="https://zenn.dev/www_y/articles/ac46bdf3233193" />
    </>
  )
}

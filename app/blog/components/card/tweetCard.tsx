'use client'

import dynamic from 'next/dynamic'

import EmbedCard from '@/components/common/card/embedCard'
import { Tweet } from '@/components/tweet'

const TweetCard = ({ id }: { id: string }) => {
  const MediaQuery = dynamic(() => import('react-responsive'), {
    ssr: false,
  })

  return (
    <EmbedCard>
      <MediaQuery query="(prefers-color-scheme: light)">
        <Tweet id={id} theme="light" />
      </MediaQuery>
      <MediaQuery query="(prefers-color-scheme: dark)">
        <Tweet id={id} theme="dark" />
      </MediaQuery>
    </EmbedCard>
  )
}

export default TweetCard
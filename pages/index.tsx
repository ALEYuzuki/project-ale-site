import { NotionPage } from '@/components/NotionPage'
import { getPage } from '@/lib/notion'
import { rootNotionPageId } from '@/lib/config'
import { GetStaticProps } from 'next'
import { ExtendedRecordMap } from 'notion-types'

type Props = {
  recordMap: ExtendedRecordMap
}

export default function Home({ recordMap }: Props) {
  const site = {
    name: 'ProjectAEL',
    domain: 'project-ael.vercel.app',
    rootNotionPageId,
    rootNotionSpaceId: null // ← ★追加！
  }

  return (
    <NotionPage
      site={site}
      recordMap={recordMap}
      pageId={rootNotionPageId}
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const recordMap = await getPage(rootNotionPageId)

  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

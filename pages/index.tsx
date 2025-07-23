import { NotionPage } from '@/components/NotionPage'
import { getPage } from '@/lib/notion'
import { rootNotionPageId } from '@/lib/config'
import { GetStaticProps } from 'next'
import { ExtendedRecordMap } from 'notion-types'

type Props = {
  recordMap: ExtendedRecordMap
}

export default function Home({ recordMap }: Props) {
  return (
    <>
      <NotionPage recordMap={recordMap} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const recordMap = await getPage(rootNotionPageId)

  if (!recordMap) {
    console.error('❌ recordMap is undefined or null')
  }

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  }
}

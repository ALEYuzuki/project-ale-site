import Layout from '@/components/Layout'
import { NotionPage } from '@/components/NotionPage'
import { GetStaticProps } from 'next'
import { getPage } from '@/lib/notion'
import { ExtendedRecordMap } from 'notion-types'

type Props = {
  recordMap: ExtendedRecordMap
}

export default function Home({ recordMap }: Props) {
  return (
    <Layout>
      <NotionPage recordMap={recordMap} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const recordMap = await getPage('2396949e86ee80bcaae4d10d9b2c6e67') // ← your rootNotionPageId

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  }
}

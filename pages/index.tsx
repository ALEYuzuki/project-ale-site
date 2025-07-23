import { NotionPage } from '@/components/NotionPage'
import { getPage } from '@/lib/notion'

export default function Home(props) {
  return <NotionPage recordMap={props.recordMap} />
}

export async function getStaticProps() {
  const recordMap = await getPage('2396949e86ee80bcaae4d10d9b2c6e67')
  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  }
}

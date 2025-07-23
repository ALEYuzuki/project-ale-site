import Layout from '@/components/Layout'
import { NotionPage } from '@/components/NotionPage'

export default function Home(props) {
  return (
    <Layout>
      <NotionPage recordMap={props.recordMap} />
    </Layout>
  )
}

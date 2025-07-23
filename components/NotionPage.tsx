// ✅ 不要な import を削除し、重複も避けたバージョン

import cs from 'classnames'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { type PageBlock } from 'notion-types'
import { getBlockTitle, getPageProperty } from 'notion-utils'
import * as React from 'react'
import { useSearchParam } from 'react-use'

import { PageAside } from './PageAside'
import { Footer } from './Footer'
import { Loading } from './Loading'
import { Page404 } from './Page404'
import { PageHead } from './PageHead'
import BodyClassName from 'react-body-classname'
import { NotionRenderer } from 'react-notion-x'
import { GitHubShareButton } from './GitHubShareButton'

import type * as types from '@/lib/types'
import * as config from '@/lib/config'
import { mapImageUrl } from '@/lib/map-image-url'
import { getCanonicalPageUrl, mapPageUrl } from '@/lib/map-page-url'
import { searchNotion } from '@/lib/search-notion'
import { useDarkMode } from '@/lib/use-dark-mode'
import styles from './styles.module.css'


// ...（すべてのインポートはそのまま）...
import Layout from './Layout' // ⬅️ 追加：Layoutコンポーネントのインポート

export function NotionPage({
  site,
  recordMap,
  error,
  pageId
}: types.PageProps) {
  const router = useRouter()
  const lite = useSearchParam('lite')

  const components = React.useMemo<Partial<NotionComponents>>(
    () => ({
      nextLegacyImage: Image,
      nextLink: Link,
      Code,
      Collection,
      Equation,
      Pdf,
      Modal,
      Tweet,
      Header: NotionPageHeader,
      propertyLastEditedTimeValue,
      propertyTextValue,
      propertyDateValue
    }),
    []
  )

  const isLiteMode = lite === 'true'
  const { isDarkMode } = useDarkMode()

  const siteMapPageUrl = React.useMemo(() => {
    const params: any = {}
    if (lite) params.lite = lite

    const searchParams = new URLSearchParams(params)
    return site ? mapPageUrl(site, recordMap!, searchParams) : undefined
  }, [site, recordMap, lite])

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]!]?.value

  const isBlogPost =
    block?.type === 'page' && block?.parent_table === 'collection'

  const showTableOfContents = !!isBlogPost
  const minTableOfContentsItems = 3

  const pageAside = React.useMemo(
    () => (
      <PageAside
        block={block!}
        recordMap={recordMap!}
        isBlogPost={isBlogPost}
      />
    ),
    [block, recordMap, isBlogPost]
  )

  const footer = React.useMemo(() => <Footer />, [])

  if (router.isFallback) {
    return <Loading />
  }

  if (error || !site || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  if (!config.isServer) {
    const g = window as any
    g.pageId = pageId
    g.recordMap = recordMap
    g.block = block
  }

  const canonicalPageUrl = config.isDev
    ? undefined
    : getCanonicalPageUrl(site, recordMap)(pageId)

  const socialImage = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
      (block as PageBlock).format?.page_cover ||
      config.defaultPageCover,
    block
  )

  const socialDescription =
    getPageProperty<string>('Description', block, recordMap) ||
    config.description

  return (
    <>
      <PageHead
        pageId={pageId}
        site={site}
        title={title}
        description={socialDescription}
        image={socialImage}
        url={canonicalPageUrl}
        isBlogPost={isBlogPost}
      />

      {isLiteMode && <BodyClassName className='notion-lite' />}
      {isDarkMode && <BodyClassName className='dark-mode' />}

      <Layout aside={pageAside}>
        <NotionRenderer
          bodyClassName={cs(
            styles.notion,
            pageId === site.rootNotionPageId && 'index-page'
          )}
          darkMode={isDarkMode}
          components={components}
          recordMap={recordMap}
          rootPageId={site.rootNotionPageId}
          rootDomain={site.domain}
          fullPage={!isLiteMode}
          previewImages={!!recordMap.preview_images}
          showCollectionViewDropdown={false}
          showTableOfContents={showTableOfContents}
          minTableOfContentsItems={minTableOfContentsItems}
          defaultPageIcon={config.defaultPageIcon}
          defaultPageCover={config.defaultPageCover}
          defaultPageCoverPosition={config.defaultPageCoverPosition}
          mapPageUrl={siteMapPageUrl}
          mapImageUrl={mapImageUrl}
          searchNotion={config.isSearchEnabled ? searchNotion : undefined}
          footer={footer}
        />
      </Layout>

      <GitHubShareButton />
    </>
  )
}

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import * as React from 'react'
import * as Fathom from 'fathom-client'
import { posthog } from 'posthog-js'

import Layout from '@/components/Layout'
import { bootstrap } from '@/lib/bootstrap-client'
import {
  fathomConfig,
  fathomId,
  isServer,
  posthogConfig,
  posthogId
} from '@/lib/config'

// react-notion-x core styles (必須)
import 'react-notion-x/src/styles.css'
// 数式表示用 KaTeX（オプション）
import 'katex/dist/katex.min.css'
// コードハイライトテーマ（オプション）
import 'prismjs/themes/prism-coy.css'
// グローバルスタイル（全体）
import 'styles/global.css'
// Notionカスタムスタイル
import 'styles/notion.css'
// Prism テーマの上書き（オプション）
import 'styles/prism-theme.css'


if (!isServer) {
  bootstrap()
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

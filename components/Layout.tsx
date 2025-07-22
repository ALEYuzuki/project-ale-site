import Head from 'next/head'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>ProjectAEL | アークナイツ：エンドフィールド攻略</title>
        <meta name="description" content="非公式の攻略データベース。キャラ・ガイド・ニュース情報あり。" />
        <meta property="og:title" content="ProjectAEL" />
        <meta property="og:description" content="エンドフィールド攻略に特化したデータサイト。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://projectael.vercel.app" />
      </Head>

      <header className="bg-gray-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">ProjectAELへようこそ</h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          アークナイツ：エンドフィールド攻略に特化した非公式データベースサイトです。
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 bg-white shadow-md rounded-lg -mt-8 z-10 relative">
        {children}
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">
        &copy; {new Date().getFullYear()} ProjectAEL - 非公式ファンサイトです。
      </footer>
    </>
  )
}

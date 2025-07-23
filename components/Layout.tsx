import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen text-white">
      {/* サイドバー */}
      <aside className="w-64 bg-gray-900 bg-opacity-80 p-6 fixed top-0 left-0 h-full shadow-lg z-20">
        <h1 className="text-2xl font-bold mb-6">ProjectAEL</h1>
        <nav className="space-y-4">
          <a href="/" className="block hover:text-blue-400">🏠 トップ</a>
          <a href="/characters" className="block hover:text-blue-400">🧍‍♂️ キャラクター紹介</a>
          <a href="/guides" className="block hover:text-blue-400">📘 攻略ガイド</a>
          <a href="/news" className="block hover:text-blue-400">📰 最新ニュース</a>
        </nav>
      </aside>

      {/* メインコンテンツ with 背景画像 */}
      <main
        className="flex-1 ml-64 relative overflow-y-auto"
        style={{
          backgroundImage: `url('/背景横濃.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* 黒オーバーレイ */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

        {/* メインコンテンツ */}
        <div className="relative z-20 p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

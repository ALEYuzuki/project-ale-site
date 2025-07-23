// components/Layout.tsx

import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  aside?: ReactNode
}

export default function Layout({ children, aside }: LayoutProps) {
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

      {/* メインコンテンツ */}
      <main
        className="flex-1 ml-64 relative overflow-y-auto"
        style={{
          backgroundImage: `url('/背景横濃.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* 黒いオーバーレイ */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

        {/* メイン＋右サイドバー */}
        <div className="relative z-20 p-8 flex">
          {/* メイン */}
          <div className="flex-1">
            <div className="container mx-auto max-w-5xl px-4">
              {children}
            </div>
          </div>

          {/* 右サイドバー（optional） */}
          {aside && (
            <aside className="hidden lg:block w-80 ml-8">
              {aside}
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}

import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '2386949e86ee8055888de14786df5581',

  // if you want to restrict pages to a single notion workspace (optional)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'ProjectAEL',
  domain: 'project-ale-site.vercel.app',
  author: 'ALE',

  // open graph metadata (optional)
  description: 'アークナイツ：エンドフィールド攻略に特化した非公式データベースサイト',

  // social usernames (optional)
  twitter: '',
  github: '',
  linkedin: '',
  // mastodon: '', // optional
  // newsletter: '',
  // youtube: '',

  // default notion icon and cover images for site-wide consistency (optional)
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // LQIP preview images
  isPreviewImageSupportEnabled: true,

  // Redis preview image caching
  isRedisEnabled: false,

  // optional URL overrides
  pageUrlOverrides: null,

  // navigation style
  navigationStyle: 'default'
  // navigationStyle: 'custom',
  // navigationLinks: [
  //   {
  //     title: 'キャラクター',
  //     pageId: 'ここにキャラページのID'
  //   },
  //   {
  //     title: 'ガイド',
  //     pageId: 'ここにガイドページのID'
  //   }
  // ]
})

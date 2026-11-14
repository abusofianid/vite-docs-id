import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import type { FooterLink } from '@voidzero-dev/vitepress-theme'
import { extendConfig } from '@voidzero-dev/vitepress-theme/config'
import type { HeadConfig } from 'vitepress'
import { defineConfig } from 'vitepress'
import { graphvizMarkdownPlugin } from 'vitepress-plugin-graphviz'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons'
import llmstxt from 'vitepress-plugin-llms'
import packageJson from '../../packages/vite/package.json' with { type: 'json' }
import { buildEnd } from './buildEnd.config.ts'

const viteVersion = packageJson.version
const viteMajorVersion = +viteVersion.split('.')[0]

const ogDescription = 'Perkakas Frontend Generasi Berikutnya'
const ogImage = 'https://vite.dev/og-image.jpg'
const ogTitle = 'Vite'
const ogUrl = 'https://vite.dev'

// netlify envs
const deployURL = process.env.DEPLOY_PRIME_URL || ''
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

const deployType = (() => {
  switch (deployURL) {
    case 'https://main--vite-docs-main.netlify.app':
      return 'main'
    case '':
      return 'local'
    default:
      return 'release'
  }
})()
const additionalTitle = ((): string => {
  switch (deployType) {
    case 'main':
      return ' (main branch)'
    case 'local':
      return ' (local)'
    case 'release':
      return ''
  }
})()
const versionLinks = (() => {
  const links: FooterLink[] = []

  if (deployType !== 'main') {
    links.push({
      text: 'Dokumentasi Prarilis,
      link: 'https://main.vite.dev',
    })
  }

  if (deployType === 'main' || deployType === 'local') {
    links.push({
      text: `Dokumentasi Vite ${viteMajorVersion} (rilis)`,
      link: 'https://vite.dev',
    })
  }

  // Create version links from v2 onwards
  for (let i = viteMajorVersion - 1; i >= 2; i--) {
    links.push({
      text: `Dokumentasi Vite ${i}`,
      link: `https://v${i}.vite.dev`,
    })
  }

  return links
})()

const config = defineConfig({
  title: `Vite${additionalTitle}`,
  description: 'Perkakas Frontend Generasi Berikutnya',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://vite.dev',
  },
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/logo-without-border.svg' },
    ],
    [
      'link',
      { rel: 'alternate', type: 'application/rss+xml', href: '/blog.rss' },
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'me', href: 'https://m.webtoo.ls/@vite' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { property: 'og:site_name', content: 'vitejs' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@vite_js' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],

  locales: {
    root: { label: 'English' },
    zh: { label: '简体中文', link: 'https://cn.vite.dev' },
    ja: { label: '日本語', link: 'https://ja.vite.dev' },
    es: { label: 'Español', link: 'https://es.vite.dev' },
    ko: { label: '한국어', link: 'https://ko.vite.dev' },
    de: { label: 'Deutsch', link: 'https://de.vite.dev' },
    id: { label: 'Indonesian', link:'https:/id.vite.dev'},
  },

  themeConfig: {
    variant: 'vite',
    banner: {
      id: 'viteconf-2026',
      text: 'ViteConf 2026 - 15 Oktober, Daring',
      url: 'https://viteconf.org/',
    },

    editLink: {
      pattern: 'https://github.com/vitejs/vite/edit/main/docs/:path',
      text: 'Sarankan perubahan pada halaman ini',
    },

    socialLinks: [
      { icon: 'bluesky', link: 'https://bsky.app/profile/vite.dev' },
      { icon: 'mastodon', link: 'https://elk.zone/m.webtoo.ls/@vite' },
      { icon: 'x', link: 'https://x.com/vite_js' },
      { icon: 'discord', link: 'https://chat.vite.dev' },
      { icon: 'github', link: 'https://github.com/vitejs/vite' },
    ],

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            boostDocument(page) {
              if (page.startsWith('/guide/')) return 2 // Prefer guide pages
              if (page.startsWith('/config/')) return 1.5 // Then config pages
              if (page.startsWith('/blog/')) return 0 // Do not index blog posts
              return 1
            },
          },
        },
      },
    },

    carbonAds: {
      code: 'CEBIEK3N',
      placement: 'vitejsdev',
    },

    footer: {
      copyright: `© 2019–sekarang VoidZero Inc. dan para kontributor Vite. (${commitRef})`,
      nav: [
        {
          title: 'Vite',
          items: [
            { text: 'Panduan', link: '/guide/' },
            { text: 'Konfigurasi', link: '/config/' },
            { text: 'Plugin', link: '/plugins/' },
          ],
        },
        {
          title: 'Informasi',
          items: [
            { text: 'Tim', link: '/team' },
            { text: 'Blog', link: '/blog' },
            {
              text: 'Rilis',
              link: 'https://github.com/vitejs/vite/releases',
            },
          ],
        },
        {
          title: 'Versi',
          items: versionLinks,
        },
      ],
      social: [
        { icon: 'github', link: 'https://github.com/vitejs/vite' },
        { icon: 'discord', link: 'https://chat.vite.dev' },
        { icon: 'bluesky', link: 'https://bsky.app/profile/vite.dev' },
        { icon: 'x', link: 'https://x.com/vite_js' },
      ],
    },

    nav: [
      { text: 'Panduan', link: '/guide/', activeMatch: '/guide/' },
      { text: 'Konfigurasi', link: '/config/', activeMatch: '/config/' },
      { text: 'Plugin', link: '/plugins/', activeMatch: '/plugins/' },
      {
        text: 'Informasi',
        items: [
          { text: 'Tim', link: '/team' },
          { text: 'Blog', link: '/blog' },
          { text: 'Rilis', link: '/releases' },
          { text: 'Apresiasi', link: '/acknowledgements' },
          {
            text: 'Kode Etik',
            link: 'https://github.com/vitejs/.github/blob/main/CODE_OF_CONDUCT.md',
          },
          {
            text: 'Direktori Plugin',
            link: 'https://registry.vite.dev/plugins',
          },
          {
            text: 'Film Dokumenter',
            link: 'https://www.youtube.com/watch?v=bmWQqAKLgT4',
          },
          {
            items: [
              {
                text: 'Bluesky',
                link: 'https://bsky.app/profile/vite.dev',
              },
              {
                text: 'Mastodon',
                link: 'https://elk.zone/m.webtoo.ls/@vite',
              },
              {
                text: 'X',
                link: 'https://x.com/vite_js',
              },
              {
                text: 'Discord Chat',
                link: 'https://chat.vite.dev',
              },
              {
                text: 'Awesome Vite',
                link: 'https://github.com/vitejs/awesome-vite',
              },
              {
                text: 'ViteConf',
                link: 'https://viteconf.org',
              },
              {
                text: 'DEV Community',
                link: 'https://dev.to/t/vite',
              },
            ],
          },
        ],
      },
      {
        text: `v${viteVersion}`,
        items: [
          {
            text: 'Catatan Perubahan',
            link: 'https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md',
          },
          {
            text: 'Berkontribusi',
            link: 'https://github.com/vitejs/vite/blob/main/CONTRIBUTING.md',
          },
          {
            items: versionLinks,
          },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Pengantar',
          items: [
            {
              text: 'Langkah Awal',
              link: '/guide/',
            },
            {
              text: 'Filosofi',
              link: '/guide/philosophy',
            },
            {
              text: 'Mengapa Vite',
              link: '/guide/why',
            },
          ],
        },
        {
          text: 'Panduan',
          items: [
            {
              text: 'Fitur',
              link: '/guide/features',
            },
            {
              text: 'CLI',
              link: '/guide/cli',
            },
            {
              text: 'Menggunakan Plugin',
              link: '/guide/using-plugins',
            },
            {
              text: 'Pra-Bundling Dependensi',
              link: '/guide/dep-pre-bundling',
            },
            {
              text: 'Penanganan Aset Statis',
              link: '/guide/assets',
            },
            {
              text: 'Build untuk Produksi',
              link: '/guide/build',
            },
            {
              text: 'Deployment Situs Statis',
              link: '/guide/static-deploy',
            },
            {
              text: 'Variabel Lingkungan dan Mode',
              link: '/guide/env-and-mode',
            },
            {
              text: 'Server-Side Rendering (SSR)',
              link: '/guide/ssr',
            },
            {
              text: 'Integrasi Backend',
              link: '/guide/backend-integration',
            },
            {
              text: 'Pemecahan Masalah',
              link: '/guide/troubleshooting',
            },
            {
              text: 'Performa',
              link: '/guide/performance',
            },
            {
              text: `Migrasi dari v${viteMajorVersion - 1}`,
              link: '/guide/migration',
            },
            {
              text: 'Perubahan yang Tidak Kompatibel',
              link: '/changes/',
            },
          ],
        },
        {
          text: 'API',
          items: [
            {
              text: 'Plugin API',
              link: '/guide/api-plugin',
            },
            {
              text: 'HMR API',
              link: '/guide/api-hmr',
            },
            {
              text: 'JavaScript API',
              link: '/guide/api-javascript',
            },
            {
              text: 'Referensi Konfigurasi',
              link: '/config/',
            },
          ],
        },
        {
          text: 'API Lingkungan',
          items: [
            {
              text: 'Pengantar',
              link: '/guide/api-environment',
            },
            {
              text: 'Instans Lingkungan',
              link: '/guide/api-environment-instances',
            },
            {
              text: 'Plugin',
              link: '/guide/api-environment-plugins',
            },
            {
              text: 'Framework',
              link: '/guide/api-environment-frameworks',
            },
            {
              text: 'Runtime',
              link: '/guide/api-environment-runtimes',
            },
          ],
        },
      ],
      '/config/': [
        {
          text: 'Konfigurasi',
          items: [
            {
              text: 'Konfigurasi Vite',
              link: '/config/',
            },
            {
              text: 'Opsi Bersama',
              link: '/config/shared-options',
            },
            {
              text: 'Opsi Server',
              link: '/config/server-options',
            },
            {
              text: 'Opsi Build',
              link: '/config/build-options',
            },
            {
              text: 'Opsi Pratinjau',
              link: '/config/preview-options',
            },
            {
              text: 'Opsi Optimasi Dependensi',
              link: '/config/dep-optimization-options',
            },
            {
              text: 'Opsi SSR',
              link: '/config/ssr-options',
            },
            {
              text: 'Opsi Worker',
              link: '/config/worker-options',
            },
          ],
        },
      ],
      '/changes/': [
        {
          text: 'Perubahan yang Tidak Kompatibel',
          link: '/changes/',
        },
        {
          text: 'Terkini',
          items: [],
        },
        {
          text: 'Mendatang',
          items: [
            {
              text: 'this.environment dalam Hooks',
              link: '/changes/this-environment-in-hooks',
            },
            {
              text: 'Plugin Hook hotUpdate untuk HMR',
              link: '/changes/hotupdate-hook',
            },
            {
              text: 'Beralih ke API Per-Lingkungan',
              link: '/changes/per-environment-apis',
            },
            {
              text: 'SSR Menggunakan ModuleRunner API',
              link: '/changes/ssr-using-modulerunner',
            },
            {
              text: 'Plugin Bersama Selama Proses Build',
              link: '/changes/shared-plugins-during-build',
            },
          ],
        },
        {
          text: 'Sebelumnya',
          items: [],
        },
      ],
    },

    outline: {
      level: [2, 3],
    },
  },
  transformHead(ctx) {
    const path = ctx.page.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')

    if (path !== '404') {
      const canonicalUrl = path ? `${ogUrl}/${path}` : ogUrl
      ctx.head.push(
        ['link', { rel: 'canonical', href: canonicalUrl }],
        ['meta', { property: 'og:title', content: ctx.pageData.title }],
      )
    }

    // For the landing page, move the google font links to the top for better performance
    if (path === '') {
      const googleFontLinks: HeadConfig[] = []
      for (let i = 0; i < ctx.head.length; i++) {
        const tag = ctx.head[i]
        if (
          tag[0] === 'link' &&
          (tag[1]?.href?.includes('fonts.googleapis.com') ||
            tag[1]?.href?.includes('fonts.gstatic.com'))
        ) {
          ctx.head.splice(i, 1)
          googleFontLinks.push(tag)
          i--
        }
      }
      ctx.head.unshift(...googleFontLinks)
    }
  },
  markdown: {
    // languages used for twoslash and jsdocs in twoslash
    languages: ['ts', 'js', 'json'],
    codeTransformers: [
      transformerTwoslash({
        twoslashOptions: {
          compilerOptions: {
            moduleResolution: 100, // bundler
            ignoreDeprecations: '6.0', // remove the options entirely when twoslash doesn't set `baseUrl`
          },
        },
      }),
      // add `style:*` support
      {
        root(hast) {
          const meta = this.options.meta?.__raw
            ?.split(' ')
            .find((m) => m.startsWith('style:'))
          if (meta) {
            const style = meta.slice('style:'.length)
            const rootPre = hast.children.find(
              (n): n is typeof n & { type: 'element'; tagName: 'pre' } =>
                n.type === 'element' && n.tagName === 'pre',
            )
            if (rootPre) {
              rootPre.properties.style += '; ' + style
            }
          }
        },
      },
    ],
    async config(md) {
      md.use(groupIconMdPlugin, {
        titleBar: {
          includeSnippet: true,
        },
      })
      await graphvizMarkdownPlugin(md)
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          firebase: 'vscode-icons:file-type-firebase',
          '.gitlab-ci.yml': 'vscode-icons:file-type-gitlab',
        },
      }),
      llmstxt({
        ignoreFiles: ['blog/*', 'blog.md', 'index.md', 'team.md'],
        description: 'Perkakas untuk Membangun Aplikasi Web',
        details: `\
- 💡 Memulai Server Secara Instan
- ⚡️ HMR Super Cepat
- 🛠️ Fitur Lengkap
- 📦 Proses Build yang Dioptimalkan
- 🔩 Antarmuka Plugin Universal
- 🔑 API dengan Tipe yang Terdefinisi Sepenuhnya

Vite adalah perkakas build yang bertujuan memberikan pengalaman pengembangan yang lebih cepat dan efisien untuk proyek web modern. Vite terdiri dari dua bagian utama:

- Server pengembangan yang menyediakan [peningkatan fitur yang lengkap](https://vite.dev/guide/features.md) di atas [modul ES native](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), misalnya [Hot Module Replacement (HMR)](https://vite.dev/guide/features.md#hot-module-replacement) yang sangat cepat.

- Perintah build yang menggabungkan kode Anda menggunakan [Rolldown](https://rolldown.rs), yang dikonfigurasi sebelumnya untuk menghasilkan aset statis yang sangat optimal untuk lingkungan produksi.

Selain itu, Vite sangat mudah diperluas melalui [Plugin API](https://vite.dev/guide/api-plugin.md) and [JavaScript API](https://vite.dev/guide/api-javascript.md) with full typing support.`,
      }),
    ],
    optimizeDeps: {
      include: ['@shikijs/vitepress-twoslash/client'],
    },
    define: {
      __VITE_VERSION__: JSON.stringify(viteVersion),
    },
  },
  buildEnd,
})

export default extendConfig(config)

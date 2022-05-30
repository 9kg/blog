const path = require("path");
const { defaultTheme } = require('@vuepress/theme-default')
module.exports = {
  lang: 'zh-CN',
  title: '你好， 大兄弟 ！',
  description: '这是我的前端学习记录!',
  base: '/blog/',
  head: [
      ['link', {
          rel: 'icon',
          href: `/logo.webp`
      }]
  ],
  // 如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 true 。这将会禁用一些转译过程和 Polyfills ，带来更快的构建速度和更小的文件体积。
  evergreen: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'public','assets')
      }
    }
  },
  theme: defaultTheme({
    logo: "/logo.png",
    logoDark: "/logo-dark.png",
    editLink: true,
    editLinkText: "编辑此页",
    repo: '9kg/blog',
    repoLabel: "访问Github",
    docsBranch: 'master',
    docsDir: 'docs',
    notFound: ['当前路径不存在~'],
    backToHome: '返回首页',
    openInNewWindow: '新窗口打开',
    toggleDarkMode: '昼夜交替'
  }),
}
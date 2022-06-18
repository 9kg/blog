const path = require("path");
import { defineUserConfig } from 'vuepress'
import { searchPlugin } from "@vuepress/plugin-search";
import { commentPlugin } from "vuepress-plugin-comment2";
import MyTheme from "./theme"
import sidebar from "./sidebar"

export default defineUserConfig({
  lang: "zh-CN",
  title: "你好， 大兄弟 ！",
  description: "这是我的前端学习记录!",
  base: "/blog/",
  open: true,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: `/logo.png`,
      },
    ],
  ],
  alias: {
    "@assets": path.resolve(__dirname, "./assets"),
  },
  theme: MyTheme({
    logo: "/logo.png",
    logoDark: "/logo-dark.png",
    editLink: true,
    editLinkText: "编辑此页",
    repo: "9kg/blog",
    repoLabel: "访问Github",
    docsBranch: "master",
    docsDir: "docs",
    notFound: ["当前路径不存在~"],
    lastUpdatedText: "最近更新",
    contributors: false,
    backToHome: "返回首页",
    openInNewWindow: "新窗口打开",
    toggleColorMode: "昼夜交替",
    toggleSidebar: "切换侧边栏",
    tip: "提示",
    warning: "注意",
    danger: "警告",
    sidebar,
  }),
  plugins: [
    // 搜索你
    searchPlugin({
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
      // 将渲染后文本内容加入搜索索引中
      getExtraFields: (page) => {
        return [page.contentRendered];
      },
    }),
    // 评论
    commentPlugin({
      // 插件选项
      provider: "Giscus",
      repo: "9kg/comments",
      repoId: "R_kgDOHheJ0w",
      category: "Announcements",
      categoryId: "DIC_kwDOHheJ084CPvvo",
    }),
  ],
})
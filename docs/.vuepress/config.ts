const path = require("path");
import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import { commentPlugin } from "vuepress-plugin-comment2";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { lightgalleryPlugin } from "vuepress-plugin-lightgallery";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";
import MyTheme from "./theme";
import sidebar from "./sidebar";

export default defineUserConfig({
  lang: "zh-CN",
  title: "9kg小馆",
  description: "这是我的学习分享记录!",
  base: "/",
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
    themePlugins: {
      // 避免和图片预览插件冲突
      mediumZoom: false,
    },
  }),
  plugins: [
    // 搜索
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
    // 代码复制
    copyCodePlugin({
      // 是否展示在移动端
      showInMobile: true,
      // 是否生成样式纯净的小而简单的复制按钮
      pure: true,
    }),
    // 图片预览
    lightgalleryPlugin({
      plugins: ["pager", "zoom", "fullscreen", "rotate", "thumbnail"],
    }),
    // 预计阅读时间与字数统计
    readingTimePlugin({
      //默认300
      wordPerMinute: 200,
    }),
  ],
});

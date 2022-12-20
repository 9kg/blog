export default {
  "/interview/": [
    // {
    //   text: 'CSS',
    //   collapsible: true,
    //   children: [
    //     '/interview/css/index.md',
    //     '/interview/css/bfc.md',
    //   ],
    // },
    // {
    //   text: 'JS',
    //   collapsible: true,
    //   children: [
    //     '/interview/js/curry.md',
    //   ],
    // },
    // {
    //   text: 'VUE',
    //   collapsible: true,
    //   children: [
    //     '/interview/vue/diff.md',
    //   ],
    // },
    // {
    //   text: '浏览器',
    //   collapsible: true,
    //   children: [
    //     '/interview/vue/diff.md',
    //   ],
    // },
    {
      text: "网络",
      collapsible: true,
      children: [
        "/interview/network/tcp.md",
        "/interview/network/http.md",
        "/interview/network/https.md",
        "/interview/network/http2.0.md",
        "/interview/network/dns.md",
        "/interview/network/cdn.md",
      ],
    },
    // {
    //   text: '数据结构',
    //   collapsible: true,
    //   children: [
    //     '/interview/vue/diff.md',
    //   ],
    // },
    {
      text: "算法",
      collapsible: true,
      children: [
        {
          text: "排序",
          collapsible: true,
          link: "/interview/algorithm/sort/index.md",
          children: [
            "/interview/algorithm/sort/冒泡.md",
            "/interview/algorithm/sort/简单选择.md",
            "/interview/algorithm/sort/直接插入.md",
            "/interview/algorithm/sort/希尔.md",
            "/interview/algorithm/sort/堆.md",
            "/interview/algorithm/sort/归并.md",
            "/interview/algorithm/sort/快排.md",
            "/interview/algorithm/sort/鸡尾酒.md",
            "/interview/algorithm/sort/桶.md",
          ],
        },
        "/interview/algorithm/diff.md",
      ],
    },
    {
      text: "安全",
      collapsible: true,
      children: ["/interview/security/xss.md", "/interview/security/csrf.md"],
    },
    // {
    //   text: '设计模式',
    //   collapsible: true,
    //   children: [
    //     '/interview/vue/diff.md',
    //   ],
    // },
    // {
    //   text: '工程化',
    //   collapsible: true,
    //   children: [
    //     '/interview/vue/diff.md',
    //   ],
    // },
    // {
    //   text: '性能优化',
    //   collapsible: true,
    //   children: [
    //     '/interview/vue/diff.md',
    //   ],
    // },
  ],
};

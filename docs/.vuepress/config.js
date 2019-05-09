module.exports = {
  title: 'THE LOST SOUL',
  description: '饿，呆。',
  dest: 'public',
  head: [
      ['link', { rel: 'icon', href: `/favicon.ico` }]
  ],
  // 主题的一些配置
  themeConfig: {
    nav: [
        { text: 'HOME', link: '/', root: true }, // 指定它为博客根目录
        { text: 'TAGS', link: '/tags/', tags: true }, // 指定它为标签目录
        { text: 'BLOGS', link: '/_posts/' },
    ]
  }
}
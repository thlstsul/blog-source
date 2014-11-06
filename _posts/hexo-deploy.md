title: hexo免登陆deploy
date: 2014-10-14 17:11:00
tags: 上传
categories: [git, hexo]
---
最近重装了系统，顺便把自己的博客从octopress迁移到hexo，安装方面没有什么好说的，hexo的安装要比octopress容易太多了，二者简直不能再像，安装完你很快就可以清楚怎么新建、编译、发布，只是配置方面要花点时间，虽然看起来很相似，但是一旦了解了文件的结构就会发现相差不是一点两点，这些先不说。因为是重装系统，所以一切都是新的，安装git之后没有配置，因为是按照之前安装octopress的顺序来操作的。这样一直到发布博客之前都没有出现问题，发布博客的时候发现每次发布博客的时候都需要登陆git，这可不是一般的烦。所以配置了ssh key，但还是不行。仔细看了错误信息，才发现需要使用`git config --grobal user.email "your email"`和`git config --grobal user.name "username"`设置用户，配置ssh key只是免除了输入密码。用octopress的时候都是在第一次发布的时候自动帮你设置了，所以才会弄这么久，唉！但是再试一次，……，还是不行，这次是deploy到哪个库没有设置，要到_config.yml里把deploy属性设置一下，比如我的：
```
deploy:
  type: github
  repository: git@github.com:zzm5460zzm/zzm5460zzm.github.io.git
  branch: master
```
终于好了！！！
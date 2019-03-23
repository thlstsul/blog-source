---
layout: post
title: "octopress重装后的恢复"
date: 2014-01-30 12:52
comments: true
categories: octopress
tags: 备份
---
用**octopress**写博客，免不了要折腾它。那玩坏了又暂时无法解决怎么办，那就和玩Linux一样呗——重装。但你想像玩Linux一样，一遍遍的重新设置，重新安装软件吗？当然不想！那我们就需要做好备份工作咯。下面介绍一下我是怎么备份的：<!--more-->

我们都知道**octopress**是把编译好的静态网页push到**git**对应远程仓库的**master**分支上，然后再经由**git page**把网页发布出来。所以说利用git来做备份是最方便、最高效的。有人就会说了，你不是说网页已经push到git的远程仓库上了吗？拿还备份什么！其实我们用“**rake deploy**”push到个git上的只是**_deploy**文件里的已编译好的文件，除了发布网页基本没有什么作用。我们最主要的是备份**source**文件里的东东。网上也有许多教程是这样做的。但你会发现这样恢复**octopress**后你需要重新安装以前的插件，很麻烦有木有！！！所以我建议把整个**octopress**都给push上去，那具体怎么做呢……

首先你要进入到你的octopress安装的位置，用`git push origin <分支名>`把你的**octopress**整个push上去，这样你以后重装的时候就可以直接从你的git上clone，一步完成。
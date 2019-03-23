---
title: "关于Linux中文乱码"
date: 2015-03-09 10:47:47
tags: [Linux, 乱码] 
categories: Linux
---
操作Linux服务器时，出现中文乱码，因为无root权限，不能修改系统配置。此时只能通过修改模拟终端的配置文件来实现相同的效果。修改到对应的编码后，使用cat、vi、more浏览文件都不会有问题，但是此时使用less可能还有问题，应该设置LESSCHARSET=latin1。
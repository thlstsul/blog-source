---
title: "Cookie & Session"
date: 2015-03-09 22:30:07
tags: [Cookie, Session]
categories: Web
---
学习后台编程，一定会碰到这个问题“Cookie & Session的区别？”。在网上逛了一圈，清楚是清楚了，但也仅仅清楚“Cookie”是什么，“Session”是什么，我还是不知道它们之间有什么联系，为什么一提到Session就会提到Cookie？

当你的浏览器向服务器发出第一个请求，得到的响应里就有一个服务器分配的唯一的Cookie（J2EE分配的Cookie的键是JSESSION，值是对应Session的ID），用于区分请求--HTTP是无状态的，以在服务器中找到对应的Session。很多教程都会说，当你关闭浏览器时Session失效；其实这种说法不完全正确，Session有个失效时间（J2EE是在容器是设置），不会因为关闭浏览器而失效，真正失效的其实是浏览器保存的Cookie。
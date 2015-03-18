title: "使用Autowired等标签的注意事项"
date: 2015-03-08 13:32:21
tags: [Autowired, Spring, 标签]
categories: Spring
---
#1.使用@Autowired时报的是NullPointerException
再确定相关配置没错的情况下，请确定所在的类是否是通过反射创建的。
如果你的类在后期希望通过反射来创建，那么是不可以在其中通过@Autowired、@Require、@Resource等标签来完成注入的，取而代之的是手动从Spring容器载入。

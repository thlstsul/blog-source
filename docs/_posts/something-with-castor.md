---
title: "使用castor进行xml与java的互转"
date: 2016-05-25 21:58:19
tags: [java, castor, xml]
categories: java
---
## 生成XML映射类
刚开始使用Castor时，就觉得要手动编写Java映射类太不科学了。一番寻找之下才知道Castor是有提供这样一个功能的，可以根据XSD文件来生成XML对应的Java映射类，这些类可以用来操作该XSD文件所描述的XML文件。
所以不用苦逼的一个一个照着XML去编写，你只需要用XSD把要转换的XML描述清楚就行，这样一来编码量就少多了。具体的使用是：
``` shell
java -cp $CASTOR_LIB_PATH:$XERCES_LIB_PATH:$COMMONS_LOGGING_PATH:. org.exolab.castor.builder.SourceGenerator -i IMEIMapping.xsd -types j2 -package $PACKAGE_NAME
```
编写XSD过程中需要注意的是：
对元素（xs:element）的maxOccurs属性的值的设置，当某一元素可能出现多次时，需要设置maxOccurs为unbounded，这样生成的对应的类才能处理元素出现多次的情况；

## xml与java的互转
通过调用上一步生成的类的unmarshal和marshal方法，就能轻松实现xml与java互转。
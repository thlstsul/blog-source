title: 对Java反射机制——Class类的理解
date: 2014-10-07 21:14:23
categories: java
tags: 反射
---
学习Java有一段时间了，自然接触过Java反射机制，让是理解得不是很清晰，总觉得：如果我要初始化一个对象的话，直接new不就行了，何必绕一圈。直到看到“动态加载”，这不就是先前一直实现不了的吗？

``` java
public class Dynamic{
  public static void main(String[] args){
    Object o = new Class(args[0]).newInstance();
  }
}
```
类似上面这样的类加载就是动态加载，不是硬编译在程序中的，使用的就是这种有点绕的初始化方式。但是如果你接触过框架，应该可以很快的做出反应，框架的很多方面都是反射实现的。

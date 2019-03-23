---
layout: post
title: "关于继承"
date: 2014-04-20 09:57
comments: true
categories: java
tags: 继承
---
最近纠结一个问题：java中，使用继承时，“允许直接访问变量”和“使用继承的方法访问变量”哪种方式更好？举个例子更形象些：
<!--more-->
``` java 第一种方式
public class Father{
    protected String name;
    public Father(String name){
		this.name=name;
	}
	public void say(){
		System.out.println("I'm the father,my name is "+name);
	}
}

public class Son extends Father{
	public Son(String name){
		super(name);
	}
    public void say(){
    	System.out.println("I'm the son,my name is "+name);
    }
    public static void main(String args[]){
		Son s=new Son("zzm");
		s.say();
	}
}
```
``` java 第二种方式
public class Father{
	private String name;
	public String getName(){
		return name;
	}
	public void setName(String name){
		this.name=name;
	}
	public void say(){
		System.out.println("I'm the father,my name is "+getName());
	}
}

public class Son extends Father{
	public void say(){
    	System.out.println("I'm the son,my name is "+getName());
    } 
	public static void main(String args[]){
		Son s=new Son();
		s.setName("zzm");
		s.say();
	}
}
```
我google了一下，有类似的问题：<a href="http://keke8614.iteye.com/blog/1782594">java中到底是继承父类变量还是直接访问父类变量好？</a>但回答都很含糊。仔细思考你会发现，其实这个问题本身就有问题的，根据《Thinking in Java》：

>From the outside, it looks like the new  class has the same interface as the base class and maybe some additional methods and fiel ds. But inheritance doesn’t just copy the interface of the base class. When you create an ob ject of the derived class, it contains within it a subobject of the base class. This subobject is the same as if you had created an object of the base class by itself. It’s just that from the outside, the subobject of the base class is wrapped within the derived-class object. 

可知继承的实现原理和合成是差不多的，而这个问题试着把“继承父类变量”和“直接访问父类变量”区分开，但根本上是他把继承错误的理解为：把父类中用public和protected标记的变量和方法复制一份到子类。
但把继承的原理理解清楚之后，可以很容易的看出这两种方式的区别仅仅在于访问权限，而根据Java设置访问指示符的初衷可以知道第二种方式是比较好的，根据《Thinking in Java》：

>So to allow for inheritance, as a  general rule make all fields private  and all methods public. ( protected members also allow access by derived classes; you’ll learn about this later.)
>Although it’s possible to create protected fields, the best approach is to leave the fields private ; you should always preserve your right to change the underlying implementation. You can then allow controlled access to inheritors of your class through protected methods:

也可得出相同的结论，而且可以把第二种方式改进为：
``` java 改进版
public class Father{
	private String name;
	protected String getName(){
		return name;
	}
	protected void setName(String name){
		this.name=name;
	}
	public void say(){
		System.out.println("I'm the father,my name is "+getName());
	}
}

public class Son extends Father{
	public void say(){
    	System.out.println("I'm the son,my name is "+getName());
    } 
	public static void main(String args[]){
		Son s=new Son();
		s.setName("zzm");
		s.say();
	}
}
```
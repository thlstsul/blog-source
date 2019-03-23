---
title: "究竟Java是传值还是传引用？"
date: 2015-04-19 21:16:29
tags: [java, 传参]
categories: java
---
直到今天看了[这个](http://stackoverflow.com/questions/40480/is-java-pass-by-reference-or-pass-by-value)我才知道以前对这个问题一直是一知半解。虽然如果想模仿C++写一个swap函数，就必须将参数包装成类，但是我一直以为对象就是引用。<!--more-->

每个对象实例都是指针，因为java是传值的，所以通过参数传入的对象也是一个值（对象实例地址），所以想让对参数的修改在函数外生效的话，就需要对参数指向的对象实例进行修改，所以下面的例子是无效的：
``` java
public void swap(Integer a,Integer b){
    Integer x = a;
    a = b;
    b = x;
}
```
类Integer的value成员是final类型，所以此时应该定义一个包装类，如下：
``` java
public class Int{
	private int value;

	public Int(int value){
		this.value = value;
	}

	public void setValue(int value){
		this.value = value;
	}
	public void setValue(Int value){
		this.value = value.getValue();
	}
	public int getValue(){
		return this.value;
	}
}
```
然后：
``` java
public void swap(Int a,Int b){
    int x = a.getValue();
    a.setValue(b);
    b.setValue(x);
}
```
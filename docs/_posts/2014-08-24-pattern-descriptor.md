---

title: "装饰者模式"
date: 2014-08-24 17:27

categories: java
tags: 装饰者
---
在《Head First设计模式》中它被描述为：“给爱用继承的人一个全新的设计眼界”，这个模式很好的结合了继承和组合各自的优点，特别是组合，”一旦你熟悉了装饰的技巧，你将能够在不修改任何底层代码的请况下，给你的（或别人的）对象赋予新的职责。”

一段代码解释装饰者模式：
``` java Descriptor.java
import java.math.*;
abstract class 饮料{
	private String 描述="饮料";
	protected void 设置描述(String 描述){
		this.描述=描述;
	}
	public String 得到描述(){
		return 描述;
	}
	public double 求和(double 被和数,double 和数){
		BigDecimal 精数1=new BigDecimal(Double.toString(被和数));
		BigDecimal 精数2=new BigDecimal(Double.toString(和数));
		return 精数1.add(精数2).doubleValue();
	}
	public abstract double 结账();
}
abstract class 配料 extends 饮料{
	饮料 底子;
	public abstract String 得到描述();
}

class 浓缩 extends 饮料{
	public 浓缩(){
		设置描述("浓缩");
	}
	public double 结账(){
		return 1.99;
	}
}
class 综合 extends 饮料{
	public 综合(){
		设置描述("综合");
	}
	public double 结账(){
		return 0.89;
	}
}
class 黑咖啡 extends 饮料{
	public 黑咖啡(){
		设置描述("黑咖啡");
	}
	public double 结账(){
		return 1.05;
	}
}

class 摩卡 extends 配料{
	public 摩卡(饮料 底子){
		this.底子=底子;
	}
	public String 得到描述(){
		return 底子.得到描述()+"，摩卡";
	}
	public double 结账(){
		return 求和(底子.结账(),0.20);
	}
}
class 牛奶 extends 配料{
	public 牛奶(饮料 底子){
		this.底子=底子;
	}
	public String 得到描述(){
		return 底子.得到描述()+"，牛奶";
	}
	public double 结账(){
		return 求和(底子.结账(),0.10);
	}
}
class 奶泡 extends 配料{
	public 奶泡(饮料 底子){
		this.底子=底子;
	}
	public String 得到描述(){
		return 底子.得到描述()+"，奶泡";
	}
	public double 结账(){
		return 求和(底子.结账(),0.10);
	}
}

public class Descriptor{
	public static void main(String[] args){
		饮料 咖啡=new 综合();
		System.out.println(咖啡.得到描述()+":"+咖啡.结账());
		咖啡=new 摩卡(咖啡);
		System.out.println(咖啡.得到描述()+":"+咖啡.结账());
		咖啡=new 奶泡(咖啡);
		System.out.println(咖啡.得到描述()+":"+咖啡.结账());
	}
}

```

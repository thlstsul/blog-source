---

title: "匿名内部类解析"
date: 2014-03-26 14:37
comments: true
categories: java
tags: 匿名内部类
---
前段时间做了一个安卓的小应用，发现了如下的线程用法：
``` java
new Thread() {
	public void run() {
		try {
			soundPoolMap.put(0,mSoundPool.load(context,R.raw.sound_1,1));
			soundPoolMap.put(1,mSoundPool.load(context,R.raw.sound_2,1));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}.start();
```
让我想起了匿名内部类。

其实在框架里面，匿名内部类这样的应用很常见。但是我记忆中的匿名内部类只能是继承抽象类或实现一个接口，可是Thread不是一个抽象类也不是一个接口啊。怎么回事？难道记错了？？？

接下来我翻了一些资料也Google了一下，发现好像没有错啊，莫非是理解错误！！！

不行，只能自己做实验了。我新建了一个最简单的类，注意是“类”，然后在一个测试类的main方法中用匿名内部类的方法覆盖了原setter方法，之后调用getter方法，你猜怎么着？这样是可以成功的。

所以说，是我理解错误，不应该是有一部分人理解错误。比较准确的定义是：匿名内部类是基于继承和实现的，当你使用匿名内部类时，也就意味着你继承了那个类或实现了那个接口。
---
title: "简单讲讲JNI"
date: 2014-10-07 21:04:07
categories: java
tags: JNI
---

前段时间了解了Android NDK，也就是用c编写Android App以提高执行效率，好奇于它的实现原理，所以学习了JNI（Java Native Interface）。从Java 1.1开始，JNI标准成为java平台的一部分，它允许Java代码和其他语言写的代码进行交互。JNI一开始是为了本地已编译语言，尤其是C和C++而设计 的，但是它并不妨碍你使用其他语言，只要调用约定受支持就可以了。下面以经典的HelloWorld程序简单的讲一讲JNI：
##Hello World

``` java HelloWorld.java
public class HelloWorld{
  public native void sayHello();//声明native方法，不可实现
  static{
    System.loadLibrary("helloworld");//加载动态库helloworld，加载后的动态库位于本地方法栈
  }
  public static void main(String[] args){
    new HelloWorld().sayHello();
  }
}
```

结合上面的程序和JNI的名字Java Native Interface可以大概了解JNI的实现原理就是：使用native关键字定义一组接口用于连接其他语言的已编译好的模块。

接下来在命令窗口中使用“javac HelloWorld.java”编译Java文件，会得到HelloWorld.class。接着使用”javah HelloWorld”得到如下的对应的C头文件HelloWorld.h：

``` c HelloWorld.h
/* DO NOT EDIT THIS FILE - it is machine generated */
#include
/* Header for class HelloWorld */

#ifndef _Included_HelloWorld
#define _Included_HelloWorld
#ifdef __cplusplus
extern "C" {
#endif
/*
* Class: HelloWorld
* Method: displayHelloWorld
* Signature: ()V
*/
JNIEXPORT void JNICALL Java_HelloWorld_sayHello
(JNIEnv *, jobject);

#ifdef __cplusplus
}
#endif
#endif
```

然后，你就可以根据这个头文件编写对应的c文件HelloWorld.c,比如下面这样：

``` c Helloworld.c
#include <stdio.h>
#include <jni.h>
#include "HelloWorld.h"

JNIEXPORT void JNICALL Java_HelloWorld_sayHello(JNIEnv *env, jobject obj){
  printf("Hello world!!!");
  return;
}
```

接着当然是编译c，这里以在Windows下编译为例，使用cl编译器，在c文件所在的路径下打开命令窗口，使用如下命令：

```
cl -I "%java_home%\include "-I "%java_home%\include\win32 "-LD HelloWorld.c -Fe helloworld.dll
```

最终会得到helloworld.dll，当然要使用cl需要配置环境，这里多加不赘述。

最后，使用“java HelloWorld”运行最新编写的java程序，输出 Hello world!!!，这就是全部。
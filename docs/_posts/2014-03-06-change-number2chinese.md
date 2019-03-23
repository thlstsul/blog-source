---
layout: post
title: "笔试题：数字金额转中文大写金额"
date: 2014-03-06 00:21
comments: true
categories: java
tags: [笔试题, 转换]
---
自己写的一个把数字金额转中文大写金额的java程序，改了两次应该没有问题
<!--more-->
``` java
public class Num2ZH {
    //定义单位符号数组
    private final static String lnum[] = {"零","壹","貮","叁","肆","伍","陆","柒","捌","玖"};
    private final static String bnum[] = {"元","拾","佰","仟","万","拾","佰","仟","亿","拾","佰","仟"};
    
	//num change to chinese num function
    public static String change(long theNum){
        long num = theNum;
        StringBuffer zh = new StringBuffer();
		
		int front_n = 0;//存储上一个余数
        for(int i = 0; num != 0; i++){
            int n = (int)(num % 10);
            if(i % 4==0){
                if(i>=8 && zh.substring(0,1).equals(bnum[i-4])){
                    zh.delete(0,1);
                }
                if(n==0){
                    zh.insert(0,bnum[i]);
                }
            }
            if(n !=0||front_n !=0){
                if(n != 0){
                    zh.insert(0,bnum[i]);
                }
                zh.insert(0,lnum[n]);
            }
            front_n = n;
            num /= 10;
        }
        return zh.toString();
    }

    public static void main(String[] args) {
        // TODO code application logic here
        System.out.println(change(Long.valueOf(args[0]).longValue()));
    }
}
```
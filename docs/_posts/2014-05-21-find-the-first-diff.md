---

title: "笔试题：从文件中找到第一个只出现一次的字符"
date: 2014-05-21 23:56
comments: true
categories: java
tags: 笔试题
---
从文件（longstr.txt）读入一个超长的字符串（以\0结束）（字符串长度N，N>=1,N<2^32 - 1），请输出字符串中第一个只出现一次的字符和它的位置。
```
INPUT
abbacd

OUTPUT
c 4
```

以下是我给出的答案：
``` java 
import java.io.*;
public class FindDiff{
	 public static void main(String[] args){
		Reader is;
		int m=0;
		
	 	try{
			is=new FileReader("F:"+File.separator+"testjava"+File.separator+"out.txt");
			char[] c=new char[1024];
			char[] x=new char[81];
			is.read(c);
			System.out.println("INPUT");
			for(int i=0;c[i]!='\0';i++)
				System.out.print(c[i]);
			System.out.println();
			System.out.println("OUTPUT");

next:
			for(int i=0,k=c.length;i<k;i++){
				if(c[i]!='\0'){
					for(int h=0;h<=m;h++){
						if(c[i]==x[h]){
							
							continue next;
						}else
						{
							if(h==m){
								x[++m]=c[i];
							}
							break;
						}
					}

					for(int j=i+1;j<k;j++){
						
						if(c[i]==c[j]){
							
							continue next;
						}else
						{
							
							
							if(j==k-1)
							{
								System.out.println(c[i]+" "+i);
								break next;
							}
						}
					}

				}else{
					break;
				}
			}
			is.close();
		}catch(IOException e)
		{
			e.printStackTrace();
		}
	 }
}
```
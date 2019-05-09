---

title: "Java实现自然合并排序"
date: 2014-03-31 20:04

categories: java
tags: 合并排序
---
鉴于网上的自然合并排序程序比较少，用Java实现的更少，把自己用Java实现的NatualMergeSort贴在这里避免重复造轮子。不知性能如何，有请大神帮忙分析分析。
``` java NatualMergeSort
public class NatualMergeSort{
	public static void sort(Comparable[] a){
		int l=a.length;
		//新建数组用于存储排好序的子序列
		Comparable[] b = new Comparable[l];
		
		//q1、q2队列用于存储已排好序的子序列的尾部在数组中的位置
		Queue<Integer> q1 = new LinkedList<Integer>();
		Queue<Integer> q2 = new LinkedList<Integer>();
		
		//查找一自然排好序的子序列，并将断点幅值给q1
		for(int i=0;i<l-1;i++){		
			if(a[i].compareTo(a[i+1])>0){
				q1.add(i);
			}
		}
		
		//只要q1或q2不为空就循环调用mergePass()进行合并
		while(q1.peek()!=null||q2.peek()!=null){
			mergePass(a,b,q1,q2);
			mergePass(b,a,q2,q1);
		}
	}

	private void mergePass(Comparable[] father,Comparable[] son,Queue queue1,Queue queue2){
		/*新建变量分别用于存储所要合并的两个子序列的尾部位置、下次合并的第一个子序列的头部位置和整个数组的长度*/
		Integer i=0,j=0,s=0,l= father.length;
		
		while(queue1.peek()!=null){ //若已知的断点队列不为空，继续合并
			i=(Integer)queue1.poll(); //获取第一个子序的尾部，并删除
			j=(Integer)queue1.poll(); //获取第二个子序的尾部，并删除
			
			if(j==null){ //若所获j为空，即合并已到达最后两个子序，
				j=l-1; //所以整个数组的尾部就是第二个子序的尾部
			}else{ //若所获j不为空，
				queue2.add(j); //把j添加到另一个队列等待下一层合并使用
			}
			merge(father,d,s,i,j);
			s=j+1; //下一次合并的s既是这次的j的后一位
		}
		if(j!=(l-1)){ //循环完毕，如果j不等于数组尾部说明，还剩一个子序
			for(int k=s;k<l;k++){ //直接添加到son的尾部
				son[k]= father [k];
			}
		}
	}

	private void merge(Comparable[] father, Comparable[] son, Integer start, Integer mid, Integer end){ 
		/*合并father[statr:mid]和father[mid+1:end]到son[start:end]*/
		Integer i=start,j=mid+1,k=start;
		while((i<=mid)&&(j<=end)){
			if(father [i].compareTo(father [j])<=0){
				son[k++]= father [i++];
			}else{
				son[k++]= father [j++];
			}
		}
		if(i>mid){
			for(int q=j;q<=end;q++){
				son[k++]= father [q];
			}
		}else{
			for(int q=i;q<=mid;q++){
				son[k++]= father [q];
			}
		}
	}

}
```
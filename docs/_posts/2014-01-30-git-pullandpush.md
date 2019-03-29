---

title: "git的push和pull"
date: 2014-01-30 08:34

categories: git
tags: [push, pull]
---
在用**git**进行版本管理的过程中，**pull和push**无疑是最重要的两个操作。在这里总结一下相关的常用的操作。下面假设你已有一个本地仓库：

 - `git pull` //更新本地仓库至最新改动
   
   那要是手贱操作失误怎么办？没事你可用：
   
 - `git checkout -- <filename>` //使用 HEAD 中的最新内容替换掉你的工作目录中的文件(注意间隔)
   
 - `git push origin <branchname>`  //将改动提交到远程数据库
   
   但是在此之前，你需要提出更改（把它们添加到暂存区）：
   
 - `git add *` //‘*’可以替换
   
   接着将改动提交到 **HEAD** ：
   
 - `git commit -m "commit message"`

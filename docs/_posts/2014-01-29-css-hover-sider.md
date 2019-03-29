---

title: "纯css悬浮收放sider（侧边栏）"
date: 2014-01-29 15:14
comments: true
categories: css
tags: [侧边栏, 悬浮收放]
---
安装了一个新的**octopress**主题后，发现新的主题没有侧边栏。其实这很好解决，只需要在`index`、`_include\page`、`_include\post`等你需要**sider**的地方添加：
``` html 这里为了转义在“{}”和“%”之间添加了空格，复制代码后需除去
{ % unless page.sidebar == false % }
<aside class="sidebar">
  { % if site.post_asides.size % }
    { % include_array post_asides % }
  { % else % }
    { % include_array default_asides % }
  { % endif % }
</aside>
{ % endunless % }
``` 
关键是sider的样式。既然本来就没有那就任我为所欲为了，哈哈……
首先，要先跟主题相呼应，所以格式应该相同；其次，我想让sider悬浮并且自动靠边收放。要实现这样的效果，至少有两种方式：javascript、css。我选择css，因为需要更改的地方少而且效果更佳，方便又实惠。
思考过程：
首先，需要让sider在鼠标悬浮于之上时弹出且当鼠标在它之上时不缩回，需要设置（响应式设计）：
``` css
.sidebar{ right:0%; }
.sidebar:hover{ right:0%; }
```
然后……你猜对了，就是设置sider的初始位置和弹出效果：
``` css
.sidebar{ 
	position:absolute; 
	bottom:0; 
	right:-31%; 
	width:32%; 
	height: 100%; 
	transition:0.2s ease-out; 
	-webkit-transition:0.2s ease-out;
}
```
大概就是这样，具体代码如下：
``` css
.container .mid-col .mid-col-container .sidebar{ right:0%; }
.container .mid-col .mid-col-container .sidebar:hover{ right:0%; }
body > .container .mid-col .mid-col-container .sidebar{ 
	position:absolute; 
	bottom:0; 
	right:-31%; 
	width:32%; 
	height: 100%; 
	background: #3D4349;
	transition:0.2s ease-out; 
	-webkit-transition:0.2s ease-out; 
	z-index: 8060; 
	overflow-x: hidden; 
	overflow-y: scroll; 
}
body > .container .mid-col .mid-col-container .sidebar section ul a{ 
	color:#FFF;
	-webkit-transition:color 0.3s;
	-moz-transition:color 0.3s;
	-o-transition:color 0.3s;
	transition:color 0.3s; 
}
body > .container .mid-col .mid-col-container .sidebar section ul a:hover{
 	color:#258fb8; 
}li{ 
 	font-weight:normal; 
 	padding:10px; 
 }
body > .container .mid-col .mid-col-container .sidebar section{
 	width:80%;
 	padding:20% 15% 20% 15%;
}
```
需要注意的是：
	

 - 设置sider处于最高层，即设置`z-index`为最大
 - 设置`overflow-x`为hidden和`overflow-y`为scroll，去掉页面的横向移动
 - 设置所有上层div的`height`为100%和sider的`bottom`为0，让sider悬浮在屏幕右边

---

title: "小知识点：easyui-draggable内部事件失效与解决、table列宽行高限制"
date: 2014-08-28 22:52
comments: true
categories: [jquery, easyui, html]
---
### 一、easyui-draggable内部事件失效与解决

使用easyui做一个可拖拽课表的过程中发现：位于draggable部件中的选择框、输入框、链接等都无法得到焦点，原因是当你点击draggable时就已经触发了拖拽事件，easyui会创建一个proxy覆盖在draggable上拦截了所有的事件，解决的办法是让proxy延迟出现，但对easyui不是很了解，没能解决好，所以在<a href="http://www.jeasyui.com/forum/index.php?topic=378.0">easyui的官方论坛</a>上找到了解决方法：

``` javascript
$('.drag').draggable({
             revert: true,
             proxy: 'clone',
             onStartDrag: function () {
                 var proxy = $(this).draggable('proxy');
                 proxy.hide();
                 setTimeout(function(){
                	 proxy.show();
                 }, 500);
             },
             onDrag: function(){
            	 $(this).draggable('proxy').show();
             },
             onStopDrag: function () {
                 $(this).draggable('options').cursor = 'move';
             }
         });
```

### 二、table列宽行高限制

table的每一列的宽和行的高都是可以设置的，但是当单元格里的内容的宽高超出已设置的值时，table就会自适应的进行调整，但有时我们并不希望这样而造成的界面变形，但是table并没有类似max-height、max-width可以限制宽高的参数，那现在应该想到的是有这样的参数的标签，我们可以把它嵌套到table的每一个格里，让table去适应它，那最简单的应该就是div了。

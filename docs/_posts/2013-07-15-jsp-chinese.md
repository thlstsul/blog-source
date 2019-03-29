---

title: "传递中文参数时出现乱码"
date: 2013-07-15 20:11

categories: jsp
tags: 乱码
---
在jsp中，主要有两种传递参数的方式：
# 第一
通过request对象传递中文参数，也就是说传进和取出都是使用request，比如包括：
使用
``` jsp
< jsp:include page="Relative URL">
	< jsp:param name="param name" value="paramvalue" />
< /jsp:include> 
< jsp:forward page="Relative URL">
	< jsp:param name="paramname" value="paramvalue" />
< /jsp:forward> 
```
传参，使用request.getParameter()取参；
使用request.setAttriute(name,value)传参，使用request.getAttribute(name)取参。
出现乱码时，确保你已设置request.setCharacterEncoding("具体编码方式")，当然两端都得设置。

# 第二
直接在URL请求后添加，如:
``` html
<a href="zzm5460zzm.github.com?name=value">直接传递参数</a>
```
这种情况下，如果系统运行于容器下，出现乱码时，解决的办法是在传参端使用两次javascript:encodeURI()或java.net.URLEncoder.encode(String value,String encoding)进行两次编码（最好是UTF-8），而在取参端使用一次javascript:decodeURI()或java.net.URLDecoder.decode(String value,String encoding)进行解码。我知道你一定会问为什么是这种不对称的关系，下面是原因：
第一次编码，你的参数内容便不带有多字节字符了，成了纯粹的 Ascii 字符串。(这里把编第一次的结果叫成 [STR_ENC1] 好了。[STR_ENC1] 是不带有多字节字符的)
再编一次后，提交，接收时容器(tomcat)自动解一次　（容器自动解的这一次，不管是按 GBK 还是 UTF-8 还是 ISO-8859-1 都好，都能够正确的得到 [STR_ENC1]）
然后，再在程序中实现一次 decodeURIComponent (Java中通常使用 java.net.URLDecoder(***, "UTF-8")) 就可以得到想提交的参数的原值。
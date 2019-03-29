---
layout: post
title: "Spring beans"
date: 2014-05-28 22:52
comments: true
categories: java
tags: beans
---
Spring beans 全部标签和属性
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans>
	<!--定义一个bean，id和name只取其一，因为id有字符限制，有时只能使用name-->
	<bean 
		id="classId" 
		name="className1,className2;className3 className4" 
		class="package.class" 
		scope="'singleton'or'prototype'" 
		singleton="'true'or'false'"
		abstract="'true'or'false'"
		parent="a abstract bean">
		<!--Bean实例化-->

		<!--构造器实例化，value和ref只取其一，value传值，ref注入-->
		<constructor-arg index="0" value="arg0-value" ref="another-bean-id"/>
		<!-- 通过构造器参数索引方式依赖注入 -->
		<constructor-arg index="0" value="arg0-value"/>
    	<constructor-arg index="1" value="arg1-value"/>
		<!-- 通过构造器参数类型方式依赖注入 -->
   		<constructor-arg type="java.lang.String" value="String-value"/>
   		<constructor-arg type="int" value="int-value"/>
		<!-- 通过构造器参数名称方式依赖注入 -->
   		<constructor-arg name="name1" value="name1-value"/>
   		<constructor-arg name="name2" value="name2-value"/>


		<!--setter实例化-->
		<property name="class-property-name" value="" ref=""/>

		<!--注入集合-->
		<property name="property-list">
			<list>
				<value>value0</value>
				<value>value1</value>
			</list>
		</property>
		<property name="property-set">
			<set>
				<value>value0</value>
				<value>value1</value>
			</set>
		</property>
		<property name="property-map">
			<map>
				<entry>
					<key>key0</key>
					<value>value0</value>
				</entry>
				<entry key="key1" value="value1"/>
			</map>
		</property>
		<property name="property-props">
			<props>
				<prop key="key0">value0</prop>
				<prop key="key1">value1</prop>
			</props>
		</property>



	</bean>

	<!--Spring 2.0后定义一个切面-->
	<aop:config> <!--顶级AOP元素，大部分AOP元素都需包含在此元素里-->
		<aop:aspect ref="aspect-bean">
			<aop:pointcut id="pointcut-id"/> <!--与pointcut-ref属性组合使用-->

			<aop:before 
				method="a-method-of-aspect" 
				pointcut="Regex" 
				pointcut-ref="pointcut-id"/>

			<aop:after-returning 
				method="a-method-of-aspect" 
				pointcut="Regex" 
				pointcut-ref="pointcut-id"/>

			<aop:after 
				method="a-method-of-aspect" 
				pointcut="Regex" 
				pointcut-ref="pointcut-id"/>

			<aop:after-throwing 
				method="a-method-of-aspect" 
				pointcut="Regex" 
				pointcut-ref="pointcut-id"/>

			<aop:around 
				method="a-method-of-aspect" 
				pointcut="Regex" 
				pointcut-ref="pointcut-id"/>
		</aop:aspect>
	</aop:config>
	
</beans>
```
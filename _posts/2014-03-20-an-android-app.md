---
layout: post
title: "最近做的一个安卓小程序"
date: 2014-03-20 22:53
comments: true
categories: Android
tags: SensorEventListener
---
前几天因为无聊又突然觉得**Android**开发好像挺好玩的，所以就从零基础动手开发了一个摇骰子的小游戏。下面把开发过程和所使用的类库简单的记录一下，免得以后重走一趟，因为网上一些教程真的很坑爹有木有！！！<!--more-->

首先要设计一下**布局和功能**：这部分简单一点就行，只需要一个位于屏幕中央的逐帧骰子动画，在摇动手机时循环播放骰子的六个面并在停止摇动的一段时间后停止播放，其间伴随震动。大概就这样……

接下来就是实现了，因为是零基础，所以只好一步一步来了。

1. 动画、声音、震动

>我需要的是逐帧动画，相比之下，**Frame by Flame Animation**比较的简单,所以就选它了。还有就是声音，有两种实现方式：**MediaPlayer和SoundPool**，从名字就可看出来MediaPlayer主要用于播放背景音乐而SoundPool主要用于播放音效，所以选择**SoundPool**播放骰子撞击杯壁的声音。实现震动的只有一个Vibrator。

2. 传感器、响应逻辑

>说到传感器，要选择哪个？当然是重力（加速度）感应器——**Sensor.TYPE_ACCELEROMETER** 。响应逻辑大概是：当重力坐标的变动达到某个阀值时，播放动画和音效并启动震动，之后在停止监听，并在随机一段时间后停止动画、重新开启监听。

3. 接下是什么哈？动手啊，等不及了！！！

> 界面神马的拖拽两下就完成了，但要注意的是拖拽**ImageView**的时候会自动生成`drawable:scr`属性，把它去掉，不然动画是不会动的好吗。接下来是类设计，本来需要：

>  - 自动生成的Activity子类
>  - SensorEventListener子类
>  - 骰子类
>  - 加载音乐类
>  - 加载动画类
>  因为代码很少，所以我把后三个类阉割了。

下面是代码：

``` java DiceActivity.java
package com.igeek.dice;

import android.media.AudioManager;
import android.media.SoundPool;
import android.os.Bundle;
import android.os.Handler;
import android.os.Vibrator;
import android.widget.ImageView;
import android.app.Activity;
import android.content.Context;
import android.graphics.drawable.AnimationDrawable;

public class DiceActivity extends Activity {
    //摇动监听器
    ShakeListener mShakeListener = null;
    
    private ImageView animationIV;
    private AnimationDrawable mAnimationDrawable;
    
    private SoundPool sndPool;
    private int soundId;
    
    private Vibrator mVibrator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dice);

        animationIV=(ImageView)findViewById(R.id.animationIV);
        animationIV.setBackgroundResource(R.drawable.diceanim);
        mAnimationDrawable=(AnimationDrawable)animationIV.getBackground();
        
        loadSound();
        
        mVibrator = (Vibrator)getSystemService(Context.VIBRATOR_SERVICE);
        final long[] pattern = {166,166,166,166,166,166};
        
        mShakeListener = new ShakeListener(this);
        mShakeListener.setOnShakeListener(new ShakeListener.OnShakeListener() {
            public void onShake() {
                startAnim();
                mVibrator.vibrate(pattern, -1);
                mShakeListener.stop();
                sndPool.play(soundId, (float) 1, (float) 1, 0, 0,(float) 1.2);
                new Handler().postDelayed(new Runnable(){
                    public void run(){
                        stopAnim();
                        mShakeListener.start();    
                    }
                }, (long)(Math.random()*1000+2000));
            }
        });
    }
    
    public void loadSound(){ //加载声音
        sndPool = new SoundPool(2, AudioManager.STREAM_SYSTEM, 5);
        final Context context=this;
        new Thread(){
            public void run(){
                soundId=sndPool.load(context,R.raw.didi, 1);
            }
        }.start();
    }
    
    public void startAnim(){ //启动动画
        if(mAnimationDrawable.isRunning()){
            mAnimationDrawable.stop();
            mAnimationDrawable.start();
        }else{
            mAnimationDrawable.start();
        }
    }
    
    public void stopAnim(){ //停止动画
        if(mAnimationDrawable.isRunning()){
            mAnimationDrawable.stop();
        }
    }
    
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mShakeListener != null) {
            mShakeListener.stop();
        }
        mVibrator.cancel();
    }
}

```
``` java ShakeListener.java
package com.igeek.dice;

import android.content.Context;  
import android.hardware.Sensor;  
import android.hardware.SensorEvent;  
import android.hardware.SensorEventListener;  
import android.hardware.SensorManager;  
  
/** 
 * 一个检测手机摇晃的监听器 
 */  
public class ShakeListener implements SensorEventListener {  
    // 速度阈值，当摇晃速度达到这值后产生作用  
    private static final int SPEED_SHRESHOLD = 2000;  
    // 两次检测的时间间隔  
    private static final int CEIL_INTERVAL_TIME = 70;  
    // 传感器管理器  
    private SensorManager sensorManager;  
    // 传感器  
    private Sensor sensor;  
    // 重力感应监听器  
    private OnShakeListener onShakeListener;  
    // 上下文  
    private Context mContext;  
    // 手机上一个位置时重力感应坐标  
    private float lastX;  
    private float lastY;  
    private float lastZ;  
    // 上次检测时间  
    private long lastUpdateTime;  
  
    // 构造器  
    public ShakeListener(Context c) {  
        // 获得监听对象  
        mContext = c;  
        start();  
    }  
  
    // 开始  
    public void start() {  
        // 获得传感器管理器  
        sensorManager = (SensorManager) mContext  
                .getSystemService(Context.SENSOR_SERVICE);  
        if (sensorManager != null) {  
            // 获得重力传感器  
            sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);  
        }  
        // 注册  
        if (sensor != null) {  
            sensorManager.registerListener(this, sensor,  
                    SensorManager.SENSOR_DELAY_GAME);  
        }  
  
    }  
  
    // 停止检测  
    public void stop() {  
        sensorManager.unregisterListener(this);  
    }  
  
    // 设置重力感应监听器  
    public void setOnShakeListener(OnShakeListener listener) {  
        onShakeListener = listener;  
    }  
  
    // 重力感应器感应获得变化数据  
    public void onSensorChanged(SensorEvent event) {  
        // 现在检测时间  
        long currentUpdateTime = System.currentTimeMillis();  
        // 两次检测的时间间隔  
        long timeInterval = currentUpdateTime - lastUpdateTime;  
        // 判断是否达到了检测时间间隔  
        if (timeInterval < CEIL_INTERVAL_TIME)  
            return;  
        // 现在的时间变成last时间  
        lastUpdateTime = currentUpdateTime;  
  
        // 获得x,y,z坐标  
        float x = event.values[0];  
        float y = event.values[1];  
        float z = event.values[2];  
  
        // 获得x,y,z的变化值  
        float deltaX = x - lastX;  
        float deltaY = y - lastY;  
        float deltaZ = z - lastZ;  
  
        // 将现在的坐标变成last坐标  
        lastX = x;  
        lastY = y;  
        lastZ = z;  
  
        double speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ  
                * deltaZ)  
                / timeInterval * 10000;  
        // 达到速度阀值，发出提示  
        if (speed >= SPEED_SHRESHOLD) {  
            onShakeListener.onShake();  
        }  
    }  
  
    public void onAccuracyChanged(Sensor sensor, int accuracy) {  
  
    }  
  
    // 摇晃监听接口  
    public interface OnShakeListener {  
        public void onShake(); 
    }  
  
}  
```
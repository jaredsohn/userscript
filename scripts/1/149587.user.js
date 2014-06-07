// ==UserScript==
// @name           Google 显示昵称
// @description    在 Google 显示自定义昵称 By Xiaohaizi02009
// @version        1.7
// @match          http://www.google.com/*
// @match          http://www.google.com.hk/*
// @match          http://www.google.co.jp/*
// @match          http://www.google.co.kr/*
// @match          http://www.google.co.uk/*
// @match          https://www.google.com/*
// @match          https://www.google.com.hk/*
// @match          https://www.google.co.jp/*
// @match          https://www.google.co.kr/*
// @match          https://www.google.co.uk/*
// ==/UserScript==

//EBC Module
document.getElementsByClass=function(className){  
  var clsArry=[];//储存匹配元素  
  var reg=new RegExp("\\b"+className+"\\b");  //匹配className的正则表达式  
  var element = this.getElementsByTagName("*");  //获取页面所有的html元素  
  for(var i=0;i < element.length;i++){  
    if(reg.test(element[i].className)){  
      clsArry.push(element[i]);  
    }  
  }  
  return clsArry;  
}  

//Main Module
var cls=document.getElementsByClass("num");  
document.getElementById('gbi4t').innerHTML="Shinichi Kudou";
document.getElementById('gbmpn').innerHTML="Shinichi Kudou";
document.getElementsByClass('gbts')[0].innerHTML="+Shinichi";
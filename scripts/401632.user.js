// ==UserScript==
// @name       众划算自动提交
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  众划算自动提交
// @match	  http://detail.zhonghuasuan.com/*
// @copyright  2014+, Duck Wang
// ==/UserScript==
x1=document.getElementsByClassName("goodsDetail-HXJ clearfix")[0];
x2=x1.getElementsByTagName("a")[0];
var t
var timedCount=function()
 {
  if (x2.innerText=="我要抢购")
{x2.click();
 clearTimeout(t);
}
else {t=setTimeout("window.location.reload()",1000)}
}
timedCount();
// ==UserScript==
// @name          微博未读数标题栏显示
// @version       1.0
// Release Date:  2013-04-02
// @description   在新浪微博标题栏上显示未读数

// @namespace   http://skeeterhouse.com/
// @include     http://weibo.com/*

// @grant       none
// ==/UserScript==



function showLogin()
{
var strt=document.documentElement.outerHTML;

t1=strt.indexOf("条新微博，点击查看");
t2=strt.indexOf("feed_new_weibo");
t3=strt.substring(t2+17,t1-1);
if (t1!=-1)
  {
  document.title="有"+t3+"条新消息";
  }
else
  {
  document.title="新浪微博";
  }

// t4=document.title;
// alert(t4);
}



setInterval(showLogin,30000);
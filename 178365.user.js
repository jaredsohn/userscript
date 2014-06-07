// ==UserScript==
// @name        获取我喜爱的贴吧
// @namespace   yuxingyc
// @description 获取我喜爱的贴吧 数组代码
// @include     http://tieba.baidu.com/f/like/mylike*
// @version     1.0
// ==/UserScript==
/*
 *这个脚本需配合以下脚本使用
 *贴吧_根据关键词屏蔽提醒(https://userscripts.org/scripts/show/177600)
 */
var num=location.href.match(/\d+/);
if(num=='1')GM_setValue("mylike","");
if(!num)alert("请打开http://tieba.baidu.com/f/like/mylike?&pn=1")
var a=document.querySelectorAll('a');
var b=GM_getValue("mylike","");
for(var i in a){if(a[i].title&&a[i].title.length>0)b+=',"'+a[i].title+'"';}
GM_setValue("mylike",b);
if(a[a.length-2].innerHTML=="下一页"){
	location.href=a[a.length-2].href;
	document.body.innerHTML="正在获取数据, 请稍等...";
}else {
	GM_setValue("mylike","");
	document.body.innerHTML="贴吧_根据关键词屏蔽提醒(https://userscripts.org/scripts/source/177600),获取获取我喜爱的贴吧<br><br>请复制以下代码到脚本的指定位置<br><br>"+b.replace(",","var tiebaWhiteList=[")+"];";
	}
// ==UserScript==
// @name 新浪微博 新窗口打开缩略图自动变大图
// @namespace  http://weibo.com/zheung
// @version    0.1
// @description  如题
// @updateURL https://userscripts.org/scripts/source/176878.meta.js
// @downloadURL https://userscripts.org/scripts/source/176878.user.js
// @match      http://*.sinaimg.cn/*
// @copyright  DanoR
// ==/UserScript==

if (location.href.indexOf("sinaimg.cn/square/")!=-1)
{
	var p1=new String(location.href.replace('square','large'));
	location.href=p1;
}
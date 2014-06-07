// ==UserScript==
// @name          baidu search url cleaner
// @author        kl
// @description   百度搜索引擎链接直接链接，不再跳转
// @include       http://*.baidu.com/*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.1
// @history       0.0.1 2011-12-03
// ==/UserScript==

var bllink=location.host.toLowerCase(); 

if (bllink.indexOf(".baidu.com")>=0){
	var blelement=document.querySelectorAll(".t > a"); 
	for (var i=0;i<blelement.length;i++){
		//blelement[i].onmousedown = null; 
		blelement[i].setAttribute("onmousedown", "");
    }
}
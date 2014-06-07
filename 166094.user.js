// ==UserScript==
// @name        解决bilibili弹幕ID错误
// @description 去除播放器中的aid参数
// @namespace   Jamie1993
// @include     http://www.bilibili.tv/video/*
// @version     1.0
// ==/UserScript==
	var str1 = document.getElementById("bofqi").innerHTML;	
	if (str1.search("aid") === 68){
	var str2 = str1.substring(0,63);	
	var str3 = str1.substring(78,174);	
	var str4 = str2.concat(str3);
	document.getElementById("bofqi").innerHTML = str4;
	}

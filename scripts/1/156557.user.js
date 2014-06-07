// ==UserScript==
// @name        去除搜搜问问重定向
// @namespace   UserScript
// @include     http://wenwen.soso.com/*
// @version     1
// ==/UserScript==
if (window != window.top)
	return;
var a = document.getElementsByTagName('a');
for (var i = 0; i < a.length; i++)
	if (a[i].parentNode.className == 'answer_con')
		a[i].href = a[i].innerHTML;

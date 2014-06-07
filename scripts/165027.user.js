// ==UserScript==
// @name        ktxp
// @namespace   soutear@gmail.com
// @description 极影动漫BT站页面简化.
// @include     http://bt.ktxp.com/*
// @version     0.01
// ==/UserScript==

// 论坛帖子
if (document.getElementById("recommend"))
	document.getElementById("recommend").style.display = 'none';

// 极影分栏
if (document.getElementById("resource-list"))
	document.getElementById("resource-list").getElementsByTagName("div")[0].getElementsByTagName("div")[0].style.display = 'none';
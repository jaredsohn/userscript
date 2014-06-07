// ==UserScript==
// @name        Change backgroundcolor for the web pages
// @namespace   http://userscripts.org/users/508758
// @description 改变网页全部背景颜色为豆沙绿以保护眼睛
// @include     *
// @version     1.0
// ==/UserScript==


// ------------------------------ Read Me ------------------------------ //
// 该脚本把网页所有的背景颜色都改变成了豆沙绿，用于保护眼睛
// firefox only

// ----------------------------- Update Log ---------------------------- //
// first created on Mar 21, 2013
// first finished on Mar 22, 2013

fun();
	
function changeColor(a) {	//改变标签a的背景色
	a.style.backgroundColor = "#C7EDCC";	//该颜色看起来比较舒服
	}
	
function fun() {
	var arr = document.getElementsByTagName("*");
	for (var i in arr) 
		changeColor(arr[i]);
	}

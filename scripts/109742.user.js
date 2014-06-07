// ==UserScript==
// @name           addnoticeintitle for g+
// @version        1.1
// @namespace      
// @description    add your notification number in title bar
// @include        https://plus.google.com/*
// ==/UserScript==

var notice = new Object();
var title = new String();
var defaultTitle = new String();
var num = new String();

notice = document.getElementById("gbi1");
defaultTitle = document.title;


var timer = setInterval(function(){
	num = document.getElementById("gbi1").innerHTML;
	
	if (num != "&nbsp;" && num != "0") {
		title = "(" + num + ")" + defaultTitle;
		document.title = title;
	} else {
		document.title = defaultTitle;
	}
},1000);
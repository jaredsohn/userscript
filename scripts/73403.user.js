// ==UserScript==
// @name           Cl1k Theme!
// @namespace      Zarato
// @description    It's a theme for Cl1k!
// @include        http://beta.cl1k.cc/*
// ==/UserScript==

var thing1 = document.getElementById('surround');
var body = thing1.parentNode;
var contentborder = document.getElementById('content-border');
var text1 = document.getElementById('topbar-menu');
var text2 = document.getElementById('content');
if(body)
     {
	 body.style.background = "transparent url(http://dl.dropbox.com/u/1745917/background.png) repeat scroll 0 0";
	 text1.style.color = "#9c6936"
	 text2.style.color = "#9c6936"
	 contentborder.style.background = "transparent url(http://dl.dropbox.com/u/1745917/thingy.png) no-repeat scroll 0 0";
	 }
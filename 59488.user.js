// ==UserScript==
// @name           Fox News Wider Text
// @namespace      foxnews
// @description    Widen the main text and increase font size of the main text area.  Removes right column
// @include        http://www.foxnews.com/politics/*
// ==/UserScript==

document.getElementById("side").parentNode.removeChild(document.getElementById("side"));
var x = document.getElementById("loomia_display").parentNode;
x.parentNode.removeChild(x);
var nm = document.getElementById("main");
nm.style.width = (nm.clientWidth + 300) + "px";
var plist = document.getElementsByTagName("p");
for(var i = 0;i < plist.length;i++){
	plist.item(i).style.fontSize = "14px";
}

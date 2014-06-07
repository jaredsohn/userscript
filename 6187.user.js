// ==UserScript==
// @name          Google & Garfield
// @namespace     http://www.hanique.com/
// @include       http://google.*/*
// @include       http://www.google.*/*
// @description	  Adds the comic strip of the day from Garfield.com to the
//                bottom of Google pages.
// ==/UserScript==

// The code below is copied from Garfield's website.
var now = new Date();
function addZero(num){
	if (num <= 9){
		num = "0" + num;
	}
	return num;
}
var monthNum = now.getMonth() + 1;
monthNum = addZero(monthNum);
var yearNum = now.getYear();
if (yearNum < 2000){
	yearNum -= 100;
}else{
	yearNum -= 2000;
}
var dayNum = now.getDate();
dayNum = addZero(dayNum);
var stripName="http://images.ucomics.com/comics/ga/2006/ga0";
var c_strip = stripName + yearNum + monthNum + dayNum + ".gif";

// This adds the image to the last Center element of the Body.
var f = document.firstChild.childNodes[1].getElementsByTagName("center");
var	i = document.createElement("img");
i.src = c_strip;
f[f.length - 1].appendChild(document.createElement("br"));
f[f.length - 1].appendChild(i);

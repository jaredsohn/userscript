// ==UserScript==
// @name           Chicas v2
// @namespace      Azaret
// @description    v2 of eRepublik for women
// @include        http://*.erepublik.com/*
// ==/UserScript==

// URL Setup
var currURL = location.href;
var arrURL = currURL.split('/');
//alert(arrURL[4]);

switch(arrURL[4])
{
case 'work':
		var bg2ch = document.getElementById("content");
		bg2ch.style.backgroundImage = "url(\"http://img.skitch.com/20100628-nujuhmep6pt697q4tqw8mgxafk.jpg\")";
		var tx2ch = document.getElementById("healthLevel1");
		tx2ch.innerHTML = tx2ch.innerHTML.replace("Emma","Jim");
	break;
case 'train':
		var bg2ch = document.getElementById("content");
		bg2ch.style.backgroundImage = "url(\"http://img.skitch.com/20100628-gk96ytphfirumqy4nujdtmnuie.jpg\")";
		var tx2ch = document.getElementById("healthLevel1");
		tx2ch.innerHTML = tx2ch.innerHTML.replace("Lana","Brad");
	break;
case 'entertain':
		var bg2ch = document.getElementById("content");
		bg2ch.style.backgroundImage = "url(\"http://img.skitch.com/20100629-ps5q7c88584fiyq1bkx1j51bjw.jpg\")";
		var tx2ch = document.getElementById("healthLevel1");
		tx2ch.innerHTML = tx2ch.innerHTML.replace("Lisa","Tony");
	break;
case 'study':
		var bg2ch = document.getElementById("content");
		bg2ch.style.backgroundImage = "url(\"http://img.skitch.com/20100630-q411965f717xabtr1p47p1g14f.jpg\")";
		var tx2ch = document.getElementById("healthLevel1");
		tx2ch.innerHTML = tx2ch.innerHTML.replace("Gina","Steeve");
	break;
	
}
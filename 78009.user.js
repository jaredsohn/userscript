// ==UserScript==
// @name           remove the ugly purple icon in Taiwan Yahoo News
// @namespace      http://asia.com/zona
// @include        http://tw.news.yahoo.com/*
// ==/UserScript==



var all = document.getElementsByTagName("a");

for (var i=0; i< all.length; i++) {

     if (all[i].className=="ynwsyq") {
	all[i].removeAttribute('class');
	all[i].style.textDecoration="none";
     }
}
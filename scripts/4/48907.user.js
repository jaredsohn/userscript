// ==UserScript==
// @name           Runescape in full screen
// @namespace      http://www.jorisgames.tk
// @description    this script makes dat you can play runescape witch full screen
// @include        *world*.runescape.com/*
// ==/UserScript==

//var currentpage = window.location.href;

//By: Joris Kerkhoff
//if you want to automaticly integrate joris' function (improved) then uncomment the following:
//function skippy() {
//  if(/Skip available in \d+ seconds/.test(document.body.textContent)) {
//    unsafeWindow.hideVideoAd();
//    clearInterval(due);
//  }
//}
//var due = setInterval(skippy, Math.floor(Math.random()*500)+1042);


	var nav = document.getElementById("menubox");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}
	nav = document.getElementById("tb");
	if (nav) {
	    nav.parentNode.removeChild(nav);
	}

{
alert("runescape kan nu ook gespeeld worden met voledig scherm");
}
// ==UserScript==
// @name           RuneScape Ad and Menu Remover
// @version        0.1.0.1
// @namespace      http://userscripts.org/users/Kangaru
// @description    Removes the ad and the menubar from RuneScape.
// @include        http*://world*.runescape.com/*
// @run-at         document-end
// ==/UserScript==

var adEle = document.getElementById("advert");
adEle.parentNode.removeChild(adEle);

document.getElementById("content").style.overflow = "hidden";

document.getElementById("game").style.top = -50;

document.getElementById("applet_cell").style.height = window.innerHeight + 50;

window.onresize = function(event) {
	document.getElementById("applet_cell").style.height = window.innerHeight + 50;
}

//#TYBG
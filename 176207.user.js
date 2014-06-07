// ==UserScript==
// @name        BassPlugLiteLoader
// @namespace   http://userscripts.org/scripts/source/153544.user.js
// @description Autoruns BassplugLite on plug.dj
// @include     http://plug.dj/*
// @version     1
// @grant	metadata
// ==/UserScript==

setTimeout(function(){
$(function(){
function inject(){
	var BassPlugLite = document.createElement("script");
	BassPlugLite.setAttribute("id", "BassPlugLite");
	BassPlugLite.setAttribute("src", "https://raw.github.com/derpthebass/BassPlugLite/master/BassPlugLite.js");
	BassPlugLite.setAttribute("type", "text/javascript");
	document.head.appendChild(BassPlugLite);
}

  inject();


})
}, 2000);
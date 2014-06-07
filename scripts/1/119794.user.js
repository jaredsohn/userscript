// ==UserScript==
// @name           Ticker Hider
// @namespace      thecohenoam.co.cc
// @include        https://www.facebook.com*
// ==/UserScript==

window.addEventListener ("DOMContentLoaded", function() {
	document.querySelector('#pagelet_ticker').style.display = "none";
	document.querySelector('.fbSidebarGripper').style.display = "none";
	document.querySelector('.fbChatOrderedList').style.paddingTop = "0px";
}, false);
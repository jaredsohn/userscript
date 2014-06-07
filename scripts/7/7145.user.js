// ==UserScript==
// @name Hotmail Middle Click
// @namespace http://moz.theunfocused.net/
// @description Fix to re-enable middle clicking (and ctrl-left clicking, etc) in Hotmail
// @include http://*.hotmail.msn.com/*
// ==/UserScript==

window.addEventListener("load", function(e) {
	window.setTimeout(function(){
		document.wrappedJSObject.onclick = function(){}
	}, 0);
}, false);
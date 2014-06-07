// ==UserScript==
// @name          Line breaks!
// @version       0.0.1
// @author        Stephen
// @namespace     http://userscripts.org/users/435728
// @description   Lets you put line breaks in asks again. Hallelujah!
// @include       http://www.tumblr.com/ask_form/*
// ==/UserScript==
			
document.onkeydown = function(e){
	if (! e) e = window.event;
	var code = e.charCode ? e.charCode : e.keyCode;
	if (code == 13) return true;
};

if (q.value.match(/\n/g)) q.value = q.value.replace(/\n/g);
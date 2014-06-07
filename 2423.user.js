// ==UserScript==
// @name		YTnewwindowND
// @namespace		
// @description		Makes YTMND pages open in a new window
// @include		http://www.ytmnd.com/list/*
// ==/UserScript==
(function () {
	var external = document.links; 
	for (var k=0; k<external.length; k++)	
	if (external[k].href && (external[k].target!="_blank" || external[k].target!="_new")) 
	external[k].target = "_new";
})();
// ==UserScript==
// @name           eRep Exclamation Mark Fix
// @namespace      eRep Exclamation Mark Fix
// @creator        mkey
// @description    Removes the annoying pulsating exclamation mark
// @include        http://*.erepublik.com/*
// ==/UserScript==

(function(){
	var a= document.getElementById("point");
	if (a) a.parentNode.removeChild(a); 
})()


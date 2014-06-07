// ==UserScript==
// @name                Facebook Red Menu Bar
// @description         My first Greasemonkey script. :) Simple script making menubar at the Facebook Login Screen red.
//@include		http://*.facebook.com/*
//@exclude		
// ==/UserScript==

	var elmModify = document.getElementById("fb_menubar");
	elmModify.style.backgroundColor = 'red';
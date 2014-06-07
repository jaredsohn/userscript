// ==UserScript==
// @name		netcraft relinker
// @namespace	http://antihero.cc/scripts/greasemonkey/
// @description	Rewrites links to not open in a new window.
// @include	http://*.netcraft.com/*
// @exclude
// ==/UserScript==

( function() {

	anchors = document.getElementsByTagName('a');
	for(var i = 0; i < anchors.length; i++) {
		anchors[i].target = "_self";
	}
	
	forms = document.getElementsByTagName('form');
	for(var i = 0; i < forms.length; i++) {
		forms[i].target = "_self";
	}
	
})();
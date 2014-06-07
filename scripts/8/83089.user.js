// ==UserScript==
// @name          Twitter hide "Who to follow"
// @description	  What it says.
// @namespace     http://www.rhyley.org/gm/
// @include       http://twitter.com/*
// By Jason Rhyley (jason AT rhyley DOT org)
// ==/UserScript==

(function() {

	var kil = document.createElement('style'); 
	kil.setAttribute('type','text/css'); 
	kil.appendChild(document.createTextNode('#recommended_users {display:none !important;}'));
	document.body.insertBefore(kil, document.body.firstChild); 

})();


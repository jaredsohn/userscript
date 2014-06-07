// ==UserScript==
// @name          Tumblr Highlighted Posts Killer
// @description	  Removes all the visual clutter from highlighted posts
// @namespace     http://www.rhyley.org/gm/
// @include       http://www.tumblr.com/dashboard*
// @include       http://www.tumblr.com/likes*
// @include       http://www.tumblr.com/liked/*
// @include       http://www.tumblr.com/tagged/*
// By Jason Rhyley (jason AT rhyley DOT org)
// ==/UserScript==

(function() {

	var kil = document.createElement('style'); 
	kil.setAttribute('type','text/css'); 
	kil.appendChild(document.createTextNode('.highlight_ribbon {display:none !important;} .promotion_highlighted {box-shadow:none !important; -webkit-box-shadow:none !important;}'));
	document.body.insertBefore(kil, document.body.firstChild); 

})();

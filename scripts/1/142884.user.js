// ==UserScript==
// @name          asanusta Tumblr Highlighted Posts Killer
// @description	  Vurgulanan mesajlarını tüm görsel dağınıklığını ortadan kaldırır-Removes all the visual clutter from highlighted posts
// @versione      2.9.2012
// @namespace     http://www.rhyley.org/gm/
// @include       http://www.tumblr.com/dashboard*
// @include       http://www.tumblr.com/likes*
// @include       http://www.tumblr.com/liked/*
// @include       http://www.tumblr.com/tagged/*
// By Jason Rhyley (asanusta)
// ==/UserScript==

(function() {

	var kil = document.createElement('style'); 
	kil.setAttribute('type','text/css'); 
	kil.appendChild(document.createTextNode('.highlight_ribbon {display:none !important;} .promotion_highlighted {box-shadow:none !important; -webkit-box-shadow:none !important;}'));
	document.body.insertBefore(kil, document.body.firstChild); 

})();
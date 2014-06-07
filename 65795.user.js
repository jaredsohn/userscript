// ==UserScript==
// @name		Jetpack Gallery Remove Search Form
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-05
// @lastupdated	2010-01-05
// @namespace	jpgRemoveSearchForm
// @include		http://jetpackgallery.mozillalabs.com/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will remove the search bars from the Jetpack Gallery
// ==/UserScript==

(function(){
	var s=document.evaluate("//section[@id='search']/form",document,null,9,null).singleNodeValue;
	if(!s) return;
	s.parentNode.removeChild(s);
})();
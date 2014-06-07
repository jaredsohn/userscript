// ==UserScript==
// @name		Jetpack Gallery Automatically Let Me Install
// @author		Erik Vergobbi Vold
// @datecreated	2009-12-27
// @lastupdated	2009-12-27
// @namespace	jetpackGalleryAutoLetMeInstall
// @include		http://jetpackgallery.mozillalabs.com/jetpacks/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will automatically click the "I Understand" checkbox for unreviewed Jetpacks.
// ==/UserScript==

(function(){
	var c=document.getElementById('i_understand');
	if(!c) return;
	c.click();
})();
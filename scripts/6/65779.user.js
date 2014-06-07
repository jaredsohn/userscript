// ==UserScript==
// @name		Jetpack Gallery 'Add Jetpack' Menu Command
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-05
// @lastupdated	2010-01-05
// @namespace	jpgAddJetpackMenuCmd
// @include		http://jetpackgallery.mozillalabs.com/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will add a 'Add Jetpack' Greasemonkey menu command to the Jetpack Gallery, so that you can get to the page from any Jetpack Gallery page.
// ==/UserScript==

(function(){
	GM_registerMenuCommand("Add Jetpack", function(){
		window.open("http://jetpackgallery.mozillalabs.com/jetpacks/add");
	});
})();
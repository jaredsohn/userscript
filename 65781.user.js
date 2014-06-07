// ==UserScript==
// @name		Userscripts.org 'Add Jetpack' Menu Command
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-05
// @lastupdated	2010-01-05
// @namespace	usoAddJetpackMenuCmd
// @include		http://userscripts.org/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will add a 'Add Jetpack' Greasemonkey menu command to Userscripts.org, so that you can get to the page from any Userscripts.org page.
// ==/UserScript==

(function(){
	GM_registerMenuCommand("Add Jetpack", function(){
		window.open("http://userscripts.org/jetpacks/new");
	});
})();
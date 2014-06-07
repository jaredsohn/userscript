// Block Sites
// version 0.1
// Gina Trapani, edited by celldrifter
// 2006-01-03, 2007-01-02
// Released to the public domain.
//
// ==UserScript==
// @name          Block Sites
// @description   Blocks sites added to the list. Slimmed & edited version of 
Invisibility Cloak, written by Gina Trapani of Lifehacker.com.
// @include       http://*youtube.com*
// ==/UserScript==

(function () {
	var b = (document.getElementsByTagName("body")[0]);
	b.setAttribute('style', 'display:none!important');
	alert("This site has been blocked!");
})();
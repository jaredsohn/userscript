// ==UserScript==
// @name		Jetpack Gallery Remove Footer
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-05
// @lastupdated	2010-01-05
// @namespace	jpgRemoveFooter
// @include		http://jetpackgallery.mozillalabs.com/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will remove the footer from the Jetpack Gallery
// ==/UserScript==

(function(){
	var footer=document.getElementsByTagName("footer")[0];
	if(!footer) return;
	footer.parentNode.replaceChild(document.createElement('br'),footer);
})();
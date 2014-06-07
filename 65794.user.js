// ==UserScript==
// @name		Jetpack Gallery Remove Submit Jetpack Button
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-05
// @lastupdated	2010-01-05
// @namespace	jpgRemoveSubmitJetpackBtn
// @include		http://jetpackgallery.mozillalabs.com/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will remove the submit jetpack buttons from the Jetpack Gallery
// ==/UserScript==

(function(){
	var btn=document.getElementById("submit");
	if(!btn) return;
	btn.parentNode.removeChild(btn);
})();
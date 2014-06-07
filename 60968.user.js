// ==UserScript==
// @name		Remove Mixx 8 Ball
// @author		Erik Vold
// @datecreated	2009-10-31
// @lastupdated	2009-11-01
// @namespace	mixxGroupsCreateNiche
// @include		http://*.mixx.com/*
// @version		0.1.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will remove the 8 Ball from Mixx
// ==/UserScript==

(function(){
	var old=document.getElementById('random-btn');
	if(old) old.parentNode.removeChild(old);
})();
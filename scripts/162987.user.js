// ==UserScript==
// @name			BGG Smart Comments
// @description		Automagically clicks the "Show All Comments" toggle when linked directly to a comment.
// @version			1.1

// @namespace		http://pilnick.com

// @include			http*://*boardgamegeek.com/geeklist/*#comment*
// @include			http*://*rpggeek.com/geeklist/*#comment*
// @include			http*://*videogamegeek.com/geeklist/*#comment*
// @include			http*://*geekdo.com/geeklist/*#comment*

// @run-at			document-end
// @grant			none
// ==/UserScript==

var ccontrol=document.getElementById('allcommentscontrol');
location.assign( "javascript:" + ccontrol.firstElementChild.getAttribute("onclick") + ";void(0)" );
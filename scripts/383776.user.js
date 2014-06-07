// ==UserScript==
// @name           KOC THRONE ROOM STATS
// @namespace      SKRAP
// @version        1a
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @description    View what stats each throne room card can have
// ==/UserScript==

//Fixed weird bug with koc game
if(window.self.location != window.top.location){
	if(window.self.location.href == window.parent.location.href)


AddMainTabLink('THRONE ROOM STATS', eventHideShow, mouseMainTab);
// ==UserScript==
// @name        what.cd - highlight recent items
// @namespace   diff
// @include     http*://what.cd/torrents.php*
// @exclude     http*://what.cd/torrents.php?id=*
//
// @include	http*://gazellegames.net/torrents.php*
// @exclude	http*://gazellegames.net/torrents.php?id=*
//
// @grant	none
// @version     0.3
// ==/UserScript==

var elms = document.querySelectorAll("span.time");

for (i=0; i < elms.length; i++) {
	var elm = elms[i];
	var time = elm.textContent + "";
	if ( /year|month|week/.test(time) ) continue;
	if (! /group_torrent/.test(elm.parentNode.parentNode.className) ) continue;
	elm.parentNode.parentNode.style.background = "#FFF6D4";
}
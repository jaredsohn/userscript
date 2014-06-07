// ==UserScript==
// @name           JVC 15-18 F5 auto.
// @namespace      Zecko
// @description    Rafraîchit le 15-18 toute les 10 secondes
// @include        http://www.jeuxvideo.com/forums/0-50-0-1-0-1-0-0.htm
// ==/UserScript==

if(!document.getElementById('newsujet').value)
{
	setTimeout('location.reload()', 10000);
}
// ==UserScript==
// @name           Music Homepage
// @namespace      http://myspace.com/28406407
// @description    Add Music Player To Homepage
// @include        *
// ==/UserScript==

s= document.getElementById('splash_coolNewPeople').innerHTML = '<embed src="http://webjay.org/flash/xspf_player?autoload=1&amp;autoplay=1&amp;playlist_url=http://webjay.org/by/ninjamachine/hardcoremetal.xspf" />';

GM_addStyle(s);
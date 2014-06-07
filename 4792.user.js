// ==UserScript==
// @name           Music Homepage
// @namespace      http://myspace.com/shortpunk138
// @description    Add Music Player To Homepage
// @include        *
// ==/UserScript==

s= document.getElementById('splash_coolNewPeople').innerHTML = '<embed src="http://webjay.org/flash/xspf_player?autoload=1&autoplay=1&playlist_url=http://webjay.org/by/dexstar/dexstar5c27splaylist.xspf" quality="high" bgcolor="e6e6e6"  width="225" height="160" name="xspf_player" align="middle" type="application/x-shockwave-flash" />';

GM_addStyle(s);
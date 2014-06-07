// ==UserScript==
// @name         进入gf
// @namespace   gotogf
// @include     http://*hentaiverse.org/?s=Battle&ss=gr*
// @version     1
// ==/UserScript==
if (document.getElementById("arenaform")&&document.location.href=='http://hentaiverse.org/?s=Battle&ss=gr'&&confirm('要进入GF?'))document.getElementById('arenaform').submit()

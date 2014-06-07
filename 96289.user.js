
// SZ-online-autovote2
// version 0.1 BETA!
// 2011-02-06
// Copyright (c) 2011, harmoniemand
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            SZ-online-autovote2
// @namespace       http://harmoniemand.de
// @include         http://www.sz-online.de/nachrichten/voting.asp?Frage_ID=481
// ==/UserScript==


window.setTimeout(function() { javascript:document.location.href = "http://www.sz-online.de/nachrichten/voting.asp?aktion=&Frage_ID=481" }, 60000);

zeit = 60;

window.setInterval( 
	function ausgabe() {
		zeit -= 1;
		document.title = zeit;
	} , 1000);








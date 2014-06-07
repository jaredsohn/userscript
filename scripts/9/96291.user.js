
// SZ-online-autovote
// version 0.1 BETA!
// 2011-02-06
// Copyright (c) 2011, harmoniemand
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            SZ-online-autovote
// @namespace       http://harmoniemand.de
// @include         http://www.sz-online.de/nachrichten/voting.asp?aktion=&Frage_ID=481
// ==/UserScript==



	var inputs = document.getElementsByTagName("input");
	
	for ( i=0 ; i < inputs.length ; i++ ) {
		if ( inputs[i].value == "1591" ) {
			inputs[i+2].form.submit();
		}
	}












// ==UserScript==
// @name           Pornbits unvisited links highlighter
// @namespace      http://www.w3.org/1999/xhtml
// @description    Mark unvisited links RED
// @include        http://*pornbits.net/*
// @include        https://*pornbits.net/*
// ==/UserScript==

function highlightUnvisited() {
	GM_addStyle(".torrentTitle A:link {color:#ff0000 !important;}");
	}

window.addEventListener('load',highlightUnvisited,true);
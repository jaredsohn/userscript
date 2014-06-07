// ==UserScript==
// @name           Auto Close Topify block-page
// @namespace      http://blog.loland.net
// @description    Auto Close Topify block-page
// @version		 1.0
// @include       http://topify.com/actions/block/*
// ==/UserScript==

CloseTheTab();

function CloseTheTab(){
	window.open('', '_self', '');
	window.close();
}